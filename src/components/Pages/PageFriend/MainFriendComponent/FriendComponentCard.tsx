import * as React from 'react';
import { Container, Typography, Button, CardMedia, CardContent, CardActions, Card } from '@mui/material';
import { Box } from '@mui/system';
import { CustomButtinListFriend } from '../../../Common/CustomStyleComponents';


function FriendComponentCard() {
  return (
    <Card variant="outlined" sx={{ display: 'flex', width: '100%', gap: '10px' }}>
        <Box sx={{ maxWidth: '150px', flexGrow: '1' }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="100"
            image="https://www.theplace.ru/cache/archive/maybe_baby/img/maybe-baby7-gthumb-gwdata1600-gfitdatamax.jpg"
            sx={{objectPosition:'top'}}
          />
        </Box>
        <Box sx={{ display: 'flex', flexGrow: '1', mt: 1 }}>
          <Typography gutterBottom sx={{overflow:'hidden', maxWidth: '120px'}}>
            Мейби Бейби
          </Typography>
        </Box>
        <CustomButtinListFriend>
          <Button size="small">Профиль</Button>
          <Button size="small">Написать</Button>
          <Button size="small">Удалить</Button>
        </CustomButtinListFriend>
      </Card>
  );
}

export default FriendComponentCard;