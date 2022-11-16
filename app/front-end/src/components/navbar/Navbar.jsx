import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLogged, selectUserName, logout } from '../../features/user/userSlice';

export default function Navbar() {
  const userName = useSelector(selectUserName);
  const logged = useSelector(selectLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="navbar bg-neutral">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-500 rounded-box w-52">
            <li>
              <a onClick={() => navigate('/')}>Homepage</a>
            </li>
            {!logged && (
              <li>
                <a onClick={() => navigate('/login')}>Login</a>
              </li>
            )}
            {logged && (
              <li>
                <a onClick={() => dispatch(logout())}>Log Out</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl" onClick={() => navigate('/')}>
          CarShoop
        </a>
      </div>
      <div className="navbar-end pr-4">{logged ? <p>{`Olá ${userName}`}</p> : <p>Olá</p>}</div>
    </div>
  );
}
