import { Can } from '@/contexts/casl-context';
import Cards from '@/pages/cards';
import CardsDetails from '@/pages/cards-details';
import Main from '@/pages/main';
import Users from '@/pages/users';
import { createElement, FunctionComponent } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Root from './components/root';
import Login from './pages/login';
import ResetPassword from './pages/reset-password';
import Providers from './providers';
import Gatekeeper from './providers/gatekeeper';

interface ProtectProps {
  s: string;
  a: string;
  component: FunctionComponent;
}

const Protect = (props: ProtectProps) => (
  <Can I={props.a} a={props.s}>
    {createElement(props.component, {})}
  </Can>
);

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Root />}>
            <Route path={'login'} element={<Login />} />
            <Route path={'reset'} element={<ResetPassword />} />
            <Route
              path={'main'}
              element={
                <Gatekeeper>
                  <Main />
                </Gatekeeper>
              }
            >
              <Route index element={<Navigate to={'cards'} />} />
              <Route
                path={'users'}
                element={<Protect s={'user'} a={'view'} component={Users} />}
              />
              <Route path={'cards'}>
                <Route
                  index
                  element={<Protect s={'card'} a={'view'} component={Cards} />}
                />
                <Route
                  path={'details/:id'}
                  element={
                    <Protect s={'card'} a={'view'} component={CardsDetails} />
                  }
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}
