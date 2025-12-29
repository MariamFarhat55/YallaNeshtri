import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, password });
      message.success(t('signup_success'));
      navigate('/login');
    } catch (error) {
      message.error(t('signup_error'));
    }
  };

  return (
    <div className="container mx-auto mt-20 p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">{t('signup')}</h2>
      <Input placeholder={t('username')} value={username} onChange={(e) => setUsername(e.target.value)} className="mb-4"/>
      <Input.Password placeholder={t('password')} value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4"/>
      <Button type="primary" onClick={handleSignup} block>{t('signup')}</Button>
    </div>
  );
}
