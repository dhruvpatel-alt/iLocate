import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import './NavLinks.css';

const NavLinks = props => {
  const auth=useContext(AuthContext);
  const history=useHistory();
  const logout=()=>{
    auth.logout();
    history.push('/auth');
  }
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>ALL USERS</NavLink>
    </li>
  {auth.isLoggedIn &&  <li>
      <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
    </li>}
    {auth.isLoggedIn &&   <li>
      <NavLink to="/places/new">ADD PLACE</NavLink>
    </li>}
    {!auth.isLoggedIn &&    <li>
      <NavLink to="/auth">AUTHENTICATE</NavLink>
    </li>}
    {auth.isLoggedIn &&   <li>
      <button onClick={logout}>Log Out</button>
    </li>}
  </ul>
};

export default NavLinks;