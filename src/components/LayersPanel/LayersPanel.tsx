import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ArrowUpward,
  ArrowDownward,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import * as styles from "./LayersPanel.styles";
import { EditorShape } from "../CanvasEditor/CanvasEditor";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();

  return (
    <Box sx={{ position: "relative", height: "100%", zIndex: 10 }}>
      {/* Кнопка перемикання */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        size="small"
        sx={{
          position: "absolute",
          left: isOpen ? 240 : 4,
          top: 10,
          bgcolor: "#1e1e1e",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
          "&:hover": { bgcolor: "#333" },
          zIndex: 11,
          transition: "left 0.3s ease",
        }}
        title={isOpen ? t("layers.collapse") : t("layers.expand")}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>

      {/* Анімована панель */}
      <Box
        component={motion.div}
        initial={false}
        animate={{
          width: isOpen ? 240 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        sx={{
          ...styles.layersContainerStyles,
          position: "relative",
          overflow: "hidden",
          whiteSpace: "nowrap",
          minWidth: 0,
          p: isOpen ? 2 : 0,
          borderRight: isOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
          height: "100%",
        }}
      >
        <AnimatePresence>
          {isOpen && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{ width: 240 }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#fff", px: 2, pt: 1 }}
              >
                {t("layers.title")}
              </Typography>

              <Stack spacing={0.5} sx={{ px: 1 }}>
                {[...shapes].reverse().map((shape, revIndex) => {
                  const index = shapes.length - 1 - revIndex;
                  const isSelected = shape.id === selectedId;

                  return (
                    <Box
                      component={motion.div}
                      layout
                      key={shape.id}
                      sx={styles.layerItemStyles(isSelected)}
                      onClick={() => onSelect(shape.id)}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleVisibility(shape.id);
                          }}
                          title={
                            shape.visible ? t("layers.hide") : t("layers.show")
                          }
                        >
                          {shape.visible ? (
                            <Visibility
                              fontSize="small"
                              sx={{ color: "#fff" }}
                            />
                          ) : (
                            <VisibilityOff
                              fontSize="small"
                              sx={{ color: "gray" }}
                            />
                          )}
                        </IconButton>
                        <Typography variant="body2" sx={{ color: "#fff" }}>
                          {/* Динамічний переклад типу фігури */}
                          {t(`layers.shapeType.${shape.type}`, {
                            defaultValue: shape.type,
                          })}
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
                          title={t("layers.moveUp")}
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
                          title={t("layers.moveDown")}
                        >
                          <ArrowDownward
                            fontSize="inherit"
                            sx={{
                              color: "#fff",
                              opacity: index === 0 ? 0.2 : 1,
                            }}
                          />
                        </IconButton>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default LayersPanel;
