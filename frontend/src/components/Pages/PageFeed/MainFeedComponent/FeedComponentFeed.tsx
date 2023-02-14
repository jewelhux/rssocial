import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GenericPost } from '../../../../redux/features/service/types';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { CURRENT_DATE, CURRENT_TIME } from '../../../../utils/utils';

function FeedComponentFeed({ post }: { post: GenericPost }) {
  return (
    <Card sx={{ maxWidth: 600 }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[500] }} aria-label="recipe" src={DEFAULT_IMAGE} alt="jik" />
        }
        title={post?.name ?? `Name Name`}
        subheader={`${CURRENT_DATE} в ${CURRENT_TIME}`}
      />
      <CardMedia component="img" image={post?.image ?? DEFAULT_IMAGE} alt="Image-post" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" sx={{ marginLeft: 'auto' }}>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default FeedComponentFeed;
