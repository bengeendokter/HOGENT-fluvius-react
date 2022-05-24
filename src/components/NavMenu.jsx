import {NavLink, Link} from 'react-router-dom';
import {useCallback} from 'react';
import logo from "../images/logo.png";
import {useLogout, useSession} from '../contexts/AuthProvider';

const NavItem = ({
	to,
	label,
	 ...other
}) => (

	<span {...other}>
		<NavLink to={to} className="xl:inline-block mt-2  block  m-3 text-white-200 hover:text-[#055063] hover:bg-white bg-[#055063]  p-2 rounded-xl text-white font-bold">
			{label}
		</NavLink>
	</span>
);


export default function NavMenu()
{
	const {isAuthed, hasRole} = useSession();
	const logout = useLogout();

	const handleClick = useCallback(async () =>
	{
		logout();
	}, [logout]);

	return (
		<>
			<div className="bg-[#055063] flex flex-col md:flex-row justify-between ">
				<div className="mt-5 md:ml-5 ">
					<Link to="/dashboard"><img src={logo} alt="Logo" href="#responsive-header" className="min-w-8 w-28   min-h-0 lg:mt-0 " /></Link>
				</div>
				<div className="mt-3">
					<nav className="navigation">
						<NavItem data-cy="label_dashboard" to="/dashboard" label="DASHBOARD" />
							{isAuthed && hasRole("MVO coördinator") ? (<><NavItem data-cy="label_rollen_beheren" to="/templateBeheren" label="ROLLEN BEHEREN" /></>) : (<></>)}
							{isAuthed && (hasRole("MVO coördinator") || hasRole("Manager") || hasRole("Directie"))? (<><NavItem data-cy="label_personaliseren" to="/overzichtWijzigen" label="DASHBOARD PERSONALISEREN" /></>) : (<></>)}
					</nav>
				</div>
				<div className="mt-3 text-center">
					{isAuthed ? <NavItem to="/login" label="AFMELDEN" className='logout' data-cy="logout_btn" onClick={handleClick}/> : <NavItem to="/login" label="AANMELDEN" />}
				</div>
			</div>
		</>
	);
}