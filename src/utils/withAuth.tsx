import { type ComponentType } from "react";
import { useSession } from "next-auth/react";

import Login from "@/pages/login";
import { isValidSession } from "./session";

const withAuth = (Component: ComponentType) => {
  return function WithAuth() {
    const { data: sessionData } = useSession();
    const isAuthenticated = isValidSession(sessionData);

    if (!isAuthenticated) {
      return <Login />;
    }

    return <Component />;
  };
};

export default withAuth;
