import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#0A0A0F' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="scanner" />
        <Stack.Screen name="result" />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
