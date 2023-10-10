import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { type SvgIconTypeMap } from "@mui/material";
import { type OverridableComponent } from "@mui/material/OverridableComponent";

interface ChatDrawerItems {
  username: string;
  lastMessage?: string;
  image: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  time: string;
}

export const drawerItems: ChatDrawerItems[] = [
  {
    username: "Anne",
    lastMessage: "what are u up to",
    image: AccountCircleIcon,
    time: "Yesterday",
  },
  {
    username: "Jon",
    lastMessage:
      "wow wow wow wow wow thats so cray Mary, cant believe it, when did you hear",
    image: AccountCircleIcon,
    time: "11.07",
  },
  {
    username: "Fran",
    lastMessage: "im mad",
    image: AccountCircleIcon,
    time: "Today",
  },
  {
    username: "Sarah",
    lastMessage: "mmmh",
    image: AccountCircleIcon,
    time: "11.11",
  },
  {
    username: "Elliot",
    lastMessage: "try me",
    image: AccountCircleIcon,
    time: "23.00",
  },
];
