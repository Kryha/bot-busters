import { type SxProps } from "@mui/material";

export const styles = {
  avatar: {
    height: "60px",
    width: "60px",
  },
  messageContainer: (isLocal?: boolean) => {
    return {
      flexDirection: "row",
      gap: 3,
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
      maxWidth: "600px",
    };
  },
  messageSingle: (backgroundColor: string, isLocal?: boolean) => {
    return {
      padding: 1.5,
      borderRadius: 1,
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
          content: '""',
          position: "absolute",
          inset: isLocal ? "0px 0px 0px 100%" : "0 0 0 0",
          transform: isLocal ? "" : "translateX(-19px)",
          backgroundColor: backgroundColor,
          width: "20px",
          height: "21px",
          clipPath: isLocal
            ? "polygon(0 0, 0 100%, 100% 0)"
            : "polygon(0 0, 100% 0, 100% 100%)",
        },
      },
    };
  },
  messagesContainer: {
    pl: 2,
    pr: 1,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      "-webkit-appearance": "scrollbartrack-vertical",
      width: "18px",
    },
    flexDirection: "column-reverse",
    flex: "1 1 500px",
  },
  username: {
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  } satisfies SxProps,
};
