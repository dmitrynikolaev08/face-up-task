import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { CreateNotification } from './pages/CreateNotification';
import { Landing } from './pages/Landing';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'create',
        element: <CreateNotification />,
      },
    ],
  },
]);
