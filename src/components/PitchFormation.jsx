// PitchFormation.jsx
import { Box, Typography } from "@mui/material";
import { formations } from "../data/formations"; // Asegúrate de que la ruta sea correcta
import PlayerCard from "./PlayerCard"; // mismo que antes

/**
 * @param {string}   formation   ej. "4-4-2"
 * @param {string[]} positions   ["ST","ST","LM",...]
 * @param {object[]} squad       (opcional) 11 jugadores; si falta alguno,
 *                                el hueco se representa como placeholder
 */
const PitchFormation = ({
  formation = "4-4-2",
  positions = [],
  squad = [],
}) => {
  const layout = formations[formation] ?? [];
  const len = Math.min(positions.length, layout.length);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%", // Mantén el tamaño del Box
        height: "100%", // Mantén el tamaño del Box
        background: 'url("/assets/pitch.png") center',
        backgroundSize: "1400px 1000px", // Especifica el ancho y alto de la imagen de fondo
        backgroundRepeat: "no-repeat", // Evita que la imagen se repita
        borderRadius: 2,
      }}
    >
      {Array.from({ length: len }).map((_, i) => {
        const { x, y } = layout[i];
        const player = squad[i]; // puede ser undefined
        return (
          <Box
            sx={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {/* Con jugador => tarjeta; sin jugador => hueco */}
            {player ? (
              <PlayerCard player={player} sizeWidth={125} sizeHeight={175} />
            ) : (
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.12)",
                  border: "2px dashed rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption" color="#fff">
                  {positions[i]}
                </Typography>
              </Box>
            )}
            {/* Mostrar la posición debajo de la tarjeta o hueco */}
            <Typography
              variant="h5"
              color="#fff"
              sx={{ marginTop: "5px", display: "block" }}
            >
              {positions[i]}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default PitchFormation;
