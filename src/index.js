import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { firebaseApp } from './services/firebase';
import MessageRepository from './services/message_repository';
import RoomRepository from './services/room_repository';
import RouteRepository from './services/route_repository';

const messageRepository = new MessageRepository(firebaseApp);
const roomRepository = new RoomRepository();
const routeRepository = new RouteRepository();

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App
            messageRepository={messageRepository}
            roomRepository={roomRepository}
            routeRepository={routeRepository}
          />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
