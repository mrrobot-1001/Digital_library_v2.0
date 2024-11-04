import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ setCurrentSection, setUserRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleCancelButtonClick = () => {
    setShowLoginForm(false);
    setUserType('');
    setUsername('');
    setPassword('');
  };

  const handleUserTypeClick = (type) => {
    setUserType(type);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginEndpoint = userType === 'admin'
        ? 'http://localhost:3001/api/adminlogin/adminLogin'
        : 'http://localhost:3001/api/teacherlogin/teacherLogin';

      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userRole', data.role);
        setUserRole(data.role);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error logging in", error);
    } finally {
      setLoading(false);
      handleCancelButtonClick();
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide cursor-pointer transition duration-300 hover:text-gray-400">
          <a onClick={() => setCurrentSection("home")}>Logo</a>
        </div>

        {/* Links - Hidden on mobile */}
        <div className="hidden md:flex space-x-6 text-lg">
          <a onClick={() => setCurrentSection("home")} className="hover:text-gray-400 transition duration-300">Home</a>
          <a onClick={() => setCurrentSection("books")} className="hover:text-gray-400 transition duration-300">Books</a>
          <a onClick={() => setCurrentSection("notes")} className="hover:text-gray-400 transition duration-300">Notes</a>
          <a onClick={() => setCurrentSection("about")} className="hover:text-gray-400 transition duration-300">About Us</a>
        </div>

        {/* Login Button */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleLoginButtonClick} 
            className="hidden md:flex items-center bg-blue-600 px-4 py-2 rounded-full shadow-lg hover:bg-blue-500 transition duration-300"
          >
            <LockKeyhole className="mr-2" />
            Login
          </button>

          {/* Menu Button for mobile */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <a onClick={() => setCurrentSection("home")} className="block px-4 py-2 hover:bg-gray-700">Home</a>
            <a onClick={() => setCurrentSection("books")} className="block px-4 py-2 hover:bg-gray-700">Books</a>
            <a onClick={() => setCurrentSection("notes")} className="block px-4 py-2 hover:bg-gray-700">Notes</a>
            <a onClick={() => setCurrentSection("about")} className="block px-4 py-2 hover:bg-gray-700">About Us</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form Pop-Up */}
      <AnimatePresence>
        {showLoginForm && (
          <motion.div 
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-lg w-80"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
              <div className="flex justify-around mb-4">
                <button 
                  onClick={() => handleUserTypeClick("admin")} 
                  className={`px-4 py-2 rounded-full transition duration-300 ${userType === "admin" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  Admin
                </button>
                <button 
                  onClick={() => handleUserTypeClick("teacher")} 
                  className={`px-4 py-2 rounded-full transition duration-300 ${userType === "teacher" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
                >
                  Teacher
                </button>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <button 
                  type="button" 
                  onClick={handleCancelButtonClick} 
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300 mt-2"
                >
                  Cancel
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
