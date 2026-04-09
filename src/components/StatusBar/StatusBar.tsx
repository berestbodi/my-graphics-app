import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
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

  const counterVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "rgba(30, 30, 30, 0.9)",
        color: "rgba(255, 255, 255, 0.8)",
        p: "4px 16px",
        display: "flex",
        gap: 4,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        pointerEvents: "none",
        zIndex: 100,
        height: "24px",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", width: "60px" }}>
        <Typography sx={{ fontSize: "12px", fontFamily: "monospace", mr: 0.5 }}>
          X:
        </Typography>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={coords.x}
            variants={counterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }}
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
              display: "inline-block",
            }}
          >
            {coords.x}
          </motion.span>
        </AnimatePresence>
      </Box>

      <Box sx={{ display: "flex", width: "60px" }}>
        <Typography sx={{ fontSize: "12px", fontFamily: "monospace", mr: 0.5 }}>
          Y:
        </Typography>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={coords.y}
            variants={counterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.1 }}
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
              display: "inline-block",
            }}
          >
            {coords.y}
          </motion.span>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default StatusBar;
