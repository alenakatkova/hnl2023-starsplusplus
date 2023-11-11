import Dashboard from "./Dashboard";
import SignIn from "./Signin.jsx";
import SignUp from "./SignUp.jsx";

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
  {
    path: "/signup",
    element: <SignUp />,
    loader: () => {
      return {
        data: "nothing in the signup",
      };
    },
  },
];
