import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { container } from "../../ioc";
import { TYPES } from "../../types";
import { MouseService, MouseCoords } from "../../services/MouseService";

const StatusBar: React.FC = () => {
  const mouseService = container.get<MouseService>(TYPES.MouseService);
  const [coords, setCoords] = useState<MouseCoords>(mouseService.currentCoords);

  useEffect(() => {
    const subscription = mouseService.coords$.subscribe((newCoords) => {
      setCoords(newCoords);
    });

    return () => subscription.unsubscribe();
  }, [mouseService]);

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "rgba(30, 30, 30, 0.8)",
        color: "rgba(255, 255, 255, 0.7)",
        p: "4px 16px",
        display: "flex",
        gap: 4,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <Typography sx={{ fontSize: "12px", fontFamily: "monospace" }}>
        X: {coords.x}
      </Typography>
      <Typography sx={{ fontSize: "12px", fontFamily: "monospace" }}>
        Y: {coords.y}
      </Typography>
    </Box>
  );
};

export default StatusBar;
