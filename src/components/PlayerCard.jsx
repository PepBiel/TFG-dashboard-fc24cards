import React from "react";
import { Box } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme"; // Assegura't que la ruta sigui correcta
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

/* ──────────────────────────────────
   Utilitats de detecció
   ──────────────────────────────────*/
const isDataUrl = (str) => str.startsWith("data:image/");
const isBase64Raw = (str) =>
  /^[A-Za-z0-9+/]+={0,2}$/.test(str) && str.length % 4 === 0;
const isHttpUrl = (str) => /^https?:\/\//i.test(str) || str.startsWith("//");

const PlayerCard = ({
  player,
  sizeWidth = 80,
  sizeHeight = 80,
  fallback = "/assets/placeholder.png", // imatge per defecte
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let imageSrc = fallback;

  if (player?.image) {
    const img = player.image;

    if (isDataUrl(img)) {
      // Ja ve amb "data:image/png;base64,...."
      imageSrc = img;
    } else if (isBase64Raw(img)) {
      // Cadena base64 sense prefix; assumim PNG
      imageSrc = `data:image/png;base64,${img}`;
    } else if (isHttpUrl(img)) {
      // URL absoluta (http/https)
      imageSrc = img;
    } else {
      // Ruta relativa a /public o /src/assets
      imageSrc = img.startsWith("/") ? img : `/assets/${img}`;
    }
  }

  return (
    <Box
      sx={{
        width: sizeWidth,
        height: sizeHeight,
        position: "relative",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <img
        src={imageSrc}
        alt={player?.name ?? "player"}
        loading="lazy"
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
        onError={(e) => {
          // Si falla la càrrega, mostra el fallback
          if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
        }}
      />
      {/* Contenidor circular negre per als cercles de química o avís */}
      <Box
        sx={{
          position: "absolute",
          bottom: -15,
          left: "95%",
          transform: "translateX(-50%)",
          width: "30px",
          height: "30px",
          backgroundColor: "black",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {player?.correct_position ? (
          <>
            {/* Primer cercle (a dalt) */}
            <CircleIcon
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 12,
                color:
                  player?.chemestry > 0 ? colors.greenAccent[500] : "#FFFFFF",
              }}
            />
            {/* Segon cercle (a baix esquerra) */}
            <CircleIcon
              sx={{
                position: "absolute",
                bottom: 5,
                left: 2,
                fontSize: 12,
                color:
                  player?.chemestry > 1 ? colors.greenAccent[500] : "#FFFFFF",
              }}
            />
            {/* Tercer cercle (a baix dreta) */}
            <CircleIcon
              sx={{
                position: "absolute",
                bottom: 5,
                right: 2,
                fontSize: 12,
                color:
                  player?.chemestry > 2 ? colors.greenAccent[500] : "#FFFFFF",
              }}
            />
          </>
        ) : (
          <PriorityHighIcon
            sx={{
              color: "#FFD600", // Groc Material
              fontSize: 22,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default PlayerCard;
