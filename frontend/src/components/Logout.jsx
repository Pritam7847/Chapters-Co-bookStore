import React from 'react'
import { useAuth } from '../context/AuthProver';
import toast from 'react-hot-toast';

function Logout() {
    const [authUser, setAuthUser] = useAuth();

    const handleLogout = () => {
        try {
            setAuthUser({
                ...authUser,
                user: null,
            })
            localStorage.removeItem("User");
            toast.success('Logout successful');

            setTimeout(() => {
            window.location.reload(); // Reload the page to reflect changes
          }, 1000);
        } catch (error) {
            toast.error('Logout failed. Please try again.'+error.meessage);
             setTimeout(() => {}, 1000);
        }
    }

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Logout