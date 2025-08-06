import React, { useState } from "react";
import { Box, Typography, Modal, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Button from "../../components/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiButton from "@mui/material/Button"; // Añade este import

const CaptureImages = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [captures, setCaptures] = useState([]); // Estado para almacenar las capturas
  const [interval, setInterval] = useState(""); // Estado para el intervalo
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const [selectedImage, setSelectedImage] = useState(null); // Imagen seleccionada
  const [manualImage, setManualImage] = useState(null);

  const handleStartCapture = async () => {
    try {
      // Validar que el intervalo sea un número válido
      if (!interval || isNaN(interval) || interval <= 0) {
        alert("Per favor, ingresa un interval vàlid en segons.");
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/start-capture-loop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ interval: parseInt(interval, 10) }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al iniciar les captures");
      }

      const data = await response.json();
      console.log("Captures iniciades:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleStopCapture = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/stop-capture-loop",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al detener las capturas");
      }

      const data = await response.json();
      console.log("Capturas detenidas:", data);

      // Guardar las capturas en el estado
      if (data.captures) {
        setCaptures(data.captures);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleAcceptCaptures = async () => {
    try {
      // Prepara el array para enviar ambos campos
      const capturesToSend = captures.map((capture) => ({
        file: capture.file || null,
        image_base64: capture.image_base64 || null,
      }));

      // Enviar la petición POST al backend
      const response = await fetch("http://127.0.0.1:8000/api/save-captures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ captures: capturesToSend }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar les captures");
      }

      const data = await response.json();
      console.log("Capturas guardadas:", data);

      setCaptures([]);
      alert("Captures guardades exitosament.");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Hi ha hagut un error al guardar les captures.");
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Establecer la imagen seleccionada
    setOpenModal(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Cerrar el modal
    setSelectedImage(null); // Limpiar la imagen seleccionada
  };

  const handleDeleteCapture = (index) => {
    // Filtrar las capturas para eliminar la seleccionada
    const updatedCaptures = captures.filter((_, i) => i !== index);
    setCaptures(updatedCaptures); // Actualizar el estado con las capturas restantes
  };

  // Manejar la subida de imagen manual
  const handleManualImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      // Añadir la imagen manual al array de capturas
      setCaptures((prev) => [
        ...prev,
        { image_base64: reader.result.split(",")[1], file: file.name },
      ]);
      setManualImage(null);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Captura d'imatges"
          subtitle="Realitza captures dels jugadors del teu club"
        />
      </Box>
      <Box
        mt="20px"
        display="flex"
        justifyContent="space-between"
        gap="20px"
        flexWrap="wrap"
      >
        {/* Box de instrucciones */}
        <Box
          flex="1"
          p="20px"
          borderRadius="8px"
          backgroundColor={colors.primary[400]}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          minWidth="300px"
        >
          <Box display="flex" mb="10px">
            <InfoOutlinedIcon
              fontSize="large"
              sx={{ color: colors.greenAccent[500], mr: "10px" }}
            />
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
              Instruccions per a la captura d'imatges
            </Typography>
          </Box>
          <Typography variant="h4" color={colors.grey[100]} lineHeight="1.8">
            1. Obre el joc FC24 al teu ordinador.
            <br />
            2. Dirigeix-te a l’apartat on surten tots els jugadors del teu club.
            <br />
            3. Fes clic al botó d’iniciar captures de pantalla.
            <br />
            4. Cada vegada que sentis un so, has de passar a la següent pàgina
            de jugadors.
            <br />
            5. Quan hagis acabat, fes clic al botó de finalitzar captures de
            pantalla.
            <br />
            6. Si no has entès el procés, pots veure el vídeo d’ajuda que hi ha
            a l’inici de l’aplicació.
          </Typography>
        </Box>

        {/* Box de capturas */}
        <Box
          flex="1"
          p="20px"
          borderRadius="8px"
          backgroundColor={colors.primary[400]}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          minWidth="300px"
        >
          <Typography
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            mb="20px"
          >
            Iniciar i aturar captures automàtiques
          </Typography>
          <Box mb="20px">
            <TextField
              label="Interval entre captures (segons)"
              variant="outlined"
              fullWidth
              value={interval}
              onChange={(e) => setInterval(e.target.value)} // Actualizar el estado con el valor ingresado
              sx={{
                input: { color: colors.grey[100] },
                label: { color: colors.grey[100] },
                "& .Mui-focused": {
                  color: colors.grey[100], // Mantener el color del label al enfocarse
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: colors.grey[100], // Asegurar que el label no cambie de color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colors.grey[100], // Color del borde por defecto
                  },
                  "&:hover fieldset": {
                    borderColor: colors.grey[200], // Color del borde al pasar el mouse
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors.grey[100], // Mantener el color del borde al enfocarse
                  },
                },
              }}
            />
          </Box>
          <Box display="flex" justifyContent="space-between" gap="20px">
            <Button
              text="Iniciar Captures"
              onClick={handleStartCapture}
              sx={{
                width: "45%",
                backgroundColor: colors.greenAccent[500],
                color: colors.grey[100],
                "&:hover": {
                  backgroundColor: colors.greenAccent[400],
                },
              }}
            />
            <Button
              text="Aturar Captures"
              onClick={handleStopCapture}
              sx={{
                width: "45%",
                backgroundColor: colors.redAccent[500],
                color: colors.grey[100],
                "&:hover": {
                  backgroundColor: colors.redAccent[400],
                },
              }}
            />
          </Box>
          <Typography
            mt="20px"
            variant="h3"
            color={colors.grey[100]}
            fontWeight="bold"
            mb="20px"
          >
            Afegir captures manuals
          </Typography>
          <Box mb="10px">
            <MuiButton
              component="label"
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[500],
                color: colors.grey[100],
                "&:hover": {
                  backgroundColor: colors.greenAccent[400],
                },
                mb: 1,
              }}
            >
              Puja una imatge
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleManualImageChange}
              />
            </MuiButton>
          </Box>
        </Box>
      </Box>
      <Box
        mt="20px"
        p="20px"
        borderRadius="8px"
        backgroundColor={colors.primary[400]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      >
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          mb="20px"
        >
          Imatges obtingudes
        </Typography>
        <Box display="flex" flexWrap="wrap" gap="20px">
          {captures.map((capture, index) => (
            <Box
              key={index}
              p="10px"
              border="1px solid"
              borderColor={colors.grey[300]}
              borderRadius="8px"
              sx={{ cursor: "pointer", position: "relative" }}
            >
              <img
                src={`data:image/png;base64,${capture.image_base64}`} // Mostrar la imagen en base64
                alt={`Captura ${index + 1}`}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
                onClick={() => handleImageClick(capture.image_base64)} // Manejar clic en la imagen
              />
              {/* Botón para eliminar la captura */}
              <Button
                text={<DeleteIcon />} // Usar el ícono en lugar del texto
                onClick={() => handleDeleteCapture(index)} // Llamar a la función para eliminar la captura
                color="error"
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  textTransform: "none",
                  fontSize: "12px",
                  padding: "5px 10px",
                  minWidth: "auto", // Ajustar el tamaño del botón al contenido
                }}
              />
            </Box>
          ))}
        </Box>
        {/* Botón de aceptar */}
        <Box display="flex" justifyContent="flex-end" mt="20px">
          <Button
            text="Acceptar"
            onClick={handleAcceptCaptures} // Llamar a la función para enviar las capturas
            color="success"
            sx={{
              textTransform: "none",
              fontSize: "16px",
              padding: "10px 20px",
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
              "&:hover": {
                backgroundColor: colors.greenAccent[400],
              },
              mb: 1,
            }}
          />
        </Box>
      </Box>

      {/* Modal para mostrar la imagen ampliada */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "2000px",
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Typography
            id="modal-title"
            variant="h4"
            color={colors.grey[100]}
            mb="20px"
          >
            imatge ampliada
          </Typography>
          {selectedImage && (
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Imagen ampliada"
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          )}
          <Box display="flex" justifyContent="flex-end" mt="20px">
            <Button
              text="Cerrar"
              onClick={handleCloseModal}
              color="error"
              sx={{ textTransform: "none" }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CaptureImages;
