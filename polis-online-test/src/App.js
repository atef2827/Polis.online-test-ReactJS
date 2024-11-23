import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthGuard from 'components/guards/authGuard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NavBar from './components/Header/NavBar';
import LoadingScreen from 'components/LoadingScreen';
import GuestGuard from 'components/guards/gustGuard';
const MyAccount = lazy(() => import("./pages/MyAccount"));

const App = () => {

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <div> 
          <NavBar />
          <Routes>
            <Route path="/" element={<GuestGuard><Signup /></GuestGuard>} />
            <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
            <Route path="/my-account" element={<AuthGuard><MyAccount /></AuthGuard>} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;