import { createTheme, type Theme } from "@mui/material/styles";

export const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1e1e1e",
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        },
      },
    },
  },
});
