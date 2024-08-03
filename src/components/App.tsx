import { initBackButton, retrieveLaunchParams } from '@telegram-apps/sdk';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect } from 'react';
import {
  BrowserRouter,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Router from "@/navigation/Router.tsx";
import { AuthProvider } from "@/hooks/useAuth.tsx";

const lp = retrieveLaunchParams()

function BackButtonManipulator() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const [backButton] = initBackButton();

    function onClick() {
      navigate(-1);
    }

    backButton.on('click', onClick);

    // Очистка обработчика при размонтировании компонента
    return () => {
      backButton.off('click', onClick);
    };
  }, [navigate]);

  useEffect(() => {
    const [backButton] = initBackButton();

    if (location.pathname === '/') {
      if (backButton.isVisible) {
        backButton.hide();
      }
    } else {
      if (!backButton.isVisible) {
        backButton.show();
      }
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
