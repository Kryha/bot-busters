import { type ComponentType } from "react";
import { useSession } from "next-auth/react";

import { isValidSession } from "./session";
import Home from "@/pages";

const withAuth = (Component: ComponentType) => {
  return function WithAuth() {
    const { data: sessionData } = useSession();
    const isAuthenticated = isValidSession(sessionData);

    if (!isAuthenticated) {
      return <Home />;
    }

    return <Component />;
  };
};

export default withAuth;
