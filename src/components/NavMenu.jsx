import { NavLink, Link } from 'react-router-dom';
import { useCallback } from 'react';
import logo from "../images/logo.png";
const NavItem = ({
	to,
	label
}) => (
	
	<span>
		<NavLink
			to={to}
			className="xl:inline-block mt-2  block  m-3 text-teal-200 hover:text-[#004C69] hover:bg-inherit bg-[#004C69]  p-2 rounded-xl text-white font-bold"
			
			>
			
			{label}
		</NavLink>
	</span>
);

const NavItemInloggenRegistreren = ({
	to,
	label
}) => (
	<span>
		<NavLink
			to={to}
			className=" text-[#004C69] underline block  lg:block lg:mt-0 m-3 "
		>
			{label}
		</NavLink>
	</span>
);


export default function NavMenu() {

	return (
		<>
<div className="bg-white"  data-cy="inloggen_registreren">
            <div className="flex flex-row-reverse underline">
	
							<NavItemInloggenRegistreren to="/login" label="Inloggen" href="#responsive-header" >Inloggen</NavItemInloggenRegistreren>
              <NavItemInloggenRegistreren to="/registratiepagina" label="Registreren" href="#responsive-header" className=" text-black underline block mt-2 lg:block lg:mt-0 m-3">Registreren</NavItemInloggenRegistreren>
	
            </div >
            <Link to="/home"><div className="flex justify-center"><img src={logo} alt="Logo" href="#responsive-header" className ="w-1/12 block  h-1/2 min-h-0 md:min-h-full lg:inline-block lg:mt-0 "/></div></Link>
          </div>
		<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-1 text-center bg-inherit">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
				  <NavItem to="/dashboard" label="DASHBOARD"  />
				  <NavItem to="/templateBeheren" label="TEMPLATE BEHEREN" />
          <NavItem to="/overzichtWijzigen" label="OVERZICHT WIJZIGEN"  />
        </div>
      </div>
    </nav>
		</>
	);
}