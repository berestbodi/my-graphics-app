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
import PropertiesPanel from "../PropertiesPanel/PropertiesPanel";
import LayersPanel from "../LayersPanel/LayersPanel";

const STORAGE_KEY = "editor_shapes_persistence";

export interface EditorShape {
  id: string;
  type: "rect" | "circle";
  x: number;
  y: number;
  color: string;
  width?: number;
  height?: number;
  radius?: number;
  visible: boolean;
}

const CanvasEditor: React.FC = observer(() => {
  const editorStore = container.get<EditorStore>(TYPES.EditorStore);
  const mouseService = container.get<MouseService>(TYPES.MouseService);

  // Використовуємо функцію ініціалізації, щоб зчитати дані один раз при старті
  const [shapes, setShapes] = useState<EditorShape[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Помилка завантаження даних:", e);
        return [];
      }
    }
    return [];
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const shapeRef = useRef<KonvaRect | KonvaCircle | null>(null);
  const trRef = useRef<KonvaTransformer>(null);

  // Збереження при зміні масиву shapes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shapes));
  }, [shapes]);

  const toggleVisibility = (id: string) => {
    setShapes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
    );
  };

  const reorderShapes = (oldIndex: number, newIndex: number) => {
    setShapes((prev) => {
      const result = [...prev];
      const [removed] = result.splice(oldIndex, 1);
      result.splice(newIndex, 0, removed);
      return result;
    });
  };

  const updateSelectedShape = (newAttrs: Partial<EditorShape>) => {
    if (!selectedId) return;
    setShapes((prev) =>
      prev.map((shape) =>
        shape.id === selectedId ? { ...shape, ...newAttrs } : shape,
      ),
    );
  };

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
  }, [selectedId, shapes]);

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
      const shape = shapes.find((s) => s.id === id);
      if (shape?.visible) {
        setSelectedId(id);
      }
    }
  };

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (editorStore.selectedTool === "select") return;

    const stage = e.target.getStage();
    if (!stage) return;
    const pointerPosition = stage.getPointerPosition();
    if (!pointerPosition) return;

    const newShape: EditorShape = {
      id: Date.now().toString(),
      type: editorStore.selectedTool as "rect" | "circle",
      x: pointerPosition.x,
      y: pointerPosition.y,
      color: editorStore.selectedTool === "rect" ? "#4caf50" : "#2196f3",
      width: 100,
      height: 100,
      radius: 50,
      visible: true,
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

  const currentSelectedShape = shapes.find((s) => s.id === selectedId) || null;

  return (
    <Box
      sx={{ display: "flex", width: "100%", height: "100vh", bgcolor: "#000" }}
    >
      <LayersPanel
        shapes={shapes}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onToggleVisibility={toggleVisibility}
        onReorder={reorderShapes}
      />

      <Box sx={{ flexGrow: 1, position: "relative", overflow: "hidden" }}>
        <Stage
          width={window.innerWidth - 480}
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
                visible: shape.visible,
                draggable:
                  editorStore.selectedTool === "select" && shape.visible,
                onTransformEnd: handleTransformEnd,
                onDragEnd: (e: KonvaEventObject<DragEvent>) =>
                  handleDragEnd(e, shape.id),
                onClick: () => {
                  if (editorStore.selectedTool === "select" && shape.visible) {
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

            {selectedId && currentSelectedShape?.visible && (
              <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                  if (
                    Math.abs(newBox.width) < 5 ||
                    Math.abs(newBox.height) < 5
                  ) {
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

      <PropertiesPanel
        selectedShape={currentSelectedShape}
        onUpdate={updateSelectedShape}
      />
    </Box>
  );
});

export default CanvasEditor;
