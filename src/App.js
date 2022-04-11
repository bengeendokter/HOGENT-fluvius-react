import React from 'react';
import './App.css';
import {BrowserRouter as Router, 
  Routes, Route,Navigate,Link} from 'react-router-dom';
// pagina's en componenten
import NavMenu from './components/NavMenu';
import SideMenuBar from './components/SideMenuBar';
import Niks from './pages/Niks';
import Dashboard from './pages/Dashboard';
import OverzichtWijzigen from './pages/OverzichtWijzigen';
import TemplateBeheren from './pages/TemplateBeheren';
import CategorieDashboard from './pages/CategorieDashboard';
import Login from './pages/Login';
import Itsme from './pages/Itsme';
// Imports nodig voor de grid layout
import { Grid } from "@mui/material";
import { Outlet } from 'react-router-dom';

// Dit is nodig om de grid layout op te bouwen
// extra library toevoegen: yarn add @mui/material @emotion/react @emotion/styled
const PageLayout = () => (
  <Grid container>
    <Grid item md={2}>
      <SideMenuBar />
    </Grid>    
    <Grid item md={10}>
      <Outlet /> 
    </Grid>     
  </Grid>
);

function App() {
  return (
    <div className="App">

    <Routes>
      <Route path="*" element={<NavMenu />} />
    </Routes>

    <Routes>
      <Route path="/" element={<PageLayout />} >
        <Route index element={<Niks />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categorieDashboard" element={<CategorieDashboard />} />
        <Route path="/templateBeheren" element={<TemplateBeheren />} />
        <Route path="/overzichtWijzigen" element={<OverzichtWijzigen />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/itsme" element={<Itsme />} />
    </Routes>

      {/* <header className="App-header">
        <img src="./assets/images/1.jpg" alt="SDG 1"className="App-logo" />
        <p>
          Dashbord van GR10.
        </p>
      </header> */}
    </div>
  );
}

export default App;
