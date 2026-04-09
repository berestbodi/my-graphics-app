import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Button,
  ButtonGroup,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import Sidebar from "../Sidebar/Sidebar";
import {
  rootBoxStyles,
  mainContentStyles,
  appBarStyles,
} from "./Layout.styles";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language.split("-")[0];

  return (
    <Box sx={rootBoxStyles}>
      <CssBaseline />
      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            {t("app.title", { defaultValue: "Editor" })}
          </Typography>

          <ButtonGroup
            variant="outlined"
            size="small"
            sx={{
              borderColor: "rgba(255,255,255,0.3)",
              "& .MuiButton-root": {
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <Button
              onClick={() => changeLanguage("uk")}
              variant={currentLanguage === "uk" ? "contained" : "outlined"}
              sx={{
                bgcolor:
                  currentLanguage === "uk" ? "primary.main" : "transparent",
              }}
            >
              UA
            </Button>
            <Button
              onClick={() => changeLanguage("en")}
              variant={currentLanguage === "en" ? "contained" : "outlined"}
              sx={{
                bgcolor:
                  currentLanguage === "en" ? "primary.main" : "transparent",
              }}
            >
              EN
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <Sidebar />

      <Box component="main" sx={mainContentStyles}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
