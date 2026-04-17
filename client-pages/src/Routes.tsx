import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import { useIsAuthenticated } from './shared/contexts/AuthContext';
import { AppLayout } from './shared/layout/AppLayout';
import { Login } from './pages/public/Login';
import { Detail } from './pages/Detail';
import { About } from './pages/About';
import { Home } from './pages/Home';


export const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();


  return (
    <BrowserRouter>
      {isAuthenticated && (
        <AppLayout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sobre' element={<About />} />
            <Route path='/detalhe/:id' element={<Detail />} />

            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </AppLayout>
      )}
      {!isAuthenticated && (
        <Routes>
          <Route path='*' element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
