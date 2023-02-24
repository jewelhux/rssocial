import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { UserPost } from '../../../../redux/features/service/types';
import { useGetProfileQuery } from '../../../../redux/features/service/profileService';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { useDeletePostByIdMutation } from '../../../../redux/features/service/postsService';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../../utils/utils';

function ProfileComponentFeed({ post }: { post: UserPost }) {
  const { data: user } = useGetProfileQuery(post.user);
  const { data: self } = useGetProfileQuery();
  const [deletePost] = useDeletePostByIdMutation();
  const { i18n, t } = useTranslation();

  return (
    <Card sx={{ maxWidth: 600 }} variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: grey[500] }}
            aria-label="avatar"
            src={user?.avatar || DEFAULT_IMAGE}
            alt="User avatar"
          />
        }
        action={
          user &&
          self &&
          (user.isOwn || self.isAdmin) && (
            <IconButton aria-label="settings" onClick={() => deletePost(post.id)}>
              {!user.isOwn && self.isAdmin && (
                <Typography>{t('profileLng.removeAdmin')}</Typography>
              )}
              <ClearIcon />
            </IconButton>
          )
        }
        title={user && `${user?.name} ${user.lastname}`}
        subheader={formatDate(new Date(post.createdAt), i18n.language)}
      />
      {post?.image && <CardMedia component="img" image={post.image} alt="Image-post" />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProfileComponentFeed;
