import React, { useState, useEffect, version } from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header";
import Button from "../../components/Button";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import LinearProgress from "@mui/material/LinearProgress";
import { Modal } from "@mui/material";
import { getAllPlayers, savePlayers } from "../../utils/db";

const ClubPlayers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [players, setPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectOptions, setSelectOptions] = useState(null); // Opciones a mostrar en el modal
  const [selectIndex, setSelectIndex] = useState(null); // Índice del jugador a reemplazar
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const loadPlayers = async () => {
      const storedPlayers = await getAllPlayers();
      setPlayers(storedPlayers);

      // Mostrar alerta si hay jugadores con opciones
      if (storedPlayers.some((p) => p.options)) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    };
    loadPlayers();
  }, []);

  // Añade este useEffect para ocultar la alerta cuando ya no hay jugadores con opciones
  useEffect(() => {
    if (players.length > 0) {
      if (players.some((p) => p.options)) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    }
  }, [players]);

  const handleShowPlayers = async () => {
    setIsLoading(true);
    setProgress(0);

    // Progrés per a la segmentació (0-50%)
    const segInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) return prev + 1;
        return prev;
      });
    }, 30);

    try {
      const response_segmentation = await fetch(
        "http://127.0.0.1:8000/api/process-segmentation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      clearInterval(segInterval);
      const segonInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 50) return prev + 1;
          return prev;
        });
      }, 30);
      if (!response_segmentation.ok)
        throw new Error("Error en fer la segmentació");

      clearInterval(segonInterval);
      // Progrés per a l'OCR (50-100%)
      const ocrInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 80) return prev + 1;
          return prev;
        });
      }, 30);

      const response_ocr = await fetch(
        "http://127.0.0.1:8000/api/process-ocr",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      clearInterval(ocrInterval);
      const ocrSegonInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 1;
          return prev;
        });
      }, 30);
      if (!response_ocr.ok) throw new Error("Error en fer l'OCR");

      const data = await response_ocr.json();

      if (data && Array.isArray(data.data) && data.data.length > 0) {
        await savePlayers(data.data);
        setPlayers(data.data);
      }
      // Espera que la barra arribi a 100 visualment abans de mostrar la taula
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error en obtenir jugadors:", error.message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const handleDeletePlayer = async (index) => {
    const player = players[index];
    // Lanza la petición POST para eliminar el jugador en el backend
    try {
      await fetch("http://127.0.0.1:8000/api/delete-player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: player.name,
          rating: player.rating,
          position: player.position,
          version: player.version,
        }),
      });
    } catch (err) {
      console.error("Error al eliminar jugador en backend:", err);
    }

    const updatedPlayers = players.filter((_, i) => i !== index);
    setPlayers(updatedPlayers);
    await savePlayers(updatedPlayers);
  };

  const handlePlayerInfo = (player) => {
    setSelectedPlayer(player);
    setOpenModal(true);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Jugadors del Club"
          subtitle="Benvingut als jugadors del teu club"
        />
      </Box>

      {/* ALERTA SI HAY JUGADORES CON OPCIONES */}
      {showAlert && (
        <Alert
          severity="warning"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: colors.yellowAccent
              ? colors.yellowAccent[700]
              : "#fffde7",
            color: colors.grey[900],
            fontWeight: "bold",
          }}
        >
          Hi ha jugadors que tenen diverses opcions. Selecciona una opció per
          continuar.
        </Alert>
      )}

      <Box
        mt="20px"
        p="20px"
        borderRadius="8px"
        backgroundColor={colors.primary[400]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
          Prem el botó per veure tots els jugadors del teu club
        </Typography>
        <Button
          text="Mostrar jugadors"
          onClick={handleShowPlayers}
          sx={{
            width: "20%",
            backgroundColor: colors.greenAccent[500],
            "&:hover": {
              backgroundColor: colors.greenAccent[400],
            },
          }}
        />
      </Box>

      <Box
        mt="20px"
        p="20px"
        borderRadius="8px"
        backgroundColor={colors.primary[400]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        maxHeight="850px"
        overflow="auto"
      >
        {isLoading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="200px"
          >
            <Typography variant="h4" color={colors.grey[100]} mb={2}>
              S'estan digitalitzant els jugadors... {progress}%
            </Typography>
            <LinearProgress
              sx={{ width: "80%" }}
              color="secondary"
              variant="determinate"
              value={progress}
            />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: colors.primary[400],
              maxHeight: "800px",
              overflow: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    "Imatge",
                    "Nom",
                    "Puntuació",
                    "Lliga",
                    "Club",
                    "Nacionalitat",
                    "Posició",
                    "Preu",
                    "Tipus",
                    "Acció",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        color: colors.grey[100],
                        fontWeight: "bold",
                        fontSize: "18px",
                        textAlign: "center",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player, index) => {
                  // Si player tiene opciones, mostrar botón para seleccionar
                  if (player.options) {
                    return (
                      <TableRow key={index}>
                        <TableCell colSpan={10} align="center">
                          <Typography color={colors.grey[100]}>
                            Aquest jugador té diverses opcions.
                          </Typography>
                          <Button
                            text="Seleccionar opció"
                            onClick={() => {
                              setSelectOptions(player.options);
                              setSelectIndex(index);
                            }}
                            sx={{
                              backgroundColor: colors.greenAccent[500],
                              color: colors.grey[100],
                              mt: 2,
                              "&:hover": {
                                backgroundColor: colors.greenAccent[400],
                              },
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  }

                  // Render normal si no hay opciones
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          src={`data:image/png;base64,${player.image}`}
                          alt={player.name}
                          style={{ width: "100px", borderRadius: "8px" }}
                        />
                      </TableCell>
                      {[
                        "name",
                        "rating",
                        "league",
                        "club",
                        "nacionality",
                        "position",
                        "price",
                        "version",
                      ].map((field) => (
                        <TableCell
                          key={field}
                          sx={{
                            color: colors.grey[100],
                            fontSize: "18px",
                            textAlign: "center",
                          }}
                        >
                          {player[field]}
                        </TableCell>
                      ))}
                      <TableCell>
                        <Button
                          text={<DeleteIcon />}
                          onClick={() => handleDeletePlayer(index)}
                          color="error"
                          sx={{
                            width: "40px",
                            height: "40px",
                            fontSize: "16px",
                            padding: "5px",
                            minWidth: "auto",
                            marginRight: "10px",
                          }}
                        />
                        <Button
                          text={<InfoIcon />}
                          onClick={() => handlePlayerInfo(player)}
                          color="primary"
                          sx={{
                            width: "40px",
                            height: "40px",
                            fontSize: "16px",
                            padding: "5px",
                            minWidth: "auto",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="player-info-title"
        aria-describedby="player-info-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "560px",
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          {selectedPlayer && (
            <>
              <Typography
                id="player-info-title"
                variant="h2"
                color={colors.grey[100]}
                align="center"
                mb={2}
              >
                {selectedPlayer.name}
              </Typography>
              <Box display="flex" flexDirection="row">
                {/* Informació a l'esquerra */}
                <Box flex={1} pr={3} display="flex" alignItems="flex-start">
                  <Typography
                    id="player-info-description"
                    variant="h5"
                    color={colors.grey[100]}
                  >
                    <strong>Puntuació:</strong> {selectedPlayer.rating}
                    <br />
                    <strong>Lliga:</strong> {selectedPlayer.league}
                    <br />
                    <strong>Club:</strong> {selectedPlayer.club}
                    <br />
                    <strong>Nacionalitat:</strong> {selectedPlayer.nacionality}
                    <br />
                    <strong>Posició:</strong> {selectedPlayer.position}
                    <br />
                    <strong>Preu:</strong> {selectedPlayer.price}
                    <br />
                    <strong>Tipus:</strong> {selectedPlayer.version}
                    <br />
                    <strong>Ritme:</strong> {selectedPlayer.pace}
                    <br />
                    <strong>Xut:</strong> {selectedPlayer.shooting}
                    <br />
                    <strong>Passada:</strong> {selectedPlayer.passing}
                    <br />
                    <strong>Driblatge:</strong> {selectedPlayer.dribbling}
                    <br />
                    <strong>Defensa:</strong> {selectedPlayer.defending}
                    <br />
                    <strong>Físic:</strong> {selectedPlayer.phisicality}
                    <br />
                    <strong>Habilitats:</strong> {selectedPlayer.skills}
                    <br />
                    <strong>Peu dolent:</strong> {selectedPlayer.weakFoot}
                    <br />
                    <strong>Peu bo:</strong> {selectedPlayer.foot}
                    <br />
                    <strong>Gènere:</strong> {selectedPlayer.gender}
                    <br />
                    <strong>Tipus de cos:</strong> {selectedPlayer.body}
                  </Typography>
                </Box>
                {/* Imatge a la dreta */}
                <Box
                  flex={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <img
                    src={`data:image/png;base64,${selectedPlayer.image}`}
                    alt={selectedPlayer.name}
                    style={{ width: "220px", borderRadius: "12px" }}
                  />
                </Box>
              </Box>
              {/* Botó tancar abaix a la dreta */}
              <Box mt={3} display="flex" justifyContent="flex-end">
                <Button
                  text="Tancar"
                  onClick={() => setOpenModal(false)}
                  sx={{
                    backgroundColor: colors.redAccent[500],
                    color: colors.grey[100],
                    "&:hover": {
                      backgroundColor: colors.redAccent[700],
                    },
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Modal
        open={!!selectOptions}
        onClose={() => setSelectOptions(null)}
        aria-labelledby="select-player-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 400,
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" color={colors.grey[100]} mb={2}>
            Selecciona una opció de jugador
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            gap={3}
          >
            {/* Imagen a la izquierda */}
            <Box>
              <img
                src={
                  selectOptions &&
                  selectOptions[0]?.image?.startsWith("data:image")
                    ? selectOptions[0].image
                    : `data:image/png;base64,${
                        selectOptions && selectOptions[0]?.image
                      }`
                }
                alt={selectOptions && selectOptions[0]?.name}
                style={{
                  width: "180px",
                  borderRadius: "12px",
                  marginRight: "16px",
                }}
              />
            </Box>
            {/* Opciones a la derecha */}
            <Box flex={1}>
              {selectOptions &&
                selectOptions.map((option, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                    p={2}
                    sx={{
                      backgroundColor: colors.primary[500],
                      borderRadius: "8px",
                    }}
                  >
                    <Box>
                      <Typography color={colors.grey[100]}>
                        {option.name} - {option.club} - {option.league} -
                        {option.nacionality} - {option.position} -{" "}
                        {option.price} coins
                      </Typography>
                    </Box>
                    <Button
                      text="Seleccionar"
                      onClick={async () => {
                        // 1. Lanza la petición POST al backend con los datos del jugador seleccionado
                        try {
                          await fetch(
                            "http://127.0.0.1:8000/api/filter-player",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                name: option.name,
                                rating: option.rating,
                                position: option.position,
                                version: option.version,
                              }),
                            }
                          );
                        } catch (err) {
                          console.error("Error al filtrar jugador:", err);
                        }

                        // 2. Actualiza el estado y guarda en la base de datos como antes
                        setPlayers((prev) => {
                          const updated = prev.map((p, i) =>
                            i === selectIndex ? option : p
                          );
                          savePlayers(updated);
                          return updated;
                        });
                        setSelectOptions(null);
                        setSelectIndex(null);
                      }}
                      sx={{
                        backgroundColor: colors.greenAccent[500],
                        color: colors.grey[100],
                        "&:hover": { backgroundColor: colors.greenAccent[400] },
                      }}
                    />
                  </Box>
                ))}
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  text="Cancel·lar"
                  onClick={() => setSelectOptions(null)}
                  sx={{
                    backgroundColor: colors.redAccent[500],
                    color: colors.grey[100],
                    "&:hover": { backgroundColor: colors.redAccent[700] },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ClubPlayers;
