import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useParams, useNavigate } from "react-router-dom";

const menuItems = [
  {
    text: "overview",
    icon: <DashboardIcon />,
  },
  {
    text: "app",
    icon: <AppsIcon />,
  },
  {
    text: "navigation",
    icon: <AppsIcon />,
  },
  {
    text: "labels",
    icon: <AppsIcon />,
  },
  {
    text: "toggles",
    icon: <AppsIcon />,
  },
  {
    text: "settings",
    icon: <SettingsIcon />,
  },
  { text: "logout", icon: <LogoutIcon />, route: "#" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const [activeItem, setActiveItem] = useState("Overview");

  return (
    <div className="bg-gray-800 text-white h-screen w-64">
      <div className="flex items-center justify-center py-6">
        <h1
          className="text-2xl font-bold cursor-pointer "
          onClick={() => navigate("/")}
        >
          ZealGrid
        </h1>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              className={`hover:bg-gray-700 ${
                activeItem === item.text && "bg-blue-600"
              }`}
              onClick={() => {
                setActiveItem(item.text);
                if (item.text == "overview") {
                  navigate(`/project-details/${projectName}`);
                } else if (item.text == "logout") {
                  navigate("#");
                } else {
                  navigate(`/project-details/${projectName}/${item.text}`);
                }
              }}
            >
              <ListItemIcon className="text-white">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
