import { useEffect } from 'react';
import { router } from 'expo-router';

export default function TabsLayout() {
  useEffect(() => { router.replace('/'); }, []);
  return null;
}
