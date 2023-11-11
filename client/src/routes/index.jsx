import Dashboard from "./Dashboard";
import SignIn from "./Signin.jsx";
import SignUp from "./SignUp.jsx";
import Layout from "../components/Layout.jsx";
import AddCompany from "./AddCompany.jsx";
import CompanyDetails from "./CompanyDetails.jsx";
import SetGoals from "./SetGoals.jsx";

function companyDetailsLoader() {
  return fetch("http://localhost:8000/company-details").then((res) =>
    res.json(),
  );
}
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
            data: "loads nothing in add company",
          };
        },
      },
      {
        path: "/dashboard/company-details",
        element: <CompanyDetails />,
        loader: companyDetailsLoader,
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
