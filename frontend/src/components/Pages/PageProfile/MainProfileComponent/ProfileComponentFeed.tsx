import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import { UserPost } from '../../../../redux/features/service/types';
import { useGetOwnProfileQuery } from '../../../../redux/features/service/profileService';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { useDeletePostByIdMutation } from '../../../../redux/features/service/postsService';
import { CURRENT_DATE, CURRENT_TIME } from '../../../../utils/utils';

function ProfileComponentFeed({ post }: { post: UserPost }) {
  const { data: user } = useGetOwnProfileQuery();
  const [deletePost] = useDeletePostByIdMutation();

  return (
    <Card sx={{ maxWidth: 600 }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={user?.avatar ?? DEFAULT_IMAGE}
            alt="jik"
          />
        }
        action={
          <IconButton aria-label="settings" onClick={() => deletePost(post.id)}>
            <ClearIcon />
          </IconButton>
        }
        title={user && `${user?.name} ${user.lastname}`}
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

export default ProfileComponentFeed;
