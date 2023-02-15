import { ReactElement, useEffect, useRef, useState } from 'react';
import {
  FormControl,
  Grid,
  IconButton,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ChatComponentUsersChating from './ChatComponentUsersChating';
import ChatMessage from './Message';
import {
  useGetMessagesQuery,
  useSendMessageMutation
} from '../../../../redux/features/service/chatService';
import { useSearchParams } from 'react-router-dom';

function ChatComponentDialogBox(): ReactElement {
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState<number>(Number(searchParams.get('newmessage') ?? -1));

  const chatContainerRef = useRef<HTMLElement>(null);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [newMessage, setNewMessage] = useState<string>('');

  const [sendMessage] = useSendMessageMutation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Perform the image upload logic here
    setOpen(false);
  };

  const handleNewUserMessage = () => {
    const formData = new FormData();
    if (file) formData.append('image', file);
    formData.append('text', newMessage);
    formData.append('profile', profile.toString());
    sendMessage(formData);
  };

  // Изменение текста сообщения
  const handleNewMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleKeyPressNewMessage = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleNewUserMessage();
    }
  };

  const { data } = useGetMessagesQuery(profile, { skip: profile === -1 });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [data]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '75vh', width: '100%' }}>
      <Box sx={{ display: 'flex', width: '100%', flexGrow: 1, minHeight: '50%' }}>
        <ChatComponentUsersChating profile={profile} setProfile={setProfile} />

        <Box ref={chatContainerRef} sx={{ flexGrow: 1, height: '100%', overflow: 'auto' }}>
          <Divider />
          {data?.messages.map((message) => (
            <ChatMessage key={message.date} message={message} own={message.userId !== profile} />
          ))}
          <Divider />
        </Box>
      </Box>

      <Grid container alignItems="center" sx={{ pl: 1 }}>
        <Grid sm={10} xs={8} item>
          <FormControl fullWidth>
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
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ maxWidth: '96%', margin: '0 auto', padding: 1 }}
      >
        <DialogTitle>Загрузить изображение</DialogTitle>
        <DialogContent>
          {file && (
            <img src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '90%' }} />
          )}
          <div>
            <input
              style={{ display: 'none', width: '80%' }}
              type="file"
              name="file"
              id="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
            <Button sx={{ width: '100%', padding: 0 }}>
              <label style={{ cursor: 'pointer', width: '100%' }} htmlFor="file">
                Выберите файл
              </label>
            </Button>
            <Divider />
            <Typography variant="subtitle2">{file?.name}</Typography>
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
