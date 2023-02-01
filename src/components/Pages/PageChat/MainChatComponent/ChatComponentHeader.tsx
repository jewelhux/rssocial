import React, { ReactElement } from 'react';
import { Typography } from '@mui/material';

function ChatComponentHeader():ReactElement {
  return (
    <>
      <Typography variant="h4" gutterBottom> Мои диалоги </Typography>
    </>
  );
}

export default ChatComponentHeader;