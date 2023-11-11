import Dashboard from "./Dashboard";
import SignIn from "./Signin.jsx";
import SignUp from "./SignUp.jsx";
import Layout from "../components/Layout.jsx";
import AddCompany from "./AddCompany.jsx";
import CompanyDetails from "./CompanyDetails.jsx";
import SetGoals from "./SetGoals.jsx";

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
            data: "nothing in the add company form",
          };
        },
      },
      {
        path: "/dashboard/company-details",
        element: <CompanyDetails />,
        loader: () => {
          return {
            data: "nothing in the company details",
          };
        },
      },
      {
        path: "/dashboard/set-goals",
        element: <SetGoals />,
        loader: () => {
          return {
            data: "Set Goals",
          };
        },
      },
    ],
  },
];
