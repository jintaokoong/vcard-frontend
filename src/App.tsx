import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './components/root';
import Login from './pages/login';
import Providers from './providers';
import Gatekeeper from './providers/gatekeeper';
import Main from '@/pages/main';
import Dashboard from '@/pages/dashboard';
import Users from '@/pages/users';
import Cards from '@/pages/cards';

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Root />}>
            <Route path={'login'} element={<Login />} />
            <Route
              path={'main'}
              element={
                <Gatekeeper>
                  <Main />
                </Gatekeeper>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path={'users'} element={<Users />} />
              <Route path={'cards'} element={<Cards />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
