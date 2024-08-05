import {retrieveLaunchParams} from '@telegram-apps/sdk';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';

import Router from "@/navigation/Router.tsx";
import { AuthProvider } from "@/hooks/useAuth.tsx";

const lp = retrieveLaunchParams()

export const App: FC = () => (
  <AppRoot
    appearance="light"
    platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
  >
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  </AppRoot>
);
