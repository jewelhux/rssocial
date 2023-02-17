import { PhotoCamera, Close, Send } from '@mui/icons-material';
import { FormControl, IconButton, Stack, styled, TextField } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useSendMessageMutation } from '../../../../redux/features/service/chatService';

const ImagePreview = styled('img')`
  border-radius: 5px;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

function ChatSendForm({ profile }: { profile: number }): ReactElement {
  const [sendMessage, { isSuccess }] = useSendMessageMutation();
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>('');

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      event.target.value = '';
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) setText(event.target.value);
  };

  const handleSend = () => {
    if (text || image) {
      const formData = new FormData();
      if (image) formData.append('image', image);
      formData.append('text', text);
      formData.append('profile', profile.toString());
      sendMessage(formData);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (event.ctrlKey || event.metaKey) {
      } else {
        event.preventDefault();
        handleSend();
      }
    }
  };

  useEffect(() => {
    setImage(null);
    setText('');
  }, [profile, isSuccess]);

  return (
    <FormControl fullWidth>
      <Stack direction="row" p={2} alignItems={'center'}>
        <TextField
          label="Ваш текст..."
          variant="outlined"
          fullWidth
          multiline
          maxRows={3}
          onChange={handleTextChange}
          onKeyDownCapture={handleKeyPress}
          value={text}
        />
        {image ? (
          <IconButton style={{ position: 'relative' }} onClick={() => setImage(null)}>
            <ImagePreview src={URL.createObjectURL(image)} alt="image"></ImagePreview>
            <Close sx={{ position: 'absolute', top: -5, right: -5 }} fontSize={'small'} />
          </IconButton>
        ) : (
          <IconButton
            sx={{ width: 56, height: 56 }}
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" onChange={handleImageChange} type="file" />
            <PhotoCamera fontSize="large" />
          </IconButton>
        )}
        <IconButton
          aria-label="send"
          size="large"
          color="primary"
          disabled={!(image || text)}
          onClick={handleSend}
        >
          <Send fontSize="large" />
        </IconButton>
      </Stack>
    </FormControl>
  );
}

export default ChatSendForm;
