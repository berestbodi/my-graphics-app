import React, { useState, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { container } from "../../ioc";
import { TYPES, type ToolType } from "../../types";
import { EditorStore } from "../../stores/EditorStore";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { Square, Circle, PanTool } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { drawerStyles, iconStyles } from "./Sidebar.styles";

const MIN_WIDTH = 180;
const MAX_WIDTH = 450;

const Sidebar: React.FC = observer(() => {
  const { t } = useTranslation();
  const [width, setWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);

  const editorStore = container.get<EditorStore>(TYPES.EditorStore);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
          setWidth(newWidth);
        }
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const menuItems = [
    { id: "select" as ToolType, text: t("tools.select"), icon: <PanTool /> },
    { id: "rect" as ToolType, text: t("tools.rect"), icon: <Square /> },
    { id: "circle" as ToolType, text: t("tools.circle"), icon: <Circle /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        ...drawerStyles(width),
        position: "relative",
        transition: isResizing ? "none" : "width 0.2s",
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "hidden" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={editorStore.selectedTool === item.id}
                onClick={() => editorStore.setTool(item.id)}
              >
                <ListItemIcon sx={iconStyles}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: width < 120 ? 0 : 1 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        onMouseDown={startResizing}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "4px",
          height: "100%",
          cursor: "col-resize",
          bgcolor: isResizing ? "primary.main" : "transparent",
          "&:hover": {
            bgcolor: "primary.light",
          },
          transition: "background-color 0.2s",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      />
    </Drawer>
  );
});

export default Sidebar;
