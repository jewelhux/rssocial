import React, { ReactElement } from 'react';
import { FormControl, Grid, IconButton, List, ListItem, ListItemText, TextField, Box, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { SmallAvatar } from '../../../Common/CustomStyleComponents';

function ChatComponentDialogBox(): ReactElement {
  return (
    <Box sx={{ display: 'flex', flexDirection: "column", height: '60vh', width: '100%' }}>



      <Box sx={{ display: 'flex', flexDirection: "column", flexGrow: 1, height: 300, overflow: "auto", width: '100%' }}>
        <Box padding={1} display='flex' sx={{ flexDirection: "column" }}>
          <Box display='flex' marginTop={2} sx={{ flexDirection: 'row-reverse' }}>
            <SmallAvatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
            <Typography
              sx={{
                margin: '0 10px',
                borderRadius: '10px',
                backgroundColor: '#1876f9',
                color: 'white',
                padding: 1,
                // width: 'max-content',
                hyphens: 'auto',
                maxWidth: '65%',
                wordBreak:'break-all',

              }}
            >
              zzzzzzzzsquam esse.
            </Typography>
          </Box>
          <Typography variant='subtitle1' display='flex' sx={{ fontSize: 14, flexDirection: 'row-reverse' }}>
            5 часов назад
          </Typography>
        </Box>
        <Box padding={1} display='flex' sx={{ flexDirection: "column" }}>
          <Box display='flex' marginTop={2} sx={{ flexDirection: 'row' }}>
            <SmallAvatar alt="image" src="https://avatars.githubusercontent.com/u/107023048?v=4" />
            <Typography
              sx={{
                margin: '0 10px',
                borderRadius: '10px',
                backgroundColor: '#c1c3c7',
                color: 'black',
                padding: 1,
                // width: 'max-content',
                hyphens: 'auto',
                maxWidth: '65%',
                wordBreak:'break-all',

              }}
            >
              zzzzzzzque necessitatibus quisquam esse.
            </Typography>
          </Box>
          <Typography variant='subtitle1' display='flex' sx={{ fontSize: 14, flexDirection: 'row' }}>
            5 часов назад
          </Typography>
        </Box>




        
 
      </Box>



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