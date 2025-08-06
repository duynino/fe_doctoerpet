import { DashboardOutlined, ExitToAppOutlined } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import logo from "../../assets/LogoDr.Pet.jpg"; // Adjust the path as necessary

const LeftMenuAdmin = ({ role }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const handleHomePage = () => {
    navigate(`/`);
  };

  const menuItems = {
    ADMIN: [
      {
        text: "Manager Product",
        icon: <DashboardOutlined />,
        onClick: () => navigate("/admin/manage-product"),
      },
      // {
      //   text: "Manager Account",
      //   icon: <GroupIcon />,
      //   onClick: () => navigate("/admin/manage-manager"),
      // },
      {
        text: "Manager Supplier",
        icon: <DashboardOutlined />,
        onClick: () => navigate("/admin/manage-supplier"),
      },
      {
        text: "Manager Category",
        icon: <DashboardOutlined />,
        onClick: () => navigate("/admin/manage-category"),
      },
    ],  
  };
  
  return (
    <Drawer
      variant="permanent"
      anchor="left" 
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#FFFAFA",
        },
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          width: "270px",
        }}
      >
        <div class="menu">
          <Stack alignItems={"center"} spacing={2}>
            <Avatar
              alt={role}
              src={logo}
              sx={{ width: 80, height: 80 }}
              onClick={handleHomePage}
              style={{ cursor: "pointer" }}
            />
            <Typography variant="h6">
              Doctor Pet
            </Typography>
          </Stack>
        </div>

        {(menuItems[role])?.map((item) => (
          <div className="itemList">
            <ListItem button onClick={item.onClick}>
              <ListItemIcon className="itemIcon">{item.icon}</ListItemIcon>
              <ListItemText>
                <Typography className="textItem" variant="subtitle1">
                  {item.text}
                </Typography>
              </ListItemText>
            </ListItem>
          </div>
        ))}
      </List>
      <div className="Logout">
        <Button onClick={handleLogoutClick}>
          <ExitToAppOutlined className="itemIcon" />
          <Typography className="textLogout">Logout</Typography>
        </Button>
      </div>
    </Drawer>
  );
};

export default LeftMenuAdmin;