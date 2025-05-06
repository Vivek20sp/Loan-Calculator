import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  ListItemIcon, 
  useMediaQuery, 
  useTheme as useMuiTheme
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, CreditCard, Info, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeMode } from '../../types';

const Header: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { title: 'Calculator', path: '/', icon: <Calculator size={20} /> },
    { title: 'Exchange Rates', path: '/rates', icon: <CreditCard size={20} /> },
    { title: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" component="div">
          LoanCalc
        </Typography>
        <IconButton edge="end" onClick={handleDrawerToggle} aria-label="close drawer">
          <X size={24} />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton 
              component={RouterLink} 
              to={item.path}
              selected={isActive(item.path)}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.primary',
                '&.Mui-selected': {
                  bgcolor: 'background.default',
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: isActive(item.path) ? 'primary.main' : 'text.primary',
                  minWidth: '40px'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={1}
        sx={{
          backdropFilter: 'blur(8px)',
          bgcolor: mode === ThemeMode.LIGHT ? 'rgba(255, 255, 255, 0.8)' : 'rgba(18, 18, 18, 0.8)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Calculator size={24} />
            LoanCalc
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="toggle theme"
                onClick={toggleTheme}
                edge="start"
                sx={{ mr: 1 }}
              >
                {mode === ThemeMode.LIGHT ? <Moon size={20} /> : <Sun size={20} />}
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <Menu size={24} />
              </IconButton>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.title}
                    component={RouterLink}
                    to={item.path}
                    color={isActive(item.path) ? 'primary' : 'inherit'}
                    sx={{ 
                      mx: 1,
                      borderRadius: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        transform: 'translateY(-2px)',
                      },
                    }}
                    startIcon={item.icon}
                  >
                    {item.title}
                  </Button>
                ))}
                <IconButton
                  color="inherit"
                  aria-label="toggle theme"
                  onClick={toggleTheme}
                  edge="start"
                  sx={{ ml: 1 }}
                >
                  {mode === ThemeMode.LIGHT ? <Moon size={20} /> : <Sun size={20} />}
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { 
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: mode === ThemeMode.LIGHT ? 'white' : 'background.default',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;