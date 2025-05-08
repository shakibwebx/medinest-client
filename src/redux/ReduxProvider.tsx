'use client';

import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store';
import { ReactNode } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
