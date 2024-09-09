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

const Sidebar = () => {
  const [active, setActive] = useState("Overview");
  const { projectName } = useParams();
  const navigate = useNavigate();

  //each item in the sidebar is a seperate nested route of the project-details as project-details/settings
  const menuItems = [
    {
      text: "Overview",
      icon: <DashboardIcon />,
      route: `/project-details/${projectName}`,
    },
    {
      text: "App | Website",
      icon: <AppsIcon />,
      route: `/project-details/${projectName}/app`,
    },
    {
      text: "Navigation",
      icon: <AppsIcon />,
      route: `/project-details/${projectName}/navigation`,
    },
    {
      text: "labels",
      icon: <AppsIcon />,
      route: `/project-details/${projectName}/labels`,
    },
    {
      text: "toggles",
      icon: <AppsIcon />,
      route: `/project-details/${projectName}/toggles`,
    },
    {
      text: "Project Setting",
      icon: <SettingsIcon />,
      route: `/project-details/${projectName}/settings`,
    },
    { text: "Logout", icon: <LogoutIcon />, route: "#" },
  ];

  return (
    <div className="bg-gray-800 text-white h-screen w-64">
      <div className="flex items-center justify-center py-6">
        <h1 className="text-2xl font-bold">ZealGrid</h1>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              className={`hover:bg-gray-700 ${
                active === item.text && "bg-blue-600"
              }`}
              onClick={() => {
                setActive(item.text);
                navigate(item.route);
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
