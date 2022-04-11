import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.png";

const NavItemInloggenRegistreren = ({ to, label }) => (
  <span>
    <NavLink
      to={to}
      className=" text-[#004C69] underline text-xl block mt-2 lg:block lg:mt-0 m-3 font-semibold"
    >
      {label}
    </NavLink>
  </span>
);

export default function NavMenu() {
  return (
    <>
      <div className="bg-white" data-cy="inloggen_registreren">
        <div className="grid grid-cols-2 p-2">
          <div className="justify-self-start">
            <Link to="/home" href="#responsive-header">
              <div>
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 block mt-2 lg:block lg:mt-0 m-3"
                />
              </div>
            </Link>
          </div>
          <div className="justify-self-end">
            <div className="grid grid-cols-2">
              <div>
                <NavItemInloggenRegistreren
                  to="/registratiepagina"
                  label="Registreren"
                  href="#responsive-header"
                  className=" text-black underline block mt-2 lg:block lg:mt-0 m-3"
                >
                  Registreren
                </NavItemInloggenRegistreren>
              </div>
              <div>
                <NavItemInloggenRegistreren
                  to="/login"
                  label="Inloggen"
                  href="#responsive-header"
                >
                  Inloggen
                </NavItemInloggenRegistreren>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
