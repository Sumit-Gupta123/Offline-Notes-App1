import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GlobalProvider, useGlobal } from './src/context/GlobalContext';

import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { user } = useGlobal();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Notes' }} />
          <Stack.Screen name="NoteEditor" component={NoteEditorScreen} options={{ title: 'Edit Note' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GlobalProvider>
  );
}