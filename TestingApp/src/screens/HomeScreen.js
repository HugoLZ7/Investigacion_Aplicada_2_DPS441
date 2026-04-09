import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  Text, 
  Pressable, 
  StyleSheet, 
  StatusBar 
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { addTodo, removeTodo } from '../services/todoService';

export default function HomeScreen() {
  
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {

    if (text.trim().length === 0) return;

    if (editingId) {
      // actualizar tarea
      const updated = todos.map(todo =>
        todo.id === editingId ? { ...todo, text } : todo
      );

      setTodos(updated);
      setEditingId(null);

    } else {
      // agregar tarea nueva
      setTodos(addTodo(todos, text));
    }

    setText('');
  };

  const handleDelete = (id) => {
    setTodos(removeTodo(todos, id));
  };

  const handleEdit = (item) => {
    setText(item.text);
    setEditingId(item.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Mis Tareas</Text>
        <Ionicons name="checkmark-done-circle" size={28} color="white" />
      </View>

      <View style={styles.content}>
        
        {/* INPUT */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="¿Qué tienes pendiente?"
            value={text}
            onChangeText={setText}
            testID="input"
            style={styles.input}
          />

          <Pressable 
            style={styles.addButton} 
            onPress={handleAdd}
            testID="add-button"
          >
            <Ionicons name={editingId ? "create" : "add"} size={30} color="white" />
          </Pressable>
        </View>

        {/* LISTA */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              
              <Text style={styles.todoText}>
                {item.text}
              </Text>

              <View style={styles.actions}>
                
                <Pressable 
                  onPress={() => handleEdit(item)}
                  style={styles.actionButton}
                >
                  <Ionicons name="pencil-outline" size={20} color="#4A90E2" />
                </Pressable>

                <Pressable 
                  onPress={() => handleDelete(item.id)}
                  style={styles.actionButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF5252" />
                </Pressable>

              </View>
            </View>
          )}

          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No hay tareas pendientes
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  navbar: {
    height: 60,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 4,
  },

  navTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  content: {
    flex: 1,
    padding: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
  },

  addButton: {
    backgroundColor: '#6200EE',
    borderRadius: 10,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  todoItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    elevation: 2,
  },

  todoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },

  actions: {
    flexDirection: 'row',
  },

  actionButton: {
    marginLeft: 15,
    padding: 5,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
    fontSize: 16,
  }

});