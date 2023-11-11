import Dashboard from "./Dashboard";
import SignIn from "./Signin.jsx";
import SignUp from "./SignUp.jsx";
import Layout from "../components/Layout.jsx";
import AddCompany from "./AddCompany.jsx";

export const routes = [
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
  {
    path: "/dashboard",
    element: <Layout />,
    loader: () => {
      return {
        data: "nothing in the layout",
      };
    },
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: () => {
          return {
            data: "nothing in the dashboard",
          };
        },
      },
      {
        path: "/dashboard/add-company",
        element: <AddCompany />,
        loader: () => {
          return {
            data: "nothing in the signup",
          };
        },
      },
    ],
  },
];
