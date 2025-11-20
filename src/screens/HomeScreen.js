import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { useGlobal } from '../context/GlobalContext';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const { user, notes, logout } = useGlobal();
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState('date_desc');

  // --- HOOKS MUST ALWAYS RUN FIRST ---
  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    
    let data = notes.filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.body.toLowerCase().includes(search.toLowerCase())
    );

    return data.sort((a, b) => {
      if (sortType === 'date_desc') return b.updatedAt - a.updatedAt;
      if (sortType === 'date_asc') return a.updatedAt - b.updatedAt;
      if (sortType === 'az') return a.title.localeCompare(b.title);
      if (sortType === 'za') return b.title.localeCompare(a.title);
    });
  }, [notes, search, sortType]);

  // --- SAFE TO RETURN EARLY HERE (After Hooks) ---
  if (!user) return <View style={styles.container} />;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('NoteEditor', { note: item })}>
      {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.thumb} />}
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.cardBody}>{item.body}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Hi, {user?.username}</Text>
        <TouchableOpacity onPress={logout}><Ionicons name="log-out-outline" size={24} color="red" /></TouchableOpacity>
      </View>

      <TextInput 
        placeholder="Search notes..." 
        style={styles.searchBar} 
        value={search} 
        onChangeText={setSearch} 
      />
      
      <View style={styles.sortContainer}>
        <Text style={{ fontWeight: 'bold' }}>Sort:</Text>
        {['date_desc', 'date_asc', 'az', 'za'].map(type => (
           <TouchableOpacity key={type} onPress={() => setSortType(type)} style={{ marginHorizontal: 5 }}>
             <Text style={{ color: sortType === type ? 'blue' : 'gray' }}>
               {type === 'date_desc' ? 'Newest' : type === 'date_asc' ? 'Oldest' : type === 'az' ? 'A-Z' : 'Z-A'}
             </Text>
           </TouchableOpacity>
        ))}
      </View>

      <FlatList 
        data={filteredNotes} 
        keyExtractor={item => item.id} 
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No notes found.</Text>}
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('NoteEditor')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, alignItems: 'center' },
  welcome: { fontSize: 18, fontWeight: 'bold' },
  searchBar: { backgroundColor: 'white', padding: 10, borderRadius: 8, marginBottom: 10 },
  sortContainer: { flexDirection: 'row', marginBottom: 15, alignItems: 'center' },
  card: { backgroundColor: 'white', flexDirection: 'row', padding: 10, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  thumb: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  textContainer: { flex: 1 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardBody: { color: 'gray' },
  empty: { textAlign: 'center', marginTop: 50, color: 'gray' },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: 'blue', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});