import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';


function ProfileComponentFeed() {
  return (
    <Card sx={{ maxWidth: 600 }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="https://avatars.githubusercontent.com/u/38877564?v=4" alt='jik' />
        }
        action={
          <IconButton aria-label="settings">
            <ClearIcon />
          </IconButton>
        }
        title="User Name"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="https://mir-znamenitostej.ru/wp-content/uploads/2019/08/%D0%9C%D1%8D%D0%B9%D0%B1%D0%B8-%D0%91%D1%8D%D0%B9%D0%B1%D0%B8-%D0%B1%D0%B8%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%8F-%D0%BB%D0%B8%D1%87%D0%BD%D0%B0%D1%8F-%D0%B6%D0%B8%D0%B7%D0%BD%D1%8C-%D0%BC%D1%83%D0%B6.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like. This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" sx={{marginLeft: 'auto'}}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProfileComponentFeed;
