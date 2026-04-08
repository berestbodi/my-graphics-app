import React from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import * as styles from "./LayersPanel.styles";
import { EditorShape } from "../CanvasEditor/CanvasEditor";

interface LayersPanelProps {
  shapes: EditorShape[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onReorder: (oldIndex: number, newIndex: number) => void;
}

const LayersPanel: React.FC<LayersPanelProps> = ({
  shapes,
  selectedId,
  onSelect,
  onToggleVisibility,
  onReorder,
}) => {
  return (
    <Box sx={styles.layersContainerStyles}>
      <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
        Шари
      </Typography>
      <Stack spacing={0.5}>
        {[...shapes].reverse().map((shape, revIndex) => {
          const index = shapes.length - 1 - revIndex;
          const isSelected = shape.id === selectedId;

          return (
            <Box
              key={shape.id}
              sx={styles.layerItemStyles(isSelected)}
              onClick={() => onSelect(shape.id)}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility(shape.id);
                  }}
                >
                  {shape.visible ? (
                    <Visibility fontSize="small" sx={{ color: "#fff" }} />
                  ) : (
                    <VisibilityOff fontSize="small" sx={{ color: "gray" }} />
                  )}
                </IconButton>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  {shape.type === "rect" ? "Прямокутник" : "Коло"}
                </Typography>
              </Stack>

              <Stack direction="row">
                <IconButton
                  size="small"
                  disabled={index === shapes.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder(index, index + 1);
                  }}
                >
                  <ArrowUpward
                    fontSize="inherit"
                    sx={{
                      color: "#fff",
                      opacity: index === shapes.length - 1 ? 0.2 : 1,
                    }}
                  />
                </IconButton>
                <IconButton
                  size="small"
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    onReorder(index, index - 1);
                  }}
                >
                  <ArrowDownward
                    fontSize="inherit"
                    sx={{ color: "#fff", opacity: index === 0 ? 0.2 : 1 }}
                  />
                </IconButton>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default LayersPanel;
