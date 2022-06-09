
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import LogoutButton from './auth/LogoutButton';
import './NavBar.css';

const NavBar = () => {
	const user = useSelector((state) => state.session.user);

  return (
		<nav>
			<div className='nav-left-logo'>
				<a href='/'>riff raff</a>
			</div>
			<div className='nav-mid-tag-search'>

			</div>
			<div className='nav-right-btn-menu'>

			<ul className='nav-list-buttons'>
				<li>
					<button className="nav-bar-button" title="Home">
						<NavLink to="/" exact={true} activeClassName="active">
							{/* Home */}
							<i className="fa-solid fa-house"></i>
						</NavLink>
					</button>
				</li>
				{!user && (<li>
					<button className="nav-bar-button" title="Login">
						<NavLink
							to="/login"
							exact={true}
							activeClassName="active"
							>
							{/* Login */}
							<i className="fa-solid fa-arrow-right-to-bracket"></i>
						</NavLink>
					</button>
				</li>)}
				{!user && (<li>
					<button className="nav-bar-button" title="Sign Up">
						<NavLink
							to="/sign-up"
							exact={true}
							activeClassName="active"
							>
							{/* Sign Up */}
							<i className="fa-solid fa-user-plus"></i>
						</NavLink>
					</button>
				</li>)}
				{/* <li>
					<button className='nav-bar-button' title='Users'>
					<NavLink to="/users" exact={true} activeClassName="active">
					Users
					<i className="fa-solid fa-user"></i>
					</NavLink>
					</button>
				</li> */}
				{user && (<li>
					<button className="nav-bar-button" title='New Riff'>
						<NavLink
							to="/riffs/new"
							exact={true}
							activeClassName="active"
							>
							{/* New Post */}
							<i className="fa-solid fa-plus"></i>
						</NavLink>
					</button>
				</li>)}
				{user && (<li>
					<LogoutButton />
				</li>)}
			</ul>
							</div>
		</nav>
  );
}

export default NavBar;
