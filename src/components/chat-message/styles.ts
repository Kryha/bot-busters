import { type SxProps } from "@mui/material";

export const styles = {
  avatar: {
    width: "2rem",
    height: "2rem",
  },
  leftRow: {
    textAlign: "left",
  },
  rightRow: {
    textAlign: "right",
  },
  msg: {
    padding: "0.25rem 0.5rem",
    borderRadius: 4,
    marginBottom: 0.5,
    display: "inline-block",
    wordBreak: "break-word",
  },
  left: {
    borderTopRightRadius: "0.625rem",
    borderBottomRightRadius: "0.625rem",
    backgroundColor: "#f0f0f0",
    color: "black",
  },
  right: {
    borderTopLeftRadius: "0.625rem",
    borderBottomLeftRadius: "0.625rem",
    backgroundColor: "#AFA3D1",
    color: "black",
  },
  leftFirst: {
    borderTopLeftRadius: "0.625rem",
  },
  leftLast: {
    borderBottomLeftRadius: "0.625rem",
  },
  rightFirst: {
    borderTopRightRadius: "0.625rem",
  },
  rightLast: {
    borderBottomRightRadius: "0.625rem",
  } satisfies SxProps,
};
