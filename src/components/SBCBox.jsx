import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Modal,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
} from "@mui/material";
import RequirementsList from "./RequirementsList";
import PitchFormation from "./PitchFormation";
import StarIcon from "@mui/icons-material/Star";
import ScienceIcon from "@mui/icons-material/Science";
import PaidIcon from "@mui/icons-material/Paid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ShieldIcon from "@mui/icons-material/Shield";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FlagIcon from "@mui/icons-material/Flag";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

const SBCBox = ({ sbcNumber, colors, sbc }) => {
  const image = `/assets/${sbc.image}`;
  const title = sbc.name;
  const requirements = sbc.requirements;
  const formation = sbc.formation;
  const positions = sbc.positions;

  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [generatedSquad, setGeneratedSquad] = useState([]);
  const [squadInfo, setSquadInfo] = useState({});
  const [openClubs, setOpenClubs] = useState(false);
  const [openLeagues, setOpenLeagues] = useState(false);
  const [openNationalities, setOpenNationalities] = useState(false);
  const [openVersions, setOpenVersions] = useState(false);

  const handleNextPage = () => setPage(2);
  const handlePrevPage = () => setPage(1);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const toggleClubs = () => setOpenClubs(!openClubs);
  const toggleLeagues = () => setOpenLeagues((prev) => !prev);
  const toggleNationalities = () => setOpenNationalities((prev) => !prev);
  const toggleVersions = () => setOpenVersions((prev) => !prev);

  const exampleSquad = [
    {
      id: 1,
      position: "GK",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 2,
      position: "LB",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 3,
      position: "CB",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 4,
      position: "CB",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 5,
      position: "RB",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 6,
      position: "CM",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 7,
      position: "CM",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 8,
      position: "CM",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 9,
      position: "LW",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 10,
      position: "ST",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
    {
      id: 11,
      position: "RW",
      image: "/assets/base-card.png",
      chemistry: 0,
      correct_position: true,
    },
  ];

  const handleGenerateTeam = async () => {
    setGeneratedSquad([]);
    setSquadInfo({});
    try {
      const response = await fetch("http://127.0.0.1:8000/api/generate-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sbcNumber: sbcNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en generar l'equip");
      }

      const data = await response.json();

      const team = [];
      let index = 0;
      const chemestry = data.data.team_info.players_chemistry;

      data.data.team.forEach((player) => {
        const playerData = {
          id: index++,
          position: player.assigned_position,
          image: player.player.image,
          chemestry: chemestry.find((p) => p.player_name === player.player.name)
            .chemistry,
          correct_position: player.player.position
            .split(",")
            .map((pos) => pos.trim())
            .includes(player.assigned_position),
        };
        team.push(playerData);
      });

      setGeneratedSquad(team);
      setSquadInfo(data.data);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Hi ha hagut un error en generar l'equip.");
    }
  };

  return (
    <Box
      p="20px"
      borderRadius="8px"
      sx={{
        backgroundColor: colors.primary[500],
      }}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxHeight="600px"
      height="100%"
    >
      {page === 1 ? (
        <>
          <Typography
            variant="h4"
            color={colors.grey[100]}
            textAlign="center"
            fontWeight="bold"
          >
            {title}
          </Typography>
          <img
            src={image}
            alt={title}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
          <Button
            onClick={handleNextPage}
            variant="contained"
            style={{
              marginTop: "10px",
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
            }}
          >
            Veure requisits
          </Button>
          <Button
            onClick={handleOpenModal}
            variant="contained"
            style={{
              marginTop: "10px",
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
            }}
          >
            Completar SBC
          </Button>
        </>
      ) : (
        <>
          <Typography
            variant="h5"
            color={colors.grey[100]}
            textAlign="center"
            fontWeight="bold"
          >
            Requisits
          </Typography>
          <RequirementsList requirements={requirements} colors={colors} />
          <Button
            onClick={handlePrevPage}
            variant="contained"
            style={{
              marginTop: "10px",
              backgroundColor: colors.greenAccent[500],
              color: colors.grey[100],
            }}
          >
            Tornar
          </Button>
        </>
      )}

      {/* Modal per completar SBC */}
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
            width: "1900px",
            height: "1150px",
            bgcolor: colors.primary[400],
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            id="modal-title"
            variant="h3"
            color={colors.grey[100]}
            textAlign="center"
            fontWeight="bold"
          >
            Generar plantilla
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              height: "100%",
            }}
          >
            <Box
              sx={{
                flex: 1,
                bgcolor: colors.primary[500],
                borderRadius: "8px",
                p: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PitchFormation
                formation={formation}
                positions={positions}
                squad={
                  generatedSquad.length > 0 ? generatedSquad : exampleSquad
                }
              />
            </Box>

            <Box
              sx={{
                flex: 1,
                bgcolor: colors.primary[500],
                borderRadius: "8px",
                p: 3,
                color: colors.grey[100],
                height: "950px",
                maxHeight: "100%",
                overflowY: "auto",
              }}
              maxWidth="400px"
            >
              <Typography variant="h4" color={colors.grey[100]} mb="20px">
                {title}
              </Typography>
              <Typography variant="h4" color={colors.grey[100]} mb="20px">
                {formation}
              </Typography>
              <Typography
                id="modal-title"
                variant="h4"
                color={colors.grey[100]}
                mb="20px"
              >
                Requisits
              </Typography>
              <RequirementsList requirements={requirements} colors={colors} />
              <Divider
                sx={{
                  my: 2,
                  bgcolor: colors.grey[700],
                }}
              />
              <Typography
                id="modal-title"
                variant="h4"
                color={colors.grey[100]}
                mb="20px"
              >
                Informació de l'equip
              </Typography>
              <List sx={{ mt: "10px", width: "100%", color: colors.grey[100] }}>
                {
                  <ListItem>
                    <ListItemIcon>
                      <FitnessCenterIcon
                        style={{ color: colors.greenAccent[500] }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Fitness de l'equip: ${squadInfo?.fitness || 0}`}
                    />
                  </ListItem>
                }
                {
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon style={{ color: colors.greenAccent[500] }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Mitjana de l'equip: ${
                        squadInfo?.team_info?.overall_rounded || 0
                      }`}
                    />
                  </ListItem>
                }
                {
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon style={{ color: colors.greenAccent[500] }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Mitjana de l'equip sense arrodonir: ${
                        squadInfo?.team_info?.overall || 0
                      }`}
                    />
                  </ListItem>
                }
                {
                  <ListItem>
                    <ListItemIcon>
                      <ScienceIcon style={{ color: colors.greenAccent[500] }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Química de l'equip: ${
                        squadInfo?.team_info?.team_chemistry || 0
                      }`}
                    />
                  </ListItem>
                }
                {
                  <ListItem>
                    <ListItemIcon>
                      <PaidIcon style={{ color: colors.greenAccent[500] }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Preu de l'equip: ${
                        squadInfo?.team_info?.team_price || 0
                      }`}
                    />
                  </ListItem>
                }
                {(() => {
                  const clubsObj = squadInfo?.team_info?.clubs ?? {};
                  const clubsTotal = Object.keys(clubsObj).length || 0;
                  const leaguesObj = squadInfo?.team_info?.leagues ?? {};
                  const leaguesTotal = Object.keys(leaguesObj).length || 0;
                  const nationalitiesObj =
                    squadInfo?.team_info?.nationalities ?? {};
                  const nationalitiesTotal =
                    Object.keys(nationalitiesObj).length || 0;
                  const versionsObj = squadInfo?.team_info?.versions ?? {};
                  const versionsTotal = Object.keys(versionsObj).length || 0;

                  return (
                    <>
                      {/* CLUBS */}
                      <ListItem button onClick={toggleClubs}>
                        <ListItemIcon>
                          <ShieldIcon sx={{ color: colors.greenAccent[500] }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Clubs diferents: ${clubsTotal}`}
                        />
                        {openClubs ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItem>
                      <Collapse in={openClubs} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {Object.entries(clubsObj)
                            .sort((a, b) => b[1] - a[1])
                            .map(([club, qty]) => (
                              <ListItem key={club} sx={{ pl: 6 }}>
                                <ListItemIcon>
                                  <Avatar
                                    sx={{
                                      bgcolor: colors.greenAccent[600],
                                      width: 24,
                                      height: 24,
                                    }}
                                  >
                                    <ShieldIcon sx={{ fontSize: 16 }} />
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                  primary={club}
                                  secondary={`×${qty}`}
                                  primaryTypographyProps={{ fontSize: 14 }}
                                />
                              </ListItem>
                            ))}
                        </List>
                      </Collapse>

                      {/* LLIGUES */}
                      <ListItem button onClick={toggleLeagues}>
                        <ListItemIcon>
                          <SportsSoccerIcon
                            sx={{ color: colors.greenAccent[500] }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Lligues diferents: ${leaguesTotal}`}
                        />
                        {openLeagues ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItem>
                      <Collapse in={openLeagues} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {Object.entries(leaguesObj)
                            .sort((a, b) => b[1] - a[1])
                            .map(([league, qty]) => (
                              <ListItem key={league} sx={{ pl: 6 }}>
                                <ListItemIcon>
                                  <Avatar
                                    sx={{
                                      bgcolor: colors.greenAccent[600],
                                      width: 24,
                                      height: 24,
                                    }}
                                  >
                                    <SportsSoccerIcon sx={{ fontSize: 16 }} />
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                  primary={league}
                                  secondary={`×${qty}`}
                                  primaryTypographyProps={{ fontSize: 14 }}
                                />
                              </ListItem>
                            ))}
                        </List>
                      </Collapse>

                      {/* NACIONALITATS */}
                      <ListItem button onClick={toggleNationalities}>
                        <ListItemIcon>
                          <FlagIcon sx={{ color: colors.greenAccent[500] }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Nacionalitats diferents: ${nationalitiesTotal}`}
                        />
                        {openNationalities ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </ListItem>
                      <Collapse
                        in={openNationalities}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {Object.entries(nationalitiesObj)
                            .sort((a, b) => b[1] - a[1])
                            .map(([nat, qty]) => (
                              <ListItem key={nat} sx={{ pl: 6 }}>
                                <ListItemIcon>
                                  <Avatar
                                    sx={{
                                      bgcolor: colors.greenAccent[600],
                                      width: 24,
                                      height: 24,
                                    }}
                                  >
                                    <FlagIcon sx={{ fontSize: 16 }} />
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                  primary={nat}
                                  secondary={`×${qty}`}
                                  primaryTypographyProps={{ fontSize: 14 }}
                                />
                              </ListItem>
                            ))}
                        </List>
                      </Collapse>

                      {/* VERSIONS */}
                      <ListItem button onClick={toggleVersions}>
                        <ListItemIcon>
                          <RecentActorsIcon
                            sx={{ color: colors.greenAccent[500] }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Versions diferents: ${versionsTotal}`}
                        />
                        {openVersions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItem>
                      <Collapse in={openVersions} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {Object.entries(versionsObj)
                            .sort((a, b) => b[1] - a[1])
                            .map(([nat, qty]) => (
                              <ListItem key={nat} sx={{ pl: 6 }}>
                                <ListItemIcon>
                                  <Avatar
                                    sx={{
                                      bgcolor: colors.greenAccent[600],
                                      width: 24,
                                      height: 24,
                                    }}
                                  >
                                    <RecentActorsIcon sx={{ fontSize: 16 }} />
                                  </Avatar>
                                </ListItemIcon>
                                <ListItemText
                                  primary={nat}
                                  secondary={`×${qty}`}
                                  primaryTypographyProps={{ fontSize: 14 }}
                                />
                              </ListItem>
                            ))}
                        </List>
                      </Collapse>
                    </>
                  );
                })()}
              </List>
            </Box>
          </Box>
          {/* Botons d'acció */}
          <Box display="flex" justifyContent="flex-end" mt="20px">
            <Button
              onClick={handleCloseModal}
              variant="contained"
              style={{
                marginRight: "10px",
                backgroundColor: colors.redAccent[500],
                color: colors.grey[100],
              }}
            >
              Cancel·lar
            </Button>
            <Button
              onClick={handleGenerateTeam}
              variant="contained"
              style={{
                backgroundColor: colors.greenAccent[500],
                color: colors.grey[100],
              }}
            >
              Generar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SBCBox;
