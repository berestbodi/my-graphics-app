import React from "react";
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

const DRAWER_WIDTH = 240;

const Sidebar: React.FC = observer(() => {
  const { t } = useTranslation();

  const editorStore = container.get<EditorStore>(TYPES.EditorStore);

  const menuItems = [
    { id: "select" as ToolType, text: t("tools.select"), icon: <PanTool /> },
    { id: "rect" as ToolType, text: t("tools.rect"), icon: <Square /> },
    { id: "circle" as ToolType, text: t("tools.circle"), icon: <Circle /> },
  ];

  return (
    <Drawer variant="permanent" sx={drawerStyles(DRAWER_WIDTH)}>
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={editorStore.selectedTool === item.id}
                onClick={() => editorStore.setTool(item.id)}
              >
                <ListItemIcon sx={iconStyles}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
});

export default Sidebar;
