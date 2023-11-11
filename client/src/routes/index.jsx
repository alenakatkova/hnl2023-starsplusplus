import Dashboard from "./Dashboard";
import SignIn from "./Signin.jsx";
import SignUp from "./SignUp.jsx";
import Layout from "../components/Layout.jsx";
import AddCompany from "./AddCompany.jsx";
import CompanyDetails from "./CompanyDetails.jsx";
import SetGoals from "./SetGoals.jsx";
import Goals from "./Goals.jsx";
import AddEvent from "./AddEvent.jsx";

const demoEvents = [
  {
    id: 1,
    name: "Healthcare Campaign",
    dates: "2023-07-15 to 2023-07-20",
    location: "Geneva, Switzerland",
    metrics: ["Number of Clinics Set Up"],
    participants: 27,
  },
  {
    id: 2,
    name: "Education Awareness Week",
    dates: "2023-09-01 to 2023-09-07",
    location: "Geneva, Switzerland",
    metrics: ["Schools Built", "Children Enrolled"],
    participants: 133,
  },
  {
    id: 3,
    name: "Emergency Relief Drive",
    dates: "2023-11-10 to 2023-11-15",
    location: "Geneva, Switzerland",
    metrics: ["Relief Packages Distributed", "Families Assisted"],
    participants: 56,
  },
];

const demoGoals = [
  {
    area: "Healthcare Assistance",
    metric: "Number of Clinics Set Up",
    year: 2023,
    target: 15,
    currentValue: 8,
    unit: "clinics",
  },
  {
    area: "Education for Children",
    metric: "Schools Built",
    year: 2022,
    target: 10,
    currentValue: 10,
    unit: "schools",
  },
  {
    area: "Education for Children",
    metric: "Children Enrolled",
    year: 2023,
    target: 200,
    currentValue: 150,
    unit: "students",
  },
  {
    area: "Emergency Relief",
    metric: "Relief Packages Distributed",
    year: 2021,
    target: 1000,
    currentValue: 1000,
    unit: "packages",
  },
  {
    area: "Emergency Relief",
    metric: "Families Assisted",
    year: 2023,
    target: 500,
    currentValue: 300,
    unit: "families",
  },
];

const demoNgo = {
  companyName: "Global Humanitarian Aid",
  address: "456 Peace Road, Geneva, Switzerland",
  impactAreas: [
    {
      id: 1,
      value: "Healthcare Assistance",
      metrics: [{ id: 101, name: "Number of Clinics Set Up", unit: "clinics" }],
    },
    {
      id: 2,
      value: "Education for Children",
      metrics: [
        { id: 201, name: "Schools Built", unit: "schools" },
        { id: 202, name: "Children Enrolled", unit: "students" },
        { id: 203, name: "Grant Allocated", unit: "grants" },
      ],
    },
    {
      id: 3,
      value: "Emergency Relief",
      metrics: [
        { id: 301, name: "Relief Packages Distributed", unit: "packages" },
        { id: 302, name: "Families Assisted", unit: "families" },
      ],
    },
  ],
};

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
        data: "layout",
      };
    },
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: () => {
          return {
            data: demoEvents,
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
      {
        path: "/dashboard/goals",
        element: <Goals />,
        loader: () => {
          return {
            data: demoGoals,
          };
        },
      },
      {
        path: "/dashboard/add-event",
        element: <AddEvent />,
        loader: () => {
          return {
            data: demoNgo,
          };
        },
      },
    ],
  },
];
