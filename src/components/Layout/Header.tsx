import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { AppDispatch, RootState } from '../../store';
import { logoutUser } from '../../store/slices/authSlice';

interface HeaderProps {
  onShowCart: () => void;
}

const Header = (props: HeaderProps) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <h1>
            <Link to="/" className={classes.logo}>ReactMeals</Link>
          </h1>
        </div>
        <div className={classes.navItems}>
          {isAuthenticated && <HeaderCartButton onClick={props.onShowCart} />}
          <div className={classes.authActions}>
            {isAuthenticated ? (
              <>
                <span className={classes.userInfo}>Hola, {user?.name}</span>
                <button onClick={handleLogout} className={classes.logoutButton}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={classes.authLink}>Login</Link>
                <Link to="/register" className={classes.authLink}>Register</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
