// @material-ui/icons
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Тест",
    component: DashboardPage,
    layout: "/admin"
  },
];

export default dashboardRoutes;
