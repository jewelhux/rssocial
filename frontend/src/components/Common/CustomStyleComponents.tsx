import { styled, alpha } from '@mui/material/styles';
import { Box, Badge, Paper, Avatar } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { StyledBadgeProps } from '../../utils/interfaces';

const StyledBadge = styled(Badge)<StyledBadgeProps>(({ theme, isonlineuser }) => ({
  position: 'relative',
  '& .MuiBadge-badge': {
    position: 'relative',
    backgroundColor: isonlineuser === 'true' ? '#44b700' : '#ccc',
    color: isonlineuser === 'true' ? '#44b700' : '#ccc',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: isonlineuser === 'true' ? 'ripple 1.2s infinite ease-in-out' : '',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));

const SmallAvatar = styled(Avatar)`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ImageMessage = styled('img')(() => ({
  maxWidth: '75%',
  height: '25vh',
  objectFit: 'cover',
  borderRadius: '10%',
  marginTop: '2px'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

const CustomGrid = styled(Box)(() => ({
  display: 'grid',
  gap: '15px'
}));

const CustomGridItem = styled(Paper)(() => ({
  padding: '5px 10px',
  textAlign: 'center',
  alignContent: 'center',
  alignSelf: 'center',
  verticalAlign: 'center',
  height: '100%'
}));

const CustomCreatePost = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  flexGrow: '1'
}));

const CustomButtinListFriend = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center'
}));

export {
  StyledBadge,
  SmallAvatar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  CustomGrid,
  CustomGridItem,
  CustomCreatePost,
  ImageMessage,
  CustomButtinListFriend
};
