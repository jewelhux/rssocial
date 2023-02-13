import { TextField, Button, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { partText } from '../../../../utils/utils';
import { CustomCreatePost } from '../../../Common/CustomStyleComponents';
import CloseIcon from '@mui/icons-material/Close';
import { useAddPostMutation } from '../../../../redux/features/service/postsService';

function ProfileComponentInputFeed() {
  const [sendPost, { isLoading }] = useAddPostMutation();
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const formData = new FormData();

  const handleImageAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      formData.append('image', event.target.files[0]);
    }
    event.target.value = '';
  };

  const handleImageRemove = () => {
    formData.append('image', '');
    setImage(null);
  };

  const handleTextAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    event.target.value = '';
  };

  const handleSubmith = () => {
    formData.append('text', text);
    if (image) formData.append('image', image);
    sendPost(formData);

    handleImageRemove();
    setText('');
  };

  return (
    <CustomCreatePost sx={{ flexDirection: { xs: 'column' } }}>
      <TextField
        multiline
        rows={2}
        id="outlined-basic"
        label="Ваше сообщение..."
        variant="outlined"
        value={text}
        sx={{ flexGrow: '1', width: { xs: '240px', sm: '100%' } }}
        onChange={handleTextAdd}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Box>
          <input
            style={{ display: 'none', width: '80%' }}
            type="file"
            name="file"
            id="file"
            accept=".jpg, .jpeg, .png"
            onInput={handleImageAdd}
          />
          <Button sx={{ width: '100%', padding: 0 }}>
            <label style={{ cursor: 'pointer', width: '100%' }} htmlFor="file">
              Выберите фото
            </label>
          </Button>
          <Box sx={{ display: 'flex' }}>
            <Typography variant="subtitle2">{image?.name && partText(image?.name)}</Typography>
            {image?.name && (
              <CloseIcon sx={{ cursor: 'pointer' }} onClick={handleImageRemove}></CloseIcon>
            )}
          </Box>
        </Box>
        <Button
          variant="outlined"
          onClick={handleSubmith}
          disabled={isLoading || (!text && !image)}
        >
          Отправить
        </Button>
      </Box>
    </CustomCreatePost>
  );
}

export default ProfileComponentInputFeed;
