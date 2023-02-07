import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { FormControl, Grid, IconButton, List, ListItem, ListItemText, TextField, Box, Typography, Dialog, DialogTitle, Button, DialogActions, DialogContent, Divider } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { DataMessage } from '../../../../utils/Type';
// import { display } from '@mui/system';
import ChatComponentUsersChating from './ChatComponentUsersChating';
import Message from './Message';
// import { NorthWest } from '@mui/icons-material';


function ChatComponentDialogBox(): ReactElement {

  const chatContainerRef = useRef<HTMLElement>(null);

  const [scroll, setscroll] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [newMessage, setNewMessage] = useState<string>('');


  const [dataMessage, setDataMessage] = useState<DataMessage[]>([
    {
      currentUser: true,
      message: 'Это первое сообщение Евгения',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 0, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Это первый ответ Ильи',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 5, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'Давай работай, хватит сидеть чаты читать',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 8, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Да я как папо Карло работаю',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 21, 50, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'Ну тогда Ок. Значт больше отдыхай',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 2, 22, 8, 0, 0)).getTime()
    },
    {
      currentUser: false,
      message: 'Ага это правлиьно.',
      imgSrc: 'https://avatars.githubusercontent.com/u/38877564?v=4',
      imgMassage: '',
      timeOfCreateMassage: (new Date(2023, 1, 3, 10, 35, 0, 0)).getTime()
    },
    {
      currentUser: true,
      message: 'А как у тебя твоя девка. Ты её добавил?',
      imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
      imgMassage: 'https://cdn.forbes.ru/forbes-static/750x422/new/2021/12/GettyImages-1204843675-61c4216fd8046.jpg',
      timeOfCreateMassage: (new Date(2023, 1, 2, 22, 18, 0, 0)).getTime()
    }
  ]);

  useEffect(() => {
    console.log('chatContainerRef.current===', chatContainerRef.current)
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [scroll]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
    console.log('handleFileChange=', file)
  };

  const handleUpload = () => {
    // Perform the image upload logic here
    console.log('File:', file);
    setOpen(false);
  };

  const handleNewUserMessage = () => {
    console.log('file50', file)
    if (!newMessage.trim() && !file) {
      console.log('СТРОКА ПУСТАЯ И КАРТИНКА ПУСТАЯ')
      setNewMessage('')
      setFile(null)
      return
    }
    if (newMessage.trim() || file) {
      console.log('СТРОКА', newMessage)
      console.log('file100', file)
      setDataMessage(prev => (
        [...prev,
        {
          currentUser: true,
          message: newMessage || 'Лови картинку',
          imgSrc: 'https://avatars.githubusercontent.com/u/107023048?v=4',
          imgMassage: file?.name ? 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1472042719_15.jpg' : '',
          // imgMassage: 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1472042719_15.jpg',
          timeOfCreateMassage: Date.now(),
        }
        ]
      ))
      setscroll(!scroll)
      setNewMessage('')
      setFile(null)
    }
  };

  // Изменение текста сообщения
  const handleNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const trim = event.target.value.trim()
    // if (trim) {
      setNewMessage(event.target.value)
    // } else {
      // setNewMessage(trim)
    // }

  };

  const handleKeyPressNewMessage = (event: React.KeyboardEvent) => {
    // event.preventDefault()
    if (event.key === 'Enter') {
      console.log('НАЖАЛИ ЕНТЕР')
      handleNewUserMessage()
    }
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: "column", height: '75vh', width: '100%' }}>

      <Box sx={{ display: 'flex', width: '100%', flexGrow: 1, minHeight: '50%' }}>

        <ChatComponentUsersChating />

        <Box ref={chatContainerRef} sx={{ flexGrow: 1, height: '100%', overflow: 'auto' }}>
          <Divider />
          {dataMessage.map((el) => {
            return <Message key={`${el.timeOfCreateMassage.toString()} + ${Date.now().toString()})`} dataMessage={el} />
          })}
          {/* <Box sx={{ width: '100%', minHeight: '1px' }} > */}
            
          <Divider />
          {/* </Box> */}
        </Box>
      </Box>

      <Grid container alignItems="center" sx={{ pl: 1 }}>
        <Grid sm={10} xs={8} item>
          <FormControl fullWidth >
            {/* Инпут заполнения сообщения */}
            <TextField
              label="Ваш текст..."
              variant="outlined"
              value={newMessage}
              onChange={handleNewMessage}
              onKeyPress={handleKeyPressNewMessage}
            />
          </FormControl>
        </Grid>
        <Grid sm={1} xs={2} item>
          <IconButton aria-label="send" color="primary" onClick={handleClickOpen}>
            <InsertPhotoOutlinedIcon />
          </IconButton>

        </Grid>
        <Grid sm={1} xs={2} item>
          {/* Основная кнопка отправки сообщения */}
          <IconButton aria-label="send" color="primary" onClick={handleNewUserMessage}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} sx={{ maxWidth: '96%', margin: '0 auto', padding: 1 }} >
        <DialogTitle>Загрузить изображение</DialogTitle>
        <DialogContent>
          {file && (
            <img src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '90%' }} />
          )}
          <div>
            <input
              style={{ display: 'none', width: '80%' }}
              type="file"
              name='file'
              id='file'
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
            <Button sx={{ width: '100%', padding: 0 }}>
              <label style={{ cursor: 'pointer', width: '100%' }} htmlFor='file'>Выберите файл</label>
            </Button>
            <Divider />
            <Typography variant='subtitle2'>{file?.name}</Typography>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleUpload}>Загрузить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ChatComponentDialogBox;
