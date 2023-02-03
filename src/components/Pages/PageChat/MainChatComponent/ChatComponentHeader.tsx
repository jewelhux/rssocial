import React, { ReactElement } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ChatComponentHeader(): ReactElement {
  return (
    <>
      <Box display='flex' justifyContent={'space-between'}>
        <IconButton aria-label="send" color="primary">
          <ChevronRightIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom> Мои диалоги </Typography>
      </Box>

    </>
  );
}

export default ChatComponentHeader;