import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/');
  };

  return (
		<button onClick={onLogout} className='nav-bar-button' title='Log Out'>
			<i className="fa-solid fa-arrow-right-from-bracket"></i>
		</button>
  );
};

export default LogoutButton;
