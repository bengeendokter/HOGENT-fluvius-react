import { NavLink, Link } from 'react-router-dom';
import { useCallBack } from 'react';
import hamburger from "../images/hamburger.png";
export default function SideMenuBar() {
    
 
  return (
    <>
      <div className="relative xl:min-h-screen  bg-[#004C69] mb-10" >
      <nav>
    <label for="menu-checkbox">
      <img id="hamburger-icon" src={hamburger} alt="hamburger_icon" className="w-10 block mt-2 lg:block lg:mt-0 m-3"></img>
    </label>
    
    <input type="checkbox" id="menu-checkbox"></input>

    <ul>
      <li><NavLink
			to="/dashboard">
                <a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span className="ml-6">Dashboard</span>
                </a>
                </NavLink></li>
      <li><NavLink
			to="/templateBeheren">
                <a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span className="ml-6">Template beheren</span>
                </a>
                </NavLink></li>
      <li><NavLink
			to="/overzichtWijzigen">
                <a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span className="ml-6">Overzicht wijzigen</span>
                </a>
                </NavLink></li>
      <li><a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span className="ml-6">Categorieën</span>
                </a>
                <NavLink
			to="/categorieDashboard">
                <a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span className="ml-12">Economie</span>
                </a>
                </NavLink>
                <a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span className="ml-12">Sociaal</span>
                </a>
                <a href="#" className="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span className="ml-12">Milieu</span>
                </a></li>
      
    </ul>
  </nav>
      </div>
    </>
  );
}