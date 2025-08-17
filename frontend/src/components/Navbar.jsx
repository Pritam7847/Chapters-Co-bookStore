import { useEffect, useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import { useAuth } from '../context/AuthProver';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [authUser] = useAuth();
  const { cartItems } = useCart();

  const navItem = (
    <>
      <li><a href='/'>Home</a></li>
      <li><a href='/course'>Course</a></li>
      <li><a>Contact</a></li>
      <li><a>About</a></li>
    </>
  );

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsChecked(savedTheme === 'synthwave');
  }, []);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const itemTotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const deliveryFee = itemCount > 0 ? 50 : 0;
  const finalTotal = itemTotal + deliveryFee;

  return (
    <div className={`w-full fixed top-0 left-0 right-0 z-50 transition-shadow ${sticky ? 'shadow-md' : ''} bg-base-100`}>
      <div className="navbar max-w-screen-2xl mx-auto px-4 md:px-10 py-2">
        {/* START */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navItem}
            </ul>
          </div>
          <a className="text-base md:text-2xl font-bold cursor-pointer">Chapters&Co</a>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItem}</ul>
        </div>

        {/* END */}
        <div className="navbar-end flex items-center gap-2">
          {/* Search Box (Only on large devices) */}
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered input-sm w-48 hidden lg:inline-block"
          />

          {/* Theme Toggle */}
          <label className="flex cursor-pointer items-center gap-1 sm:gap-2">
            {/* Sun Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>

            <input
              type="checkbox"
              checked={isChecked}
              className="toggle toggle-xs sm:toggle-sm theme-controller"
              onChange={(e) => {
                const theme = e.target.checked ? 'synthwave' : 'light';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                setIsChecked(e.target.checked);
              }}
            />

            {/* Moon Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </label>

          {/* Cart Button */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm lg:btn-outline">
              <span className="text-xl">🛒</span>
              <span className="hidden lg:inline"> Cart ({itemCount})</span>
            </label>

            <div tabIndex={0} className="dropdown-content z-[1] bg-base-100 shadow-md w-72 p-4">
              <h3 className="font-bold text-lg mb-2">Cart Summary</h3>
              {cartItems?.length > 0 ? (
                <>
                  <ul className="space-y-2 max-h-48 overflow-y-auto text-sm">
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <hr className="my-2" />
                  <p>Delivery Fee: ₹{deliveryFee}</p>
                  <p className="font-semibold">Total: ₹{finalTotal}</p>
                </>
              ) : (
                <p className="text-sm">Your cart is empty.</p>
              )}
            </div>
          </div>

          {/* Login / Logout */}
          {authUser ? (
            <Logout />
          ) : (
            <>
              <button
                onClick={() => document.getElementById('my_modal_1').showModal()}
                className="bg-black text-white px-3 py-1 rounded hover:bg-slate-800"
              >
                Login
              </button>
              <Login />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
