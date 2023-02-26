import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { GenericPost } from '../../../../redux/features/service/types';
import { DEFAULT_IMAGE } from '../../../../utils/const';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../../../utils/utils';
import { useGetProfileQuery } from '../../../../redux/features/service/profileService';
import ClearIcon from '@mui/icons-material/Clear';
import { useDeletePostByIdMutation } from '../../../../redux/features/service/postsService';
import { useLoginCheckQuery } from '../../../../redux/features/service/authService';
import { useSnackbar } from 'notistack';

function FeedComponentFeed({ post }: { post: GenericPost }) {
  const { data: isLoggedIn } = useLoginCheckQuery();
  const { i18n, t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { data: self } = useGetProfileQuery(undefined, { skip: !isLoggedIn });
  const [deletePost] = useDeletePostByIdMutation();
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: grey[500] }}
            aria-label="avatar"
            src={post.avatar ?? DEFAULT_IMAGE}
            alt={post.name}
          />
        }
        action={
          isLoggedIn &&
          (self?.id === post.user || self?.isAdmin) && (
            <IconButton
              aria-label="settings"
              onClick={() =>
                deletePost(post.id)
                  .unwrap()
                  .catch(() => enqueueSnackbar(t('snacks.deleteFailed'), { variant: 'error' }))
              }
            >
              {self?.id !== post.user && self?.isAdmin && (
                <Typography>{t('profileLng.removeAdmin')}</Typography>
              )}
              <ClearIcon />
            </IconButton>
          )
        }
        title={post?.name ?? `Name Name`}
        subheader={formatDate(new Date(post.createdAt), i18n.language)}
      />
      {post?.image && <CardMedia component="img" image={post.image} alt="Image-post" />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeedComponentFeed;
