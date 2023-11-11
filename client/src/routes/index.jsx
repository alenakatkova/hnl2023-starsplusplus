import Dashboard from "./Dashboard";
import SignIn from "./Signin.jsx";

export const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: () => {
      return {
        data: "nothing in the dashboard",
      };
    },
  },
  {
    path: "/signin",
    element: <SignIn />,
    loader: () => {
      return {
        data: "nothing in the signin",
      };
    },
  },
];
