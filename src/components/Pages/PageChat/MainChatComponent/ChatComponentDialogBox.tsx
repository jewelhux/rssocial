import React, { ReactElement } from 'react';
import { FormControl, Grid, IconButton, List, ListItem, ListItemText, TextField, Box, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { SmallAvatar } from '../../../Common/CustomStyleComponents';
import Message, { DataMessage } from './Message';


function ChatComponentDialogBox(): ReactElement {

  const dataMessage: DataMessage[] = [
    {
      currentUser: true,
      message: 'Это первое сообщение Евгения',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 0, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Это первый ответ Ильи',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 5, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'Давай работай, хватит сидеть чаты читать',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 8, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Да я как папо Карло работаю',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 50, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'Ну тогда Ок. Значт больше отдыхай',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      timeOfCreateMassage: (new Date(2023, 1, 2, 22, 8, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Ага это правлиьно.',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      timeOfCreateMassage: (new Date(2023, 1, 3, 10, 35, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'А как у тебя твоя девка. Ты её добавил?',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      timeOfCreateMassage: (new Date(2023, 1, 2, 22, 18, 0, 0)).getTime()
    }
  ]

  // console.log(((new Date().getMilliseconds() - dataMessage[0].timeOfCreateMassage) / 60000))
  // console.log(Math.ceil((Date.now() - new Date(2023, 1, 2, 21, 0, 0, 0).getTime()) / 60000))
  // console.log(new Date(2023, 1, 2, 21, 0, 0, 0).getTime())
  // console.log(new Date().getTime())
  // console.log(new Date().toLocaleDateString())
  // console.log(dataMessage[0])

  const messages = dataMessage.map((el) => {
    return <Message key={el.timeOfCreateMassage.toString()} dataMessage={el} />
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", height: '60vh', width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: "column", flexGrow: 1, height: 300, overflow: "auto", width: '100%' }}>
      {messages}
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