import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/pages/about" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/pages/about" className="nav-link">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/pages/contacts" className="nav-link">Contacts</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/pages/divisios" className="nav-link">Divisions</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Admin</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;