import { type SxProps } from "@mui/material";
import { getAvatarColor } from "~/utils/characters.jsx";

export const styles = {
  avatar: (color: string) => {
    return {
      "& > svg": {
        height: "24px",
        width: "24px",
        "& > path": {
          fill: getAvatarColor(color),
        },
      },
    };
  },
  messageContainer: (isLocal?: boolean) => {
    return {
      flexDirection: "row",
      gap: 4,
      mb: 3,
      pr: "20px",
      justifyContent: isLocal ? "flex-end" : "flex-start",
    };
  },
  message: (isLocal?: boolean) => {
    return {
      display: "flex",
      flexDirection: "column",
      alignItems: isLocal ? "flex-end" : "flex-start",
      maxWidth: "min(80%, 600px)",
    };
  },
  messageSingle: (color: string, isLocal?: boolean) => {
    const backgroundColor = getAvatarColor(color);
    return {
      padding: 1.5,
      marginBottom: 0.5,
      display: "inline-block",
      wordBreak: "break-word",
      color: "common.black",
      textAlign: "left",
      position: "relative",
      backgroundColor: backgroundColor,

      "&:first-of-type": {
        marginBottom: 0.1,
        borderRadius: 0,
        "&::before": {
          position: "absolute",
          content: "''",
          zIndex: 1,
          width: "27px",
          height: "27px",
          backgroundImage: isLocal
            ? `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath transform='scale(-1, 1) translate(-27, 0)' d='M27.835 23.196L27.835 18.557L27.835 13.917L27.835 9.278L27.835 4.639L27.835 0L23.196 -2.02777e-07L18.557 -4.05554e-07L13.918 -6.08331e-07L9.27802 -8.11152e-07L4.63902 -1.01393e-06L2.28882e-05 -1.21671e-06L2.26854e-05 4.639L4.63902 4.639L4.63902 9.278L9.27802 9.278L9.27802 13.917L13.918 13.917L13.918 18.557L18.557 18.557L18.557 23.196L23.196 23.196L23.196 27.835L27.835 27.835L27.835 23.196Z' fill='%23${backgroundColor?.replace(
                "#",
                "",
              )}'/%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M27.835 23.196L27.835 18.557L27.835 13.917L27.835 9.278L27.835 4.639L27.835 0L23.196 -2.02777e-07L18.557 -4.05554e-07L13.918 -6.08331e-07L9.27802 -8.11152e-07L4.63902 -1.01393e-06L2.28882e-05 -1.21671e-06L2.26854e-05 4.639L4.63902 4.639L4.63902 9.278L9.27802 9.278L9.27802 13.917L13.918 13.917L13.918 18.557L18.557 18.557L18.557 23.196L23.196 23.196L23.196 27.835L27.835 27.835L27.835 23.196Z' fill='%23${backgroundColor?.replace(
                "#",
                "",
              )}'/%3E%3C/svg%3E")`,
          left: isLocal ? "" : "-23px",
          right: isLocal ? "-23px" : "",
          top: "0px",
        },
      },
    } satisfies SxProps;
  },
  messagesContainer: {
    pl: 2,
    pr: 1,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "18px",
    },
    flexDirection: "column-reverse",
    flex: "1 1 450px",
  },
  username: {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  } satisfies SxProps,
  text: {
    lineHeight: "24px",
  },
};
