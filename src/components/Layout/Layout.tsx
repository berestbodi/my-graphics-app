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

  return (
    <Box sx={rootBoxStyles}>
      <CssBaseline />
      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap>
            {t("app_title")}
          </Typography>

          <ButtonGroup variant="outlined" color="inherit" size="small">
            <Button
              onClick={() => changeLanguage("uk")}
              variant={i18n.language === "uk" ? "contained" : "outlined"}
            >
              UA
            </Button>
            <Button
              onClick={() => changeLanguage("en")}
              variant={i18n.language === "en" ? "contained" : "outlined"}
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
