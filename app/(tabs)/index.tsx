import { useEffect } from 'react';
import { router } from 'expo-router';

// Redirect (tabs) to root — we no longer use tab navigation
export default function TabsRedirect() {
  useEffect(() => {
    router.replace('/');
  }, []);
  return null;
}
