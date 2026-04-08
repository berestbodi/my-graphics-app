import type {
  SxProps,
  Theme,
  InputLabelProps,
  InputBaseComponentProps,
} from "@mui/material";

export const panelContainerStyles: SxProps<Theme> = {
  width: 240,
  p: 2,
  bgcolor: "#1e1c1f",
  color: "#fff",
  height: "100%",
  borderLeft: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  flexDirection: "column",
};

export const labelSlotProps: Partial<InputLabelProps> = {
  style: { color: "#aaa" },
};

export const inputSlotProps: InputBaseComponentProps = {
  style: { color: "#fff" },
};

export const emptyStateStyles: SxProps<Theme> = {
  mt: 2,
  opacity: 0.5,
};

export const dividerStyles: SxProps<Theme> = {
  bgcolor: "rgba(255,255,255,0.1)",
  mb: 2,
};

export const colorPickerStyles: SxProps<Theme> = {
  mb: 2,
  bgcolor: "#fff",
  borderRadius: 1,
  "& .MuiInputBase-input": {
    padding: "4px",
    height: "32px",
    cursor: "pointer",
  },
};

export const coordsContainerStyles: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  mt: 1,
};

export const sliderStyles: SxProps<Theme> = {
  mb: 2,
};
