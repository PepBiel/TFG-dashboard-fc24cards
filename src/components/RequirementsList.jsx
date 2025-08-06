import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ScienceIcon from "@mui/icons-material/Science";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import CategoryIcon from "@mui/icons-material/Category";
import ShieldIcon from "@mui/icons-material/Shield";
import FlagIcon from "@mui/icons-material/Flag";

const RequirementsList = ({ requirements, colors }) => {
  return (
    <List sx={{ mt: "10px", width: "100%", color: colors.grey[100] }}>
      {/* Requisits de mitjana */}
      {requirements?.average?.min && (
        <ListItem>
          <ListItemIcon>
            <StarIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Mitjana mínima: ${requirements.average.min}`}
          />
        </ListItem>
      )}
      {requirements?.average?.max && (
        <ListItem>
          <ListItemIcon>
            <StarIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Mitjana màxima: ${requirements.average.max}`}
          />
        </ListItem>
      )}

      {/* Requisits de química */}
      {requirements?.chemistry?.min && (
        <ListItem>
          <ListItemIcon>
            <ScienceIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Química mínima: ${requirements.chemistry.min}`}
          />
        </ListItem>
      )}
      {requirements?.chemistry?.max && (
        <ListItem>
          <ListItemIcon>
            <ScienceIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Química màxima: ${requirements.chemistry.max}`}
          />
        </ListItem>
      )}
      {requirements?.chemistry?.player_min && (
        <ListItem>
          <ListItemIcon>
            <ScienceIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Química mínima per jugador: ${requirements.chemistry.player_min}`}
          />
        </ListItem>
      )}
      {requirements?.chemistry?.player_max && (
        <ListItem>
          <ListItemIcon>
            <ScienceIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Química màxima per jugador: ${requirements.chemistry.player_max}`}
          />
        </ListItem>
      )}

      {/* Requisits de nacionalitats */}
      {requirements?.nationalities?.min && (
        <ListItem>
          <ListItemIcon>
            <FlagIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Nacionalitats mínimes: ${requirements.nationalities.min
              .map((nat) => `${nat.name}: ${nat.number}`)
              .join(", ")}`}
          />
        </ListItem>
      )}
      {requirements?.nationalities?.max && (
        <ListItem>
          <ListItemIcon>
            <FlagIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Nacionalitats màximes: ${requirements.nationalities.max
              .map((nat) => `${nat.name}: ${nat.number}`)
              .join(", ")}`}
          />
        </ListItem>
      )}
      {requirements?.nationalities?.exact && (
        <ListItem>
          <ListItemIcon>
            <FlagIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Nacionalitats exactes en l'equip: ${requirements.nationalities.exact}`}
          />
        </ListItem>
      )}
      {requirements?.nationalities?.player_min && (
        <ListItem>
          <ListItemIcon>
            <FlagIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Jugadors mínims per nacionalitat: ${requirements.nationalities.player_min}`}
          />
        </ListItem>
      )}
      {requirements?.nationalities?.player_min && (
        <ListItem>
          <ListItemIcon>
            <FlagIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Jugadors máxims per nacionalitat: ${requirements.nationalities.player_min}`}
          />
        </ListItem>
      )}

      {/* Requisits de clubs */}
      {requirements?.clubs?.min && (
        <ListItem>
          <ListItemIcon>
            <ShieldIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Clubs mínims: ${requirements.clubs.min
              .map((club) => `${club.name}: ${club.number}`)
              .join(", ")}`}
          />
        </ListItem>
      )}
      {requirements?.clubs?.max && (
        <ListItem>
          <ListItemIcon>
            <ShieldIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Clubs máxims: ${requirements.clubs.max
              .map((club) => `${club.name}: ${club.number}`)
              .join(", ")}`}
          />
        </ListItem>
      )}
      {requirements?.clubs?.exact && (
        <ListItem>
          <ListItemIcon>
            <ShieldIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Clubs exactes en l'equip: ${requirements.clubs.exact}`}
          />
        </ListItem>
      )}
      {requirements?.clubs?.player_min && (
        <ListItem>
          <ListItemIcon>
            <ShieldIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Jugadors mínims per club: ${requirements.clubs.player_min}`}
          />
        </ListItem>
      )}
      {requirements?.clubs?.player_max && (
        <ListItem>
          <ListItemIcon>
            <ShieldIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Jugadors máxims per club: ${requirements.clubs.player_max}`}
          />
        </ListItem>
      )}

      {/* Requisits de lligues */}
      {requirements?.leagues?.min && (
        <ListItem>
          <ListItemIcon>
            <SportsSoccerIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Lligues mínimes: ${requirements.leagues.min
              .map((club) => `${club.name}: ${club.number}`)
              .join(", ")}`}
          />
        </ListItem>
      )}
      {requirements?.leagues?.max && (
        <ListItem>
          <ListItemIcon>
            <SportsSoccerIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Lligues máximes: ${requirements.leagues.max
              .map((club) => `${club.name}: ${club.number}`)
              .join(", ")}`}
          />
        </ListItem>
      )}
      {requirements?.leagues?.exact && (
        <ListItem>
          <ListItemIcon>
            <SportsSoccerIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Lligues exactes en l'equip: ${requirements.leagues.exact}`}
          />
        </ListItem>
      )}
      {requirements?.leagues?.player_min && (
        <ListItem>
          <ListItemIcon>
            <SportsSoccerIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Jugadors mínims per lliga: ${requirements.leagues.player_min}`}
          />
        </ListItem>
      )}
      {requirements?.leagues?.player_max && (
        <ListItem>
          <ListItemIcon>
            <SportsSoccerIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Jugadors máxims per lliga: ${requirements.leagues.player_max}`}
          />
        </ListItem>
      )}

      {/* Requisits de versions */}
      {requirements?.versions?.min && (
        <ListItem>
          <ListItemIcon>
            <CategoryIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Versions mínimes: ${requirements.versions.min
              .map((version) => `${version.name}: ${version.number}`)
              .join(", ")}`}
          />
        </ListItem>
      )}
      {requirements?.versions?.max && (
        <ListItem>
          <ListItemIcon>
            <CategoryIcon style={{ color: colors.greenAccent[500] }} />
          </ListItemIcon>
          <ListItemText
            primary={`Versions máximes: ${requirements.versions.max
              .map((version) => `${version.name}: ${version.number}`)
              .join(", ")}`}
          />
        </ListItem>
      )}
    </List>
  );
};

export default RequirementsList;
