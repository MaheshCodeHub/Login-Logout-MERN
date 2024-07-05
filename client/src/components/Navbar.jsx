import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavbarMenu() {
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-green-500 ">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Replace with your logo */}
          <img src="/vite.svg" alt="logo" className="w-10 h-10" />

          <div className="flex space-x-4">
            {isUserSignedIn ? (
              <>
                {/* if login then show some navigation into here  */}
                <div className="p-4 flex items-center">
                  <span className="text-xl font-semibold">LMS</span>
                </div>
              </>
            ) : (
              <>
                {/* Navigation links */}
                <Link
                  to="/"
                  className="text-white hover:bg-green-600 px-3 py-2 rounded"
                >
                  Home
                </Link>
                <Link
                  to="/aboutus"
                  className="text-white hover:bg-green-600 px-3 py-2 rounded"
                >
                  About Us
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarMenu;
