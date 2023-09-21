import { Link } from 'react-router-dom';
import logo from '../assets/favicon-32x32.png';
import { useAuth0 } from '@auth0/auth0-react';
const Nav = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();
  const isUser = isAuthenticated && user;
  const vercelUrl =
    'https://drag-n-drop-image-gallery-lp0z5yb46-coderdannie.vercel.app';
  return (
    <header className=" bg-blue-100 ">
      <nav className="wrapper py-7 flex flex-col md:flex-row justify-center items-center gap-4">
        {!isUser && <img src={logo} alt="logo" />}

        {isUser && user.picture && (
          <img
            className="rounded-[100%] w-10 "
            src={user.picture}
            alt={user.name}
          />
        )}
        {isUser && user.name && (
          <h4 className="text-center">
            Welcome{' '}
            <span className="font-bold text-sm md:text-lg">
              {user.name.toUpperCase()}
            </span>
          </h4>
        )}
        {isUser ? (
          <button
            className="text-xl font-bold text-gray-600 pl-6"
            onClick={() => {
              logout({
                returnTo: vercelUrl,
              });
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-xl font-bold text-gray-600 pl-6"
            onClick={loginWithRedirect}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};
export default Nav;
