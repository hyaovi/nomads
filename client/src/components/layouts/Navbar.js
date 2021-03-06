import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

function Navbar(props) {
  const onLougoutClick = event => {
    event.preventDefault();
    props.clearCurrentProfile();
    props.logoutUser();
  };
  const { isAuthenticated, user } = props.auth;

  //links seen by logged users
  const authLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/feeds'>
          Feeds
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/dashboard'>
          Dashboard
        </Link>
      </li>
      <li className='nav-item'>
        <a href='.' onClick={onLougoutClick} className='nav-link'>
          <img
            style={{ width: '24px', marginRight: '5px' }}
            className='img-fluid rounded-circle'
            src={user.avatar}
            alt={user.name}
            title='you must set an avatar'
          />
          Logout
        </a>
      </li>
    </ul>
  );

  //links seen by guests
  const guestLinks = (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Sign Up
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Connector
        </Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='mobile-nav'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/profiles'>
                {' '}
                Developers
              </Link>
            </li>
          </ul>

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
}
Navbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
