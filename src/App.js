import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
// pagina's en componenten
import NavMenu from "./components/NavMenu";
import SideMenuBar from "./components/SideMenuBar";
import Niks from "./pages/Niks";
import Dashboard from "./pages/Dashboard";
import OverzichtWijzigen from "./pages/OverzichtWijzigen";
import TemplateBeheren from "./pages/TemplateBeheren";
import CategorieDashboard from "./pages/CategorieDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Itsme from "./pages/Itsme";
// Imports nodig voor de grid layout
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import DoelstellingDashboard from "./pages/DoelstellingDashboard";

// Dit is nodig om de grid layout op te bouwen
// extra library toevoegen: yarn add @mui/material @emotion/react @emotion/styled
const PageLayout = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-6 ">
      <div className="col-span-1">
        <SideMenuBar />
      </div>
      <div className="col-span-5">
        <Outlet />{" "}
      </div>
    </div>
  </>
);

{
  /* <Grid container>
<Grid item md={2} >
  <SideMenu />
</Grid>   
<Grid item md={10}>
  <Outlet /> 
</Grid>     
</Grid>  */
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NavMenu />} />
      </Routes>

      <Routes>
        {/* <Route path="/" element={<PageLayout />}> */}
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categorieDashboard/:id" element={<CategorieDashboard />} />
          <Route path="/templateBeheren" element={<TemplateBeheren />} />
          <Route path="/overzichtWijzigen" element={<OverzichtWijzigen />} />
          <Route
            exact
            path="/doelstellingDashboard/:id"
            element={<DoelstellingDashboard />}
          />
        {/* </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/itsme" element={<Itsme />} />
      </Routes>
    </div>
  );
}

export default App;
