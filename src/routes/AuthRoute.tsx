import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

function AuthRoute({ children }: React.PropsWithChildren) {
  const [user, setUser] = React.useState(null);
  const accessToken = window.sessionStorage.getItem('accessToken');
  const navigate = useNavigate();

  React.useEffect(() => {
    if(!accessToken) return;
    fetch(`https://tony-cms-ecommerce.vercel.app/api/user/checkauth`, {
      method: 'POST',
      headers: {
        'x-auth-token': accessToken,
      }
    })
    .then(json => json.json())
    .then(data => {
      if(!data.isSuccess) {
        window.sessionStorage.removeItem('accessToken');
        navigate('login')
        return;
      }

      const user = data.user.user;
      setUser(user)
    })
    .catch(err => {
      console.log('err: ', err)
    })
  }, [accessToken])

  console.log('user: ', user)


  if(!accessToken) {
    return <Navigate to="/login" />
  }

  if(!user) {
    return  <Spin />
  }

  return (
    <div>{children}</div>
  )
}

export default AuthRoute