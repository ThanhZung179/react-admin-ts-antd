import React from 'react';
import { useNavigate } from 'react-router-dom';

// antd
import { Button, Form, Input } from 'antd';


type FieldType = {
  password?: string;
  email?: string
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    const data = {
      email: values.email,
      password: values.password
    }

    fetch(`https://tony-cms-ecommerce.vercel.app/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(json => json.json())
    .then(data => {
      if(!data.isSucess) return;
      window.sessionStorage.setItem('accessToken', data.token);
      navigate('/')
    })
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ 
        email: '',
        password: ''
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1 className="text-3xl font-bold underline text-center">Hello tailwind!</h1> 
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
  
  
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};

export default Login;