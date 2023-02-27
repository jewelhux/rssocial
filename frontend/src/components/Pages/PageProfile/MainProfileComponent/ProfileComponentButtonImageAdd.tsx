import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ProfileComponentButtonImageAdd = () => {
  const [file, setFile] = useState<File | null>(null);
  const { t } = useTranslation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
    }
  };

  return (
    <Box>
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
          {t('profileLng.btnAddPhoto')}
        </label>
      </Button>
      <Typography variant="subtitle2">{file?.name}</Typography>
    </Box>
  );
};

export default ProfileComponentButtonImageAdd;
