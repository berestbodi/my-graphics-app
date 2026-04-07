import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Layout from "./components/Layout/Layout";
import CanvasEditor from "./components/CanvasEditor/CanvasEditor";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <CanvasEditor />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
