import React, { ReactElement } from 'react';
import { FormControl, Grid, IconButton, List, ListItem, ListItemText, TextField, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { SmallAvatar } from '../../Common/CustomStyleComponents';

function ChatComponentDialogBox():ReactElement {
  return (
    <Box sx={{ display: 'flex', flexDirection: "column", height: 400, width: '100%' }}>
      <List sx={{ flexGrow: 1, height: 300, overflow: "auto", width: '100%'}}>
          <ListItem>
            <SmallAvatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
            <ListItemText>
              Первое сообщение
            </ListItemText>
          </ListItem>
          <ListItem>
            <SmallAvatar alt="image" src="https://avatars.githubusercontent.com/u/38877564?v=4" />
            <ListItemText>
              Второе сообщение
            </ListItemText>
          </ListItem>
      </List>
      <Grid container spacing={1} alignItems="center" sx={{ pl: 1 }}>
          <Grid xs={11} item>
              <FormControl fullWidth>
                  <TextField label="Начниете вводить тут..." variant="outlined" />
              </FormControl>
          </Grid>
          <Grid xs={1} item>
              <IconButton aria-label="send" color="primary">
                  <SendIcon />
              </IconButton>
          </Grid>
      </Grid>
    </Box>
  );
}

export default ChatComponentDialogBox;