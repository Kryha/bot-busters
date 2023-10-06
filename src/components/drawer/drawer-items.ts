import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { type SvgIconTypeMap } from "@mui/material";
import { type OverridableComponent } from "@mui/material/OverridableComponent";

interface ChatDrawerItems {
  title: string;
  lastMessage?: string;
  image: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  time: string;
}

export const drawerItems: ChatDrawerItems[] = [
  {
    title: "Anne",
    lastMessage: "what are u up to",
    image: AccountCircleIcon,
    time: "Yesterday",
  },
  {
    title: "Jon",
    lastMessage:
      "wow wow wow wow wow thats so cray Mary, cant believe it, when did you hear",
    image: AccountCircleIcon,
    time: "11.07",
  },
  {
    title: "Fran",
    lastMessage: "im mad",
    image: AccountCircleIcon,
    time: "Today",
  },
  {
    title: "Sarah",
    lastMessage: "mmmh",
    image: AccountCircleIcon,
    time: "11.11",
  },
  {
    title: "Elliot",
    lastMessage: "try me",
    image: AccountCircleIcon,
    time: "23.00",
  },
];
