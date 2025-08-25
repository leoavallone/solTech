// src/layout/AppLayout.tsx
import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Box,
  CssBaseline,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 64;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: collapsedWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? drawerWidth : collapsedWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const menuItems = [
  { label: "Dashboard", icon: <DashboardIcon />, to: "/" },
  { label: "Configurações", icon: <SettingsIcon />, to: "/settings" },
  { label: "Sair", icon: <ExitToAppIcon />, to: "/logout" },
];

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialOpen = React.useMemo(() => {
    const saved = localStorage.getItem("app:sidebarOpen");
    return saved ? JSON.parse(saved) : true;
  }, []);

  const [open, setOpen] = React.useState<boolean>(initialOpen);

  const toggleDrawer = () => {
    setOpen((prev) => {
      const next = !prev;
      localStorage.setItem("app:sidebarOpen", JSON.stringify(next));
      return next;
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Meu App
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <Divider />
        <List>
          {menuItems.map((item) => {
            const selected = location.pathname === item.to;
            const content = (
              <ListItemButton
                key={item.to}
                selected={selected}
                onClick={() => navigate(item.to)}
                sx={{
                  justifyContent: open ? "flex-start" : "center",
                  px: 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            );

            return open ? (
              <React.Fragment key={item.to}>{content}</React.Fragment>
            ) : (
              <Tooltip title={item.label} placement="right" key={item.to}>
                <span>{content}</span>
              </Tooltip>
            );
          })}
        </List>
        <Divider />
      </Drawer>

      <Main>
        <Toolbar />
        <Outlet />
      </Main>
    </Box>
  );
}
