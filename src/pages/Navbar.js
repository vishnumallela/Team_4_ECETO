import React from 'react';
import Image from 'next/image';
import logo from "../images/comet.jpeg";
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import Searchbar from './Searchbar';

function Navbar() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const isActive = (pathname) => router.pathname === pathname;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <a href={"/Dashboard/" + user?.uid} className="nav-logo">
          <Image src={logo} width={50} height={50} alt="Comet Logo" />
          <span className="text-2xl font-semibold">Joined</span>
        </a>

        <div className="nav-link-container">
          <a href={"/CreateEvent/" + user?.uid} className={`nav-link ${isActive('/CreateEvent') ? 'active' : ''}`}>
            Create Event
          </a>
          <a href={"/RegisteredEvents/" + user?.uid} className={`nav-link ${isActive('/RegisteredEvents') ? 'active' : ''}`}>
            Registered Events
          </a>
          <a href={"/UserProfile/" + user?.uid} className={`nav-link ${isActive('/UserProfile') ? 'active' : ''}`}>
            Profile
          </a>
          <a href={"/TrendingEvents"} className={`nav-link ${isActive('/TrendingEvents') ? 'active' : ''}`}>
            Trending Events
          </a>
        </div>

        <div className="nav-action-buttons">
          <button onClick={logout} className="nav-action-button log-out">
            Log out
          </button>
          {/* Add more action buttons if needed */}
        </div>
      </div>
      <div className='flex items-center justify-center mb-4'>
        <Searchbar />
      </div>
    </nav>
  );
}

export default Navbar;
