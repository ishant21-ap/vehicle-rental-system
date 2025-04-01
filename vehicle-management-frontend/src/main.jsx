import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import LandingPage from './pages/LandingPage.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import OTPVerification from './components/OTPVerification.jsx';
import PasswordReset from './components/PasswordReset.jsx';
import ShopKeeperLandingPage from './pages/ShopKeeperLandingPage.jsx';
import ShopKeeperVehicles from './components/ShopKeeperVehicles.jsx';
import ShopKeeperBooking from './components/ShopKeeperBooking.jsx';
import CarDescription from './components/CarDescription.jsx';
import ViewAllCars from './components/ViewAllCars.jsx';
import UserProfile from './components/UserProfile.jsx';


const router = createBrowserRouter((
  createRoutesFromElements(
    <Route path={'/'} element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path={'/register'} element={<Register />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/otp-verification'} element={<OTPVerification />} />
      <Route path={'/forgot-password'} element={<PasswordReset />} />
      <Route path={'/car-description'} element={<CarDescription />} />
      <Route path={'/all-vehicles'} element={<ViewAllCars />} />
      <Route path={'/profile'} element={<UserProfile />} />
      <Route path={'/shopkeeper'}>
        <Route index element={<ShopKeeperLandingPage />} />
        <Route path={'vehicles'} element={<ShopKeeperVehicles />} />
        <Route path={'bookings'} element={<ShopKeeperBooking />} />
      </Route>
    </Route>
  )
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
