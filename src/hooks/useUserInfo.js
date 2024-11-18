// src/hooks/useUserInfo.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true
        });
        setUserInfo(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.msg || 'Failed to fetch user info');
        toast({
          title: "Error",
          description: "Failed to load user information. Please login again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [toast]);

  return { userInfo, loading, error };
};