import Navbar from "./components/Navbar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import ShopKeeperNavbar from "./components/ShopKeeperNavbar.jsx";

function App() {

  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? (
        <>
          <Navbar />
          <Outlet />
        </>

      ) : location.pathname.startsWith("/shopkeeper") ? (
        <div className="flex w-full h-auto">
          <ShopKeeperNavbar />
          <Outlet />
        </div>) :
        <Outlet />
      }
    </>
  )
}

export default App
