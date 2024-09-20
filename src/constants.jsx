import overview from "./assets/overview.png";
import app from "./assets/app.png";
import toggles from "./assets/toggles.png";
import labels from "./assets/labels.png";
import navigation from "./assets/navigation.png";
import settings from "./assets/settings.png";
import logo from "./assets/logo.png";
import deleteIcon from "./assets/deleteIcon.png";
import updateIcon from "./assets/updateIcon.png";
export const sidebarItems = [
  {
    text: "overview",
    icon: <img src={overview} alt="overview icon" className="w-6 h-6 " />,
  },
  {
    text: "app",
    icon: <img src={app} alt="app icon" className="w-6 h-8 " />,
  },
  {
    text: "navigation",
    icon: <img src={navigation} alt="navigation icon" className="w-6 h-6 " />,
  },
  {
    text: "labels",
    icon: <img src={labels} alt="labels icon" className="w-6 h-6 " />,
  },
  {
    text: "toggles",
    icon: <img src={settings} alt="overview icon" className="w-6 h-6 " />,
  },
  {
    text: "settings",
    icon: <img src={settings} alt="overview icon" className="w-6 h-6" />,
  },
];

export const cardItems = [
  {
    icon: navigation,
    title: "Navigation",
    description: "Just drag and drop and navigate your web pages",
  },
  {
    icon: labels,
    title: "Labels",
    description: "Just drag and drop and navigate your web pages",
  },
  {
    icon: settings,
    title: "Toggles",
    description: "Just drag and drop and navigate your web pages",
  },
];

export const labelsListItems = [
  {
    label: {
      name: "Sign-in",
      labelItems: [
        {
          itemName: "Header",
          itemValue: "sign-in to continue",
        },
        {
          itemName: "Title",
          itemValue: "sign-in",
        },
        {
          itemName: "Footer",
          itemValue: "sign-in to continue",
        },
      ],
    },
  },
  {
    label: {
      name: "Sign-up",
      labelItems: [
        {
          itemName: "Header",
          itemValue: "sign-up to continue",
        },
        {
          itemName: "Title",
          itemValue: "sign-up",
        },
        {
          itemName: "Footer",
          itemValue: "sign-up to continue",
        },
      ],
    },
  },
  {
    label: {
      name: "Home",
      labelItems: [
        {
          itemName: "Header",
          itemValue: "Welcome to the netflix",
        },
        {
          itemName: "Title",
          itemValue: "Netflix",
        },
        {
          itemName: "Footer",
          itemValue: "Welcome to netflix",
        },
      ],
    },
  },
];

export const navigationListItems = [
  { name: "Sign-in", number: "01" },
  { name: "Sign-up", number: "02" },
  { name: "Home", number: "03" },
];

export {
  overview,
  app,
  toggles,
  labels,
  navigation,
  settings,
  logo,
  deleteIcon,
  updateIcon,
};
