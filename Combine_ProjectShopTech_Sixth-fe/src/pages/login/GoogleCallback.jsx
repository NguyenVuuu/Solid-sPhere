import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import notify from '../../utils/notify';

import { BACKEND_BASE_URL } from "../../config/api";

const API_URL = BACKEND_BASE_URL;
axios.defaults.withCredentials = true;

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Legacy simple flow: call backend for profile, mark as logged-in customer
    axios.get(`${API_URL}/api/auth/me`, { withCredentials: true })
      .then((res) => {
        const data = res?.data || {};
        const user = {
          fullName: data.name || '',
          email: data.email || '',
          avatar: data.picture || '',
          oidcClaims: data.claims || {},
          loginProvider: 'google',
          role: 'customer',
        };
        try {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('authToken', 'google');
        } catch {}
        notify.success('Đăng nhập Google thành công');
        window.location.replace('/');
      })
      .catch(() => navigate('/login'));
  }, []);

  return null;
}


