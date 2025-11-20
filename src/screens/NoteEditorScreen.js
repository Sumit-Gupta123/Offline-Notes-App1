import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useGlobal } from '../context/GlobalContext';
import { Ionicons } from '@expo/vector-icons';

export default function NoteEditorScreen({ route, navigation }) {
  const { saveNote, deleteNote } = useGlobal();
  const existingNote = route.params?.note;

  const [title, setTitle] = useState(existingNote ? existingNote.title : '');
  const [body, setBody] = useState(existingNote ? existingNote.body : '');
  const [imageUri, setImageUri] = useState(existingNote ? existingNote.imageUri : null);

  const pickImage = async (useCamera = false) => {
    let result;
    if (useCamera) {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
    }

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) return Alert.alert('Error', 'Title is required');
    
    await saveNote({ 
      id: existingNote?.id, 
      title, 
      body, 
      imageUri 
    });
    navigation.goBack();
  };

  const handleDelete = async () => {
    Alert.alert('Confirm', 'Delete this note?', [
      { text: 'Cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
          await deleteNote(existingNote.id);
          navigation.goBack();
      }}
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput 
        placeholder="Note Title" 
        style={styles.titleInput} 
        value={title} 
        onChangeText={setTitle} 
      />
      
      <View style={styles.imageButtons}>
        <Button title="Pick from Gallery" onPress={() => pickImage(false)} />
        <View style={{ width: 10 }} />
        <Button title="Take Photo" onPress={() => pickImage(true)} />
      </View>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.removeImg} onPress={() => setImageUri(null)}>
             <Ionicons name="close-circle" size={30} color="red" />
          </TouchableOpacity>
        </View>
      )}

      <TextInput 
        placeholder="Write your note here..." 
        style={styles.bodyInput} 
        multiline 
        value={body} 
        onChangeText={setBody} 
      />

      <View style={styles.actionButtons}>
        <Button title="Save Note" onPress={handleSave} />
        {existingNote && (
          <View style={{ marginTop: 10 }}>
            <Button title="Delete Note" color="red" onPress={handleDelete} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titleInput: { fontSize: 24, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 20, paddingVertical: 5 },
  bodyInput: { fontSize: 16, minHeight: 200, textAlignVertical: 'top' },
  imageButtons: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  imageContainer: { alignItems: 'center', marginBottom: 15, position: 'relative' },
  imagePreview: { width: '100%', height: 200, borderRadius: 10, resizeMode: 'cover' },
  removeImg: { position: 'absolute', top: 5, right: 5 },
  actionButtons: { marginBottom: 50 }
});