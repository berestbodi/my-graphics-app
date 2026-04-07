import type { SxProps, Theme } from "@mui/material";

export const drawerStyles = (width: number): SxProps<Theme> => ({
  width: width,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: width,
    boxSizing: "border-box",
  },
});

export const iconStyles: SxProps<Theme> = {
  minWidth: 40,
  color: "primary.main",
};
