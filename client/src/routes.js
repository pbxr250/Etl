/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Pipelines from "views/Pipelines.js";
import Destinations from "views/Destinations.js";

const dashboardRoutes = [
  {
    path: "/pipelines",
    name: "Pipelines",
    icon: "nc-icon nc-circle-09",
    component: Pipelines,
    layout: "/admin",
  },
  {
    path: "/destinations",
    name: "Destinations",
    icon: "nc-icon nc-notes",
    component: Destinations,
    layout: "/admin",
  }
];

export default dashboardRoutes;
