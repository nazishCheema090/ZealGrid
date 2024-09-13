import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { sidebarItems, logo } from "../../constants.jsx";

const Sidebar = () => {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("overview");

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    if (pathnames.length === 2 && pathnames[1] === projectName) {
      setActiveItem("overview");
    }
    if (pathnames.length === 3 && pathnames[2] !== activeItem) {
      setActiveItem(pathnames[2]);
    }
  }, [location.pathname, projectName]);

  return (
    //use the icons from the updated design later also later use the toggles icon for toggles.
    <div className="bg-[#333333] text-white h-[120vh] w-[100px] sm:w-64">
      <div className="flex items-center justify-center pt-[35px] pb-[60px] ">
        <img
          src={logo}
          className="w-40 h-8 cursor-pointer hidden sm:block"
          alt="Zealgrid logo"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="text-gray-200 px-6 ">
        <span className="text-gray-300 hidden sm:block ">Dashboard</span>
      </div>
      <div className="px-4">
        <List className="flex flex-col justify-center">
          {sidebarItems.map((item) => (
            <ListItem key={item.text} disablePadding className="pb-1">
              <ListItemButton
                sx={{
                  background:
                    activeItem === item.text
                      ? "linear-gradient(90deg, #175CFF 0%, rgba(23, 92, 255, 0.2) 81.79%)"
                      : "inherit",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #175CFF 0%, rgba(23, 92, 255, 0.2) 81.79%)",
                  },
                  borderRadius: "10px",
                }}
                className="flex items-center"
                onClick={() => {
                  setActiveItem(item.text);
                  if (item.text == "overview") {
                    navigate(`/dashboard/${projectName}`);
                  } else {
                    navigate(`/dashboard/${projectName}/${item.text}`);
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "30px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className="text-gray-300 px-1 hidden sm:block"
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
