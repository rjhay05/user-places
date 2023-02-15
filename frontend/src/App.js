import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import UserPlaces from "./places/pages/UserPlaces";
import Navbar from "./shared/Navigation/Navbar";
import Users from "./users/pages/Users";
import Login from './login/pages/Login';
import MyPlaces from "./user-account/pages/MyPlaces";
import LoadingSpinner from "./shared/UI/Spinner/LoadingSpinner";
import AuthContext from "./shared/store/auth-context";



function App() {
  console.log('Rendering')
  const isLoggedIn = localStorage.getItem('isLoggedIn') !== null

  const ctx = useContext(AuthContext)

  let routes;

  if (isLoggedIn) {
    routes = <>
      <Route path="/" element={<Users />} />
      <Route path="/:userId/places" exact element={<UserPlaces />} />
      <Route path="/:userId/myplaces" exact element={<MyPlaces />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  } else {
    routes = <>
      <Route path="/" element={<Users />} />
      <Route path="/:userId/places" exact element={<UserPlaces />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/user/places" element={<Navigate to="/auth/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  }

  return (
    <Router>
     {ctx.isLoading && <LoadingSpinner />}
      <Navbar />
      <Routes>
        {routes}
      </Routes>
    </Router>
  );
}

export default App;
