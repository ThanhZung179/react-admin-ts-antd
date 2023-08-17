
import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }: React.PropsWithChildren) {
  const accessToken = window.sessionStorage.getItem('accessToken');

  if(accessToken) {
    return <Navigate to="/" />
  }

  return (
    <div>{children}</div>
  )
}

export default PublicRoute