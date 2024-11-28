import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { CreateReport } from './pages/CreateReport';
import { Landing } from './pages/Landing';
import { Reports } from './pages/Reports';
import { SuccessReport } from './pages/SuccessReport';

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
        element: <CreateReport />,
      },
      {
        path: 'success',
        element: <SuccessReport />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
    ],
  },
]);
