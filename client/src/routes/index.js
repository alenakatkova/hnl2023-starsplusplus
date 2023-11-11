import Dashboard from "routes/Dashboard";

export const routes = [
  {
    path: "dashboard",
    element: <Dashboard />,
    loader: () => {
      return {
        data: "nothing in the dashboard",
      };
    },
  },
];
