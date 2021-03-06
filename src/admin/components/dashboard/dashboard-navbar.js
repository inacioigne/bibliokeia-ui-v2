import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Switch, 
  FormControlLabel
} from "@mui/material";
import { Menu, Search } from "@mui/icons-material";
import { Users as UsersIcon } from "src/admin/components/icons/users";
import { Bell as BellIcon } from "src/admin/components/icons/bell";
import { UserCircle as UserCircleIcon } from "src/admin/components/icons/user-circle";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "src/auth/authContext";
import { deepOrange, deepPurple } from '@mui/material/colors';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const { user, signOut } = useContext(AuthContext);

  async function handleSignOut(ctx) {
    await signOut(ctx);
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <Menu fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <Search fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          
          {/* <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip> */}
          <FormControlLabel 
          onClick={handleSignOut}
          sx={{ color: "#121828" }} control={<Switch defaultChecked />} label="Sair" />
          <Tooltip title={user?.sub ? user.sub : 'no user'}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>{user?.sub.substring(0,1).toUpperCase()}</Avatar>

          </Tooltip>
          
          {/* <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="/img/user.jfif"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar> */}
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
