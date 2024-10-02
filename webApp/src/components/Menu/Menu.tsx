import './Menu.css';
import { NavLink, useLocation }   from 'react-router-dom';
import GridViewIcon               from '@mui/icons-material/GridView';
import HomeIcon                   from '@mui/icons-material/Home';
import AccountCircleIcon          from '@mui/icons-material/AccountCircle';
import { useContext, useState }   from 'react';
import KeyboardArrowDownIcon      from '@mui/icons-material/KeyboardArrowDown';
import List                       from '@mui/material/List';
import ListItem                   from '@mui/material/ListItem';
import ListItemText               from '@mui/material/ListItemText';
import Divider                    from '@mui/material/Divider';
import { AuthContext }            from '../../auth/AuthContext';
import CodeIcon                   from '@mui/icons-material/Code';
import MenuIcon                   from '@mui/icons-material/Menu';

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export const MenuMc = () => {
  ////////
  // Hooks
  ////////
  const [openMenu, setOpenMenu] = useState(false);
  const {logout} = useContext(AuthContext);
  let location = useLocation();
  

  ////////////
  // Functions
  ////////////
  const handleMenuItems  = () => {
    setOpenMenu( prevState => !prevState);
  }

  return (
    <nav className="menu-container">
      <input type='checkbox' id="btn-hamburger"/>
      <label htmlFor="btn-hamburger" className='btn-hamburger__label'>
        <MenuIcon fontSize="large" onClick={handleMenuItems}/>
      </label>

      <ul style={{ left: openMenu? 0 : "-100%"}}>
        <li>
          <NavLink to="/home" onClick={handleMenuItems}>
            {( {isActive} ) => (
              <span className={isActive? "active-link-menu": "not-active-link-menu"}>
                <HomeIcon color={isActive? "primary": "inherit"}/>
                <span className="menu-title">
                  Home
                </span>
              </span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/categories" onClick={handleMenuItems}>
            {( {isActive} ) => (
              <span className={isActive? "active-link-menu": "not-active-link-menu"}>
                <GridViewIcon color={isActive? "primary": "inherit"}/>
                <span className="menu-title">
                  Categories
                </span>
              </span>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/commands" onClick={handleMenuItems}>
            {( {isActive} ) => (
              <span className={isActive? "active-link-menu": "not-active-link-menu"}>
                <CodeIcon color={isActive? "primary": "inherit"}/>
                <span className="menu-title">
                  Commands
                </span>
              </span>
            )}
          </NavLink>
        </li>

        <li className='mc-menu'>
          <span className={location.pathname === "/user"? "active-link-menu": "not-active-link-menu"}>
            <AccountCircleIcon/>
            <span className="menu-title">
              User
            </span>
            <KeyboardArrowDownIcon/>
          </span>

          <div className='mc-menu-children'>
            <List sx={style} component="nav" aria-label="mailbox folders">
              <ListItem button>
                <ListItemText primary={
                  <NavLink to="/user" onClick={handleMenuItems}>
                    Settings
                  </NavLink>
                }/>
              </ListItem>
              <Divider />
              <ListItem button onClick={logout}>
                <ListItemText primary="Sign out" style={{ color: "red", textAlign: "center" }}/>
              </ListItem>
            </List>
          </div>
        </li>
      </ul>
    </nav>
  )
}
