import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import React from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "@mui/material";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PANELL" subtitle="Benvinguts al meu panell" />
      </Box>

      {/* Descripción de la aplicación */}
      <Box
        mt="20px"
        p="20px"
        borderRadius="8px"
        backgroundColor={colors.primary[400]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Box display="flex" alignItems="center" mb="10px">
          <InfoOutlinedIcon
            fontSize="large"
            sx={{ color: colors.greenAccent[500], mr: "10px" }}
          />
          <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
            Sobre l'aplicació
          </Typography>
        </Box>
        <Typography
          variant="h5"
          color={colors.grey[100]}
          lineHeight="1.8"
          sx={{ textAlign: "justify" }}
        >
          Ultimate Team és un dels modes de joc més populars del videojoc FC 24.
          En aquest mode, els usuaris poden crear i gestionar el seu propi equip
          de futbol utilitzant cartes de jugadors reals, que es poden obtenir
          mitjançant sobres, el mercat de transferències o completant
          desafiaments. Cada carta representa un jugador amb atributs i
          estadístiques específiques, i l’objectiu principal és construir una
          plantilla competitiva tenint en compte factors com la química entre
          jugadors, la formació tàctica, la nacionalitat i el club d’origen.
        </Typography>
        <Typography
          variant="h5"
          color={colors.grey[100]}
          lineHeight="1.8"
          mt="10px"
          sx={{ textAlign: "justify" }}
        >
          Aquest mode fomenta l’estratègia i la gestió esportiva, ja que els
          jugadors han d’equilibrar el rendiment competitiu amb la gestió
          econòmica per millorar progressivament la seva plantilla. Dins
          d’Ultimate Team, s’inclouen reptes anomenats Squad Building Challenges
          (SBC), que premien els usuaris per completar equips que compleixin una
          sèrie de requisits específics. Aquests requisits poden estar
          relacionats amb la mitjana global de l’equip, la química, les
          nacionalitats o els clubs dels jugadors. Tanmateix, construir aquestes
          plantilles manualment pot ser una tasca costosa i laboriosa,
          especialment quan es busca minimitzar-ne el cost total sense incomplir
          els requisits imposats.
        </Typography>
        <Typography
          variant="h5"
          color={colors.grey[100]}
          lineHeight="1.8"
          mt="10px"
          sx={{ textAlign: "justify" }}
        >
          Amb l’objectiu de facilitar i automatitzar aquest procés, s’ha
          desenvolupat una aplicació que permet generar plantilles òptimes a
          partir de les cartes disponibles en el club de l’usuari. Per fer-ho,
          es realitzen captures de pantalla de la col·lecció de cartes, les
          quals són processades mitjançant tècniques de visió per computador per
          detectar i segmentar les cartes de jugadors. Posteriorment, s’utilitza
          reconeixement òptic de caràcters (OCR) per extreure’n els atributs
          textuals rellevants. Aquests atributs s’empren per consultar una base
          de dades i identificar les cartes concretes, generant així una base de
          dades estructurada amb tots els jugadors disponibles.
        </Typography>
        <Typography
          variant="h5"
          color={colors.grey[100]}
          lineHeight="1.8"
          mt="10px"
          sx={{ textAlign: "justify" }}
        >
          El sistema incorpora també un motor de generació automàtica de
          plantilles basat en un algorisme evolutiu que selecciona els jugadors
          més adequats segons els requisits d’un SBC. Aquest motor té en compte
          tant el preu de cada jugador com la seva posició i atributs,
          assegurant que l’equip generat compleixi totes les restriccions al
          menor cost possible.
        </Typography>
        <Typography
          variant="h5"
          color={colors.grey[100]}
          lineHeight="1.8"
          mt="10px"
          sx={{ textAlign: "justify" }}
        >
          El projecte ha estat validat mitjançant dades reals i pot ser útil
          tant per a jugadors interessats en optimitzar els seus recursos dins
          del joc, com per a investigadors en l’àmbit de la intel·ligència
          artificial aplicada a entorns de simulació i videojocs.
        </Typography>
      </Box>
      <Box
        mt="20px"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap="20px"
        width="100%"
      >
        {/* Box del video explicativo */}
        <Box
          flex="1 1 300px"
          minWidth="300px"
          maxWidth="80%"
          p="20px"
          borderRadius="8px"
          backgroundColor={colors.primary[400]}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          display="flex"
          flexDirection="column"
        >
          <Typography
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            mb="10px"
            sx={{ textAlign: "center" }}
          >
            Vídeo explicatiu
          </Typography>
          <Box display="flex" justifyContent="center">
            <iframe
              width="100%"
              height="525px" // Altura del visor del video
              src="https://www.youtube.com/embed/RJzwqVby-Cs"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>

        {/* Box adicional */}
        <Box
          flex="1 1 300px"
          minWidth="525px"
          maxWidth="32%"
          p="20px"
          borderRadius="8px"
          backgroundColor={colors.primary[400]}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          display="flex"
          flexDirection="column"
        >
          <Typography
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            mb="10px"
            sx={{ textAlign: "center" }}
          >
            Funcionament de la química i mitjana del equip
          </Typography>
          <Typography
            variant="h4"
            color={colors.grey[100]}
            lineHeight="1.8"
            sx={{ textAlign: "justify" }}
          >
            Aquí podreu trobar informació sobre com funciona la química del
            equip en Ultimate Team. La química és un aspecte fonamental per
            optimitzar el rendiment dels jugadors dins del vostre equip.
          </Typography>
          <Link
            href="https://www.3djuegos.com/juegos/ea-sports-fc-ultimate-team/guias-y-trucos/como-funciona-quimica-ultimate-team-ea-sports-fc-24-fifa-24" // URL de la página web
            target="_blank" // Abre el enlace en una nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad
            style={{
              color: colors.greenAccent[500],
              textDecoration: "underline",
              textAlign: "left",
              display: "block",
              marginTop: "10px",
            }}
            variant="h4"
            fontWeight="bold"
          >
            Més informació sobre la química del equip
          </Link>
          <Typography
            variant="h4"
            color={colors.grey[100]}
            lineHeight="1.8"
            sx={{ textAlign: "justify" }}
          >
            Aquí podreu trobar informació sobre com calcular la mitjana del
            equip en Ultimate Team.
          </Typography>
          <Link
            href="https://www.reddit.com/r/EASportsFC/comments/5g3unf/how_to_work_out_overall_team_rating_broken_down/?tl=es-419" // URL de la página web
            target="_blank" // Abre el enlace en una nueva pestaña
            rel="noopener noreferrer" // Mejora la seguridad
            style={{
              color: colors.greenAccent[500],
              textDecoration: "underline",
              textAlign: "left",
              display: "block",
              marginTop: "10px",
            }}
            variant="h4"
            fontWeight="bold"
          >
            Més informació sobre la mitjana del equip
          </Link>
        </Box>

        {/* Box adicional 2 */}
        <Box
          flex="1 1 300px"
          minWidth="300px"
          maxWidth="32%"
          p="20px"
          borderRadius="8px"
          backgroundColor={colors.primary[400]}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          display="flex"
          flexDirection="column"
        >
          <Typography
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            mb="10px"
            sx={{ textAlign: "center" }}
          >
            Memòria de la aplicació
          </Typography>
          <Box display="flex" justifyContent="center">
            <iframe
              src="assets/pdf/Treball_Final_de_Grau.pdf" // Ruta al archivo PDF en la carpeta public
              width="100%"
              height="525px" // Altura del visor del PDF
              style={{ border: "none" }}
              title="Memoria de la aplicación"
            ></iframe>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
