import { PhotoCamera, Close, Send } from '@mui/icons-material';
import { FormControl, IconButton, Stack, styled, TextField } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSendMessageMutation } from '../../../../redux/features/service/chatService';
import { useSnackbar } from 'notistack';

const ImagePreview = styled('img')`
  border-radius: 5px;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

function ChatSendForm({ profile }: { profile: string }): ReactElement {
  const { t } = useTranslation();
  const [sendMessage] = useSendMessageMutation();
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (event.target.files[0].size < 5 * 1024 * 1024) setImage(event.target.files[0]);
      else enqueueSnackbar(t('snacks.largeFileSize'), { variant: 'warning' });
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
      setImage(null);
      setText('');
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
  }, [profile]);

  return (
    <FormControl fullWidth>
      <Stack direction="row" p={2} alignItems={'center'}>
        <TextField
          label={t('chat.placeholder')}
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
