import { type FC } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";

import { type PlayerProfileData } from "@/types";
import { text } from "@/assets/text";
import { Header } from "./components/header";
import { styles } from "./styles";
import { RowPlayerProfile } from "./components";

interface Props {
  playerProfile: PlayerProfileData[];
}

export const PlayerTable: FC<Props> = ({ playerProfile }) => {
  if (!playerProfile) return;

  return (
    <TableContainer sx={styles.wrapper}>
      <Table sx={styles.table} aria-label="simple table">
        <Header cells={text.playerProfile.profileColumns} />
        <TableBody>
          {playerProfile.map((profile, index) => {
            return <RowPlayerProfile key={index} playerProfile={profile} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};