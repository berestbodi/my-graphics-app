import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  TextField,
  Slider,
  Divider,
  IconButton,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import * as styles from "./PropertiesPanel.styles";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();

  return (
    // 1. Стабільний зовнішній Box для утримання кнопки
    <Box sx={{ position: "relative", height: "100%", zIndex: 10 }}>
      {/* 2. Кнопка тепер має динамічний відступ зліва */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        size="small"
        sx={{
          position: "absolute",
          // Якщо панель відкрита (260px), кнопка стоїть на -28px відносно неї.
          // Якщо закрита (0px), кнопка має бути доступна (наприклад, -28px від 0).
          left: isOpen ? -28 : -28,
          top: 10,
          bgcolor: "#1e1e1e",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          "&:hover": { bgcolor: "#333" },
          zIndex: 11,
        }}
        title={isOpen ? t("properties.collapse") : t("properties.expand")}
      >
        {isOpen ? <ChevronRight /> : <ChevronLeft />}
      </IconButton>

      {/* 3. Анімована панель */}
      <Box
        component={motion.div}
        initial={false}
        animate={{
          width: isOpen ? 260 : 0,
          padding: isOpen ? "16px" : "16px 0px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        sx={{
          ...styles.panelContainerStyles,
          position: "relative",
          overflow: "hidden", // Чисто обрізаємо контент при згортанні
          whiteSpace: "nowrap",
          height: "100%",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen && (
            <Box
              key="panel-content"
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{ width: 228, height: "100%", overflowX: "hidden" }} // 260 - padding
            >
              {!selectedShape ? (
                <Box
                  key="empty-state"
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Typography variant="h6">{t("properties.title")}</Typography>
                  <Typography sx={styles.emptyStateStyles}>
                    {t("properties.selectShape")}
                  </Typography>
                </Box>
              ) : (
                <Box
                  key="properties-content"
                  component={motion.div}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                >
                  <Typography variant="h6" gutterBottom>
                    {t("properties.parameters")}
                  </Typography>
                  <Divider sx={styles.dividerStyles} />

                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {t("properties.color")}
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
                        {t("properties.width")}:{" "}
                        {Math.round(selectedShape.width || 0)}
                      </Typography>
                      <Slider
                        value={selectedShape.width || 100}
                        min={10}
                        max={500}
                        onChange={(_, val) =>
                          onUpdate({ width: val as number })
                        }
                        sx={styles.sliderStyles}
                      />
                      <Typography variant="body2">
                        {t("properties.height")}:{" "}
                        {Math.round(selectedShape.height || 0)}
                      </Typography>
                      <Slider
                        value={selectedShape.height || 100}
                        min={10}
                        max={500}
                        onChange={(_, val) =>
                          onUpdate({ height: val as number })
                        }
                        sx={styles.sliderStyles}
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="body2">
                        {t("properties.radius")}:{" "}
                        {Math.round(selectedShape.radius || 0)}
                      </Typography>
                      <Slider
                        value={selectedShape.radius || 50}
                        min={5}
                        max={250}
                        onChange={(_, val) =>
                          onUpdate({ radius: val as number })
                        }
                        sx={styles.sliderStyles}
                      />
                    </>
                  )}

                  <Typography variant="body2">
                    {t("properties.coordinates")} (X, Y)
                  </Typography>
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
              )}
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default PropertiesPanel;
