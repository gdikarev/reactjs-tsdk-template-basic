import {initBackButton, initMainButton, retrieveLaunchParams} from '@telegram-apps/sdk';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect } from 'react';
import {
  BrowserRouter,
  useLocation,
} from 'react-router-dom';

import Router from "@/navigation/Router.tsx";
import { AuthProvider } from "@/hooks/useAuth.tsx";

const lp = retrieveLaunchParams()

function BackButtonManipulator() {
  const location = useLocation();

  useEffect(() => {
    const [backButton] = initBackButton();
    const [mainButton] = initMainButton();

    if (location.pathname === '/') {
        mainButton.hide();
        backButton.hide();
    }
  }, [location]);

  return null;
}

export const App: FC = () => (
  <AppRoot
    appearance="light"
    platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
  >
    <BrowserRouter>
      <AuthProvider>
        <BackButtonManipulator/>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  </AppRoot>
);
