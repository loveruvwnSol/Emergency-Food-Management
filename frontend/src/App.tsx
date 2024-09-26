import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { CreateAccount } from './pages/CreateAccount';
import { useAuth } from './hooks/auth';
import { useEffect } from 'react';
import { Start } from './pages/Start';
import Family from './pages/Family';
import Settings from './pages/Settings';
import Items from './pages/Items';

function App() {
  const [{ IsLoggedInUser }] = useAuth();

  useEffect(() => {
    IsLoggedInUser();
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/start'
        element={<Start />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/createAccount'
        element={<CreateAccount />}
      />
      <Route
        path='/family'
        element={<Family />}
      />
      <Route
        path='/items'
        element={<Items />}
      />
      <Route
        path='/settings'
        element={<Settings />}
      />
    </Routes>
  );
}

export default App;
