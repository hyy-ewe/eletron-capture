import react from 'react';

const paths = [
  {
    path: '/',
    component: react.lazy(() => import('../pages/home')),
  },
  {
    path: '/template',
    component: react.lazy(() => import('../pages/template')),
  },
  {
    path: '/capture-img',
    component: react.lazy(() => import('../pages/capture-img')),
  },
];
export default paths;
