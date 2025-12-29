import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      message.success(t('login_success'));
      navigate('/');
    } catch (error) {
      message.error(t('login_error'));
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">{t('login')}</h2>
      <Input placeholder={t('username')} value={username} onChange={(e) => setUsername(e.target.value)} className="mb-4"/>
      <Input.Password placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4"/>
      <Button type="primary" onClick={handleLogin} block>{t('login')}</Button>
    </div>
  );
}
