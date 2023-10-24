import { type FC } from "react";

import { Page } from "@/layouts";
import withAuth from "@/utils/withAuth";
import { UsernameSelect as GenerateUsername } from "@/features/username-select";

const UsernameSelect: FC = () => {
  return (
    <Page>
      <GenerateUsername />
    </Page>
  );
};

export default withAuth(UsernameSelect);
