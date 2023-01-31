import React, { ReactElement } from 'react';
import { Avatar, List, ListItem, ListItemText, Box } from "@mui/material";
import { StyledBadge } from '../../Common/CustomStyleComponents'

function ChatComponentUsersChating():ReactElement {
  return (
    <Box sx={{ display: 'flex', flexDirection: "column"}}>
      <List sx={{flexGrow: 1, height:300, overflowY: 'scroll', overflowX: 'hidden'}}>
        <ListItem sx={{cursor: 'pointer'}}>
          <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          >
            <Avatar alt="image" src="https://avatars.githubusercontent.com/u/38877564?v=4" />
          </StyledBadge>
          <ListItemText>JIK</ListItemText>
        </ListItem>
        <ListItem sx={{cursor: 'pointer'}}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="image" src="https://avatars.githubusercontent.com/u/74072987?v=4" />
          </StyledBadge>
          <ListItemText>Ferka</ListItemText>
        </ListItem>
        <ListItem sx={{cursor: 'pointer'}}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
          </StyledBadge>
          <ListItemText> Syderi </ListItemText>
        </ListItem>
        <ListItem sx={{cursor: 'pointer'}}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
          </StyledBadge>
          <ListItemText> Syderi </ListItemText>
        </ListItem>
        <ListItem sx={{cursor: 'pointer'}}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
          </StyledBadge>
          <ListItemText> Syderi </ListItemText>
        </ListItem>
        <ListItem sx={{cursor: 'pointer'}}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
          </StyledBadge>
          <ListItemText> Syderi </ListItemText>
        </ListItem>
        <ListItem sx={{cursor: 'pointer'}}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
          </StyledBadge>
          <ListItemText> Syderi </ListItemText>
        </ListItem>
        <ListItem sx={{cursor: 'pointer'}}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
          </StyledBadge>
          <ListItemText> Syderi </ListItemText>
        </ListItem>
      </List>
    </Box>  
  );
}

export default ChatComponentUsersChating;