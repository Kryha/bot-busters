import { type SxProps } from "@mui/material";

export const styles = {
  avatar: {
    backgroundColor: "#80CBC4",
    borderRadius: "4px",
    "> img": {
      height: "32px",
      width: "23px",
      objectFit: "contain",
    },
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
      maxWidth: "652px",
    };
  },
  messageSingle: (isLocal?: boolean) => {
    return {
      padding: 1.5,
      borderRadius: 1,
      marginBottom: 0.5,
      display: "inline-block",
      wordBreak: "break-word",
      color: "common.black",
      textAlign: "left",
      position: "relative",
      backgroundColor: isLocal ? "#E3F2FD" : "#E0F2F1",
      "&:first-of-type": {
        marginBottom: 0.1,
        borderTopRightRadius: isLocal ? 0 : "4px",
        borderTopLeftRadius: isLocal ? "4px" : 0,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: isLocal ? "0px 0px 0px 100%" : "0 0 0 0",
          transform: isLocal ? "" : "translateX(-20px)",
          backgroundColor: isLocal ? "#E3F2FD" : "#E0F2F1",
          width: "20px",
          height: "20px",
          clipPath: isLocal
            ? "polygon(0 0, 0 100%, 100% 0)"
            : "polygon(0 0, 100% 0, 100% 100%)",
        },
      },
    };
  },
  messagesContainer: {
    pl: 3,
    pr: 2,
    overflowY: "scroll",
    flexDirection: "column-reverse",
    flexGrow: 1,
  },
  username: {
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0.4px",
    textAlign: "center",
  } satisfies SxProps,
};
