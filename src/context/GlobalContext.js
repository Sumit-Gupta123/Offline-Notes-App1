import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current logged in user
  const [notes, setNotes] = useState([]); // List of notes for current user
  const [allUsers, setAllUsers] = useState([]); // To check unique usernames

  // Load initial data needed for auth
  useEffect(() => {
    loadUsers();
  }, []);

  // Reload notes whenever user changes
  useEffect(() => {
    if (user) loadNotes();
    else setNotes([]);
  }, [user]);

  const loadUsers = async () => {
    const storedUsers = await AsyncStorage.getItem('app_users');
    if (storedUsers) setAllUsers(JSON.parse(storedUsers));
  };

  const signup = async (username, password) => {
    const exists = allUsers.find(u => u.username === username);
    if (exists) return { success: false, msg: 'Username taken' };

    const newUser = { id: Date.now().toString(), username, password };
    const updatedUsers = [...allUsers, newUser];
    
    await AsyncStorage.setItem('app_users', JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
    return { success: true };
  };

  const login = async (username, password) => {
    const foundUser = allUsers.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, msg: 'Invalid credentials' };
  };

  const logout = () => setUser(null);

  // --- Notes Logic ---

  const loadNotes = async () => {
    // In a real app, we might use SQLite, but here we use one big JSON array for simplicity
    const storedNotes = await AsyncStorage.getItem('app_notes');
    const parsedNotes = storedNotes ? JSON.parse(storedNotes) : [];
    // Filter only notes for this user
    const userNotes = parsedNotes.filter(n => n.userId === user.id);
    setNotes(userNotes);
  };

  const saveNote = async (noteData) => {
    const storedNotes = await AsyncStorage.getItem('app_notes');
    let allNotes = storedNotes ? JSON.parse(storedNotes) : [];

    if (noteData.id) {
      // Update existing
      allNotes = allNotes.map(n => n.id === noteData.id ? { ...n, ...noteData, updatedAt: Date.now() } : n);
    } else {
      // Create new
      const newNote = { 
        ...noteData, 
        id: Date.now().toString(), 
        userId: user.id, 
        createdAt: Date.now(), 
        updatedAt: Date.now() 
      };
      allNotes.push(newNote);
    }

    await AsyncStorage.setItem('app_notes', JSON.stringify(allNotes));
    loadNotes(); // Refresh local state
  };

  const deleteNote = async (id) => {
    const storedNotes = await AsyncStorage.getItem('app_notes');
    let allNotes = storedNotes ? JSON.parse(storedNotes) : [];
    allNotes = allNotes.filter(n => n.id !== id);
    
    await AsyncStorage.setItem('app_notes', JSON.stringify(allNotes));
    loadNotes();
  };

  return (
    <GlobalContext.Provider value={{ user, signup, login, logout, notes, saveNote, deleteNote }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);