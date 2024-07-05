import { NavLink } from "react-router-dom";

export default function AdminHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "../../";
  };

  return (
    <div className="flex h-[50vh] overflow-scroll-initial">
      <div className="flex flex-1">

            {/* Sidebar */}
            <aside className="bg-gray-800 text-white w-64 flex-shrink-0">
          <div className="p-4 flex items-center">
            <img
              src="/vite.svg"
              alt="logo picture"
              className="w-10 h-10 mr-2"
            />
            <span className="text-xl font-semibold">LMS</span>
          </div>
          <nav className="p-2">
            <ul>
              <li>
                <NavLink
                  exact
                  to="/dashboard/dashboard"
                  activeClassName="text-blue-500"
                  className="block py-2 px-4 text-white hover:bg-gray-700"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/student/booklists"
                  activeClassName="text-blue-500"
                  className="block py-2 px-4 text-white hover:bg-gray-700"
                >
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/student/booklists"
                  activeClassName="text-blue-500"
                  className="block py-2 px-4 text-white hover:bg-gray-700"
                >
                  Students
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to="/student/booklists"
                  activeClassName="text-blue-500"
                  className="block py-2 px-4 text-white hover:bg-gray-700"
                >
                  Admin
                </NavLink>
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="block w-full py-2 px-4 text-white bg-blue-500 hover:bg-blue-600"
                >
                  Log out
                </button>
              </li>
            </ul>
          </nav>
          <div className="mt-auto p-4 text-center text-gray-400">
            Created by: Mahesh More
          </div>
        </aside>
       {/* Content */}
       <main className="flex-1 p-5">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow-md rounded-lg px-4 py-6">
              <h1 className="text-2xl text-blue-500">
                Welcome! {userData.name}
              </h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
