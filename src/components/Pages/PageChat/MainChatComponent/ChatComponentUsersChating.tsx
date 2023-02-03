import { ReactElement, useContext, useState } from 'react';
import { Avatar, List, ListItem, ListItemText, Box, useMediaQuery, useTheme } from "@mui/material";
import { StyledBadge } from '../../../Common/CustomStyleComponents'
import { Context } from '../../../Context/context'

function ChatComponentUsersChating(): ReactElement {
  const theme = useTheme()

  const isMatchMoreScreen = useMediaQuery(theme.breakpoints.up('sm'))
  // const [showNameUser, setshowNameUser] = useState(true)

  // console.log('isMatchMoreScreen',isMatchMoreScreen)

  const { isOpenUsers } = useContext(Context)


  return (
    <Box sx={{ display: `${isOpenUsers ? 'flex': 'none'}`, flexDirection: "column", maxWidth: '30%' }}>
       <List sx={{ flexGrow: 1, height: 300, overflowY: 'scroll', overflowX: 'hidden' }}>
          <ListItem sx={{ cursor: 'pointer' }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="image" src="https://avatars.githubusercontent.com/u/38877564?v=4" />
            </StyledBadge>
            {isMatchMoreScreen && <ListItemText>JIK</ListItemText>}

          </ListItem>
          <ListItem sx={{
            cursor: 'pointer',

            wordBreak: 'break-word',
          }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="image" src="https://avatars.githubusercontent.com/u/74072987?v=4" />
            </StyledBadge>
            {isMatchMoreScreen && <ListItemText >Ferka</ListItemText>}
          </ListItem>
          <ListItem sx={{ cursor: 'pointer' }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
            </StyledBadge>
            {isMatchMoreScreen && <ListItemText> Syderi </ListItemText>}
          </ListItem>
        </List>

    </Box>
  );
}

export default ChatComponentUsersChating;