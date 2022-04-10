import { NavLink, Link } from 'react-router-dom';
export default function SideMenuBar() {
  return (
    <>

<div class="relative min-h-screen md:flex" data-dev-hint="container">
    <input type="checkbox" id="menu-open" class="hidden" />

    <label for="menu-open" class="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden" data-dev-hint="floating action button">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </label>

    <header class="bg-[#004C69] text-gray-100 flex justify-between md:hidden" data-dev-hint="mobile menu bar">
        

        <label for="menu-open" id="mobile-menu-button" class="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md">
            <svg id="menu-open-icon" class="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg id="menu-close-icon" class="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </label>
    </header>

    <aside id="sidebar" class="bg-[#004C69] text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto" data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation">
        <div class="flex flex-col space-y-6" data-dev-hint="optional div for having an extra footer navigation">
            

            <nav data-dev-hint="main navigation">
            <NavLink
			to="/dashboard">
                <a href="#" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span class="ml-6">Dashboard</span>
                </a>
                </NavLink>
                <NavLink
			to="/templateBeheren">
                <a href="#" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span class="ml-6">Template beheren</span>
                </a>
                </NavLink>
                <NavLink
			to="/overzichtWijzigen">
                <a href="#" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span class="ml-6">Overzicht wijzigen</span>
                </a>
                </NavLink>
                <a href="#" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span class="ml-6">Categorieën</span>
                </a>
                <NavLink
			to="/categorieDashboard">
                <a href="#" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span class="ml-12">Economie</span>
                </a>
                </NavLink>
                <a href="#" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span class="ml-12">Sociaal</span>
                </a>
                <a href="#" class="flex items-center space-x-2 py-2 px-4 transition duration-200 hover:bg-white hover:text-[#004C69]">
                    <span class="ml-12">Milieu</span>
                </a>
                
            </nav>
        </div>

        
    </aside>

    
</div>
</>
  );
}