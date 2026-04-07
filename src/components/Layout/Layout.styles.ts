import type { SxProps, Theme } from "@mui/material";

export const rootBoxStyles: SxProps<Theme> = {
  display: "flex",
  height: "100vh",
  width: "100vw",
};

export const mainContentStyles: SxProps<Theme> = {
  flexGrow: 1,
  bgcolor: "background.default",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

export const appBarStyles: SxProps<Theme> = {
  zIndex: (theme) => theme.zIndex.drawer + 1,
  boxShadow: "none",
  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
};
