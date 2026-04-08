import type { SxProps, Theme } from "@mui/material";

export const layersContainerStyles: SxProps<Theme> = {
  width: 240,
  p: 2,
  bgcolor: "#1e1c1f",
  color: "#fff",
  height: "100%",
  borderRight: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  flexDirection: "column",
};

export const layerItemStyles = (isSelected: boolean): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  p: 1,
  mb: 0.5,
  borderRadius: 1,
  cursor: "pointer",
  bgcolor: isSelected ? "rgba(33, 150, 243, 0.2)" : "transparent",
  border: isSelected ? "1px solid #2196f3" : "1px solid transparent",
  "&:hover": {
    bgcolor: isSelected
      ? "rgba(33, 150, 243, 0.3)"
      : "rgba(255, 255, 255, 0.05)",
  },
});
