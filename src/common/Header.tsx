import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar'
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper'
import LoopIcon from '@mui/icons-material/Loop';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/actions/actionTypes';


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
      width: '40ch',
    },
  },
}));

export default function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [NotificationAnchor, setNotificationAnchor] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationMenuOpen = Boolean(NotificationAnchor);
  const [show, setShow] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [searched, setSearched] = React.useState("");
  const userDetails = useSelector((state: any) => state?.user);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotification = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e: any) => {
    let action = e.target.title;
    if (action === "New Post") {
      navigate('/post')
    }

    if (action === "Profile") {
      navigate('/profile')
    }

    if (action === "Logout") {
      dispatch({ type: actions.SAVE_USER, payload: {} });
      localStorage.clear();
      navigate('/');
    }

    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem title="New Post" onClick={handleMenuClose}>New Post</MenuItem>
      <MenuItem title="Profile" onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem title="My account" onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem title="Logout" onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {/* <AccountCircle /> */}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const notificationId = 'notification-of-current-user';
  const renderNotification = (
    <Menu
      anchorEl={NotificationAnchor}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={notificationId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationMenuOpen}
      onClose={() => setNotificationAnchor(null)}
    >
      {
        userDetails?.notification?.length > 0 && userDetails?.notification.map((item: any, i: any) => {
          if (item.type === "RequestedToFollow") {
            return <MenuItem
              title={`${item.type}${Date.now()}`}
              key={`${item.type}${i}`}
              onClick={() => { setNotificationAnchor(null); navigate(`/${item.requester.username}`, { state: item.requester }) }}
            >{`${item.requester.username} wants to follow you`}</MenuItem>
          }
          return null;
        })
      }
    </Menu>
  );

  const searchuser = (e: any) => {
    try {
      setSearched(e.target.value);
      if (e.target.value.length > 0) {
        fetch(`http://localhost:4100/searchUser/?name=${e.target.value}`)
          .then((reponse) => {
            reponse.json().then((result) => {
              setResult(result);
            })
          })
      }
    }
    catch (err) { console.log(err) }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchuser}
              value={searched}
              onFocus={() => { setShow(true) }}
            // onBlur={() => { setShow(false) }}
            />
          </Search>
          {
            show && <Paper sx={{ height: '300px', width: '500px', position: 'absolute', top: '55px', left: '100px', zIndex: "1" }}>
              {
                result.length > 0 ?
                  <>
                    {result.map((item: any, i) => {
                      return <div key={`${item._id}`}>
                        <Link
                          to={`/${item.username}`}
                          onClick={() => { setSearched(""); setShow(false) }}
                          state={item}
                        >{item.username}</Link>
                      </div>
                    })}
                  </> :
                  <LoopIcon className="loop" sx={{ position: 'absolute', left: '50%', top: "50%", trransform: "translate(-50%, -50%)" }} />
              }
            </Paper>

          }
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography>{userDetails?.username}</Typography>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              aria-controls={notificationId}
              aria-haspopup="true"
              onClick={handleNotification}
              color="inherit"
            >
              <Badge badgeContent={userDetails?.notification?.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar alt={userDetails?.username?.toUpperCase()} src={userDetails?.profileimg} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotification}
    </Box>
  );
}
