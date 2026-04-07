import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import { observer } from "mobx-react-lite";
import { container } from "../../ioc";
import { TYPES } from "../../types/index";
import { EditorStore } from "../../stores/EditorStore";
import { MouseService } from "../../services/MouseService";
import { Box } from "@mui/material";
import { KonvaEventObject } from "konva/lib/Node";
import { Rect as KonvaRect } from "konva/lib/shapes/Rect";
import { Circle as KonvaCircle } from "konva/lib/shapes/Circle";
import { Transformer as KonvaTransformer } from "konva/lib/shapes/Transformer";
import StatusBar from "../StatusBar/StatusBar";

interface Shape {
  id: string;
  type: "rect" | "circle";
  x: number;
  y: number;
  color: string;
  width?: number;
  height?: number;
  radius?: number;
}

const CanvasEditor: React.FC = observer(() => {
  const editorStore = container.get<EditorStore>(TYPES.EditorStore);
  const mouseService = container.get<MouseService>(TYPES.MouseService);

  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const shapeRef = useRef<KonvaRect | KonvaCircle | null>(null);
  const trRef = useRef<KonvaTransformer>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        setShapes((prev) => prev.filter((shape) => shape.id !== selectedId));
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  useEffect(() => {
    if (selectedId && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();
    if (pointer) {
      mouseService.updateCoords(pointer.x, pointer.y);
    }
  };

  const handleStageMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      return;
    }

    if (editorStore.selectedTool === "select") {
      const id = e.target.id();
      setSelectedId(id);
    }
  };

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (editorStore.selectedTool === "select") return;

    const stage = e.target.getStage();
    if (!stage) return;
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const newShape: Shape = {
      id: Date.now().toString(),
      type: editorStore.selectedTool as "rect" | "circle",
      x: pointerPosition.x,
      y: pointerPosition.y,
      color: editorStore.selectedTool === "rect" ? "#4caf50" : "#2196f3",
      width: 100,
      height: 100,
      radius: 50,
    };

    setShapes([...shapes, newShape]);
    setSelectedId(newShape.id);
  };

  const handleTransformEnd = (e: KonvaEventObject<Event>) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    setShapes((prevShapes) =>
      prevShapes.map((shape) => {
        if (shape.id === selectedId) {
          return {
            ...shape,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, (shape.width || 100) * scaleX),
            height: Math.max(5, (shape.height || 100) * scaleY),
            radius: shape.radius ? shape.radius * scaleX : 50,
          };
        }
        return shape;
      }),
    );
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>, shapeId: string) => {
    setShapes((prevShapes) =>
      prevShapes.map((s) =>
        s.id === shapeId ? { ...s, x: e.target.x(), y: e.target.y() } : s,
      ),
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        bgcolor: "#000",
      }}
    >
      <Stage
        width={window.innerWidth - 240}
        height={window.innerHeight - 64}
        onClick={handleStageClick}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          {shapes.map((shape) => {
            const isSelected = shape.id === selectedId;

            const commonProps = {
              id: shape.id,
              x: shape.x,
              y: shape.y,
              fill: shape.color,
              draggable: editorStore.selectedTool === "select",
              onTransformEnd: handleTransformEnd,
              onDragEnd: (e: KonvaEventObject<DragEvent>) =>
                handleDragEnd(e, shape.id),

              onClick: () => {
                if (editorStore.selectedTool === "select") {
                  setSelectedId(shape.id);
                }
              },

              ref: (node: KonvaRect | KonvaCircle | null) => {
                if (isSelected) {
                  shapeRef.current = node;
                }
              },
            };

            return shape.type === "rect" ? (
              <Rect
                key={shape.id}
                {...commonProps}
                width={shape.width ?? 100}
                height={shape.height ?? 100}
              />
            ) : (
              <Circle
                key={shape.id}
                {...commonProps}
                radius={shape.radius ?? 50}
              />
            );
          })}

          {selectedId && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>

      <StatusBar />
    </Box>
  );
});

export default CanvasEditor;
