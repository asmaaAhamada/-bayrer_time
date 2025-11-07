
import { FaMosque } from "react-icons/fa6";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = [
      { label: 'الإعدادات', path: '/Setting' ,icone:<SettingsIcon/>},
  ,  {label: 'التنبيهات', path: '/notify',icone:<NotificationsActiveIcon/>},

  { label: 'القبلة', path: '/Kiss' ,icone:<AutoModeIcon/>},
  {label: 'مواقيتي', path: '/Home',icone:<AlarmOnIcon/>},
  { label: 'الاذكار', path: '/Remembrances' ,icone:<AutoStoriesIcon/>},
    { label: 'المسجد الأقرب', path: '/mousq',icone:<AccountBalanceIcon/> },
    { label: ' حسابي', path: '/profile',icone:<AccountCircleIcon/> },


];
function DrawerAppBar(props) {
  const { window ,toggleMode, mode } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
const theme = useTheme()
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 ,color: theme.palette.text.primary}}>
        صلاتي
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.label} />
              {item.icone}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    <AppBar component="nav" sx={{ bgcolor: theme.palette.primary.main }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
           
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          <FaMosque size={24} />

          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
                <Button
      key={item.label}  // <--- استخدم label أو path
      component={Link} // لازم نضيف الرابط أيضاً
      to={item.path}   // <--- الرابط
      sx={{ fontSize: 18, fontWeight: 400, color: theme.palette.primary.contrastText }}
    >
      {item.label}
{item.icone}
    </Button>
            ))}
          </Box>
          <Typography variant="h6" sx={{ my: 2 ,fontSize:'32px',ml:6,color: theme.palette.text.main  }}>
        صلاتي
      </Typography>
       <IconButton color="inherit" onClick={toggleMode} sx={{ ml: 2 }}>
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
            
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
       
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;