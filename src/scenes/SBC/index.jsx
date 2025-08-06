import React from "react";
import Header from "../../components/Header";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import SBCBox from "../../components/SBCBox";
import jsonSBC from "../../data/sbc.json";

const SBC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Calcular quants SBCBox buits es necessiten per completar les files
  const totalTeams = jsonSBC.teams.length;
  const columns = 4; // Nombre de columnes per fila
  const emptyBoxes = columns - (totalTeams % columns || columns); // Calcular els espais buits

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Generador SBC" subtitle="Benvingut al generador d'SBC" />
      </Box>
      <Box
        mt="20px"
        p="20px"
        borderRadius="8px"
        backgroundColor={colors.primary[400]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        maxHeight="1000px"
        overflow="auto"
      >
        <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
          SBC disponibles
        </Typography>

        {/* Contenidor de graella */}
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${columns}, 1fr)`} // 4 columnes
          gap="20px"
          mt="20px"
        >
          {/* Generar SBCBox dinàmicament */}
          {jsonSBC.teams.map((team, index) => (
            <SBCBox
              key={index}
              sbcNumber={index}
              colors={colors}
              sbc={team} // Passar el valor de sbc al SBCBox
            />
          ))}

          {/* Generar SBCBox buits per completar les files */}
          {Array.from({ length: emptyBoxes }).map((_, index) => (
            <Box
              key={`empty-${index}`}
              p="20px"
              borderRadius="8px"
              backgroundColor={colors.primary[400]} // Mateix color que el fons
              boxShadow="none"
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SBC;
