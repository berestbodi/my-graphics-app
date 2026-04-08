import React from "react";
import { Box, Typography, TextField, Slider, Divider } from "@mui/material";
import * as styles from "./PropertiesPanel.styles";

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

interface PropertiesPanelProps {
  selectedShape: Shape | null;
  onUpdate: (newAttrs: Partial<Shape>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedShape,
  onUpdate,
}) => {
  if (!selectedShape) {
    return (
      <Box sx={styles.panelContainerStyles}>
        <Typography variant="h6">Властивості</Typography>
        <Typography sx={styles.emptyStateStyles}>Виберіть фігуру</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.panelContainerStyles}>
      <Typography variant="h6" gutterBottom>
        Параметри
      </Typography>
      <Divider sx={styles.dividerStyles} />

      <Typography variant="body2" sx={{ mb: 1 }}>
        Колір
      </Typography>
      <TextField
        type="color"
        fullWidth
        size="small"
        value={selectedShape.color}
        onChange={(e) => onUpdate({ color: e.target.value })}
        sx={styles.colorPickerStyles}
      />

      {selectedShape.type === "rect" ? (
        <>
          <Typography variant="body2">
            Ширина: {Math.round(selectedShape.width || 0)}
          </Typography>
          <Slider
            value={selectedShape.width || 100}
            min={10}
            max={500}
            onChange={(_, val) => onUpdate({ width: val as number })}
            sx={styles.sliderStyles}
          />
          <Typography variant="body2">
            Висота: {Math.round(selectedShape.height || 0)}
          </Typography>
          <Slider
            value={selectedShape.height || 100}
            min={10}
            max={500}
            onChange={(_, val) => onUpdate({ height: val as number })}
            sx={styles.sliderStyles}
          />
        </>
      ) : (
        <>
          <Typography variant="body2">
            Радіус: {Math.round(selectedShape.radius || 0)}
          </Typography>
          <Slider
            value={selectedShape.radius || 50}
            min={5}
            max={250}
            onChange={(_, val) => onUpdate({ radius: val as number })}
            sx={styles.sliderStyles}
          />
        </>
      )}

      <Typography variant="body2">Координати (X, Y)</Typography>
      <Box sx={styles.coordsContainerStyles}>
        <TextField
          label="X"
          size="small"
          type="number"
          value={Math.round(selectedShape.x)}
          onChange={(e) => onUpdate({ x: Number(e.target.value) })}
          slotProps={{
            inputLabel: styles.labelSlotProps,
            htmlInput: styles.inputSlotProps,
          }}
        />
        <TextField
          label="Y"
          size="small"
          type="number"
          value={Math.round(selectedShape.y)}
          onChange={(e) => onUpdate({ y: Number(e.target.value) })}
          slotProps={{
            inputLabel: styles.labelSlotProps,
            htmlInput: styles.inputSlotProps,
          }}
        />
      </Box>
    </Box>
  );
};

export default PropertiesPanel;
