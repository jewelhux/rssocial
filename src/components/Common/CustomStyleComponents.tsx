import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, Badge, Paper, MenuItem, Menu, Avatar} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
      position: "relative",
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: 'ripple 1.2s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""',
      },
  },
  '@keyframes ripple': {
      '0%': {
          transform: 'scale(.8)',
          opacity: 1,
      },
      '100%': {
          transform: 'scale(2.4)',
          opacity: 0,
      },
  },
}));

const SmallAvatar = styled(Avatar)`
  width: 20px;
  height:20px;
  margin-right:5px;
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const CustomGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: '15px'
}));

const CustomGridItem = styled(Paper)(({ theme }) => ({
  padding: '5px 10px',
  textAlign: 'center',
  alignContent: 'center',
  alignSelf: 'center',
  verticalAlign: 'center',
  height: '100%',
}));

const CustomCreatePost = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  flexGrow: '1',
}));

export { StyledBadge, SmallAvatar, Search, SearchIconWrapper, StyledInputBase, CustomGrid, CustomGridItem, CustomCreatePost }