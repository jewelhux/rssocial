import React, { ReactElement, useContext } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Context } from '../../../Context/context'

function ChatComponentHeader(): ReactElement {


  const {isOpenUsers, setisOpenUsers} = useContext(Context)


  return (
    <>
      <Box display='flex' justifyContent={'space-between'} >
        <IconButton aria-label="send" color="primary" onClick={()=> {setisOpenUsers(!isOpenUsers)}}>
          <ChevronRightIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom> Мои диалоги </Typography>
      </Box>

    </>
  );
}

export default ChatComponentHeader;