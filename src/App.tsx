import { Routes, Route } from 'react-router-dom';
import React, { Fragment } from 'react';

// components
import { Dashboard } from './pages/Dashboard';
import Login from './pages/Login/Login';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Register } from './pages/Register';

// import
import { AdminLayout } from './layouts/AdminLayout';

// routes
import AuthRoute from './routes/AuthRoute';
import PublicRoute from './routes/PublicRoute';

type IRoute = {
  path: string,
  guard?: React.ElementType,
  component?: React.ElementType,
  layout?: React.ElementType
}

const routes: IRoute[] = [
  {
    path: '/',
    guard: AuthRoute,
    component: Dashboard,
    layout: AdminLayout
  },
  {
    path: '/login',
    guard: PublicRoute,
    component: Login
  },
  {
    path: '/contact',
    guard: AuthRoute,
    component: Contact,
    layout: AdminLayout
  },
  {
    path: '/about',
    guard: PublicRoute,
    component: About
  },
  {
    path: '/register',
    guard: PublicRoute,
    component: Register
  }
]

function App() {

  return (
    <>
      <Routes>
        {routes.map((route, index) => {
          const Component = route?.component || Fragment;
          const Guard = route?.guard || Fragment;
          const Layout = route?.layout || Fragment;

          return (
            <Route 
              key={index}
              path={route.path}
              element={
                <Guard>
                  <Layout>
                    <Component />
                  </Layout>
                </Guard>
              } 
            />
          )
        })}
        
      </Routes>
    </>
  )
}

export default App
