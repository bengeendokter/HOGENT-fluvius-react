import {NavLink, Link} from 'react-router-dom';
import {useCallback} from 'react';
import logo from "../images/logo.png";
import {useLogout, useSession} from '../contexts/AuthProvider';

const NavItem = ({
	to,
	label
}) => (

	<span>
		<NavLink
			to={to}
			className="xl:inline-block mt-2  block  m-3 text-white-200 hover:text-[#055063] hover:bg-white bg-[#055063]  p-2 rounded-xl text-white font-bold"

		>

			{label}
		</NavLink>
	</span>
);


export default function NavMenu()
{

	const {isAuthed} = useSession();
	const logout = useLogout();

	const handleClick = useCallback(async () =>
	{
		logout();
	}, [logout]);
	return (
		<>
			<div className="header bg-[#055063]">
				<div className="logofluvius mt-5 md:ml-5">
					<Link to="/dashboard"><img src={logo} alt="Logo" href="#responsive-header" className="min-w-8 w-28 block  min-h-0 lg:inline-block lg:mt-0 " /></Link>
				</div>
				<div className="justify-self-center mt-5">
					<nav className="navigation">


						<NavItem to="/dashboard" label="DASHBOARD" />
						<NavItem to="/templateBeheren" label="TEMPLATE BEHEREN" />
						<NavItem to="/overzichtWijzigen" label="OVERZICHT WIJZIGEN" />
						{isAuthed ? <button className='logout' data-cy="logout_btn" onClick={handleClick}>Logout</button> : <NavItem to="/login" label="LOGIN" />}

					</nav>
				</div>

				<div className="mt-5 acountknoppen flex flex-row-reverse underline">

				</div>

			</div>

		</>
	);
}