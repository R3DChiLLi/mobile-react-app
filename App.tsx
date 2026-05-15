import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { PaperProvider, Appbar, Text, FAB, Snackbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import TodoItem from './components/TodoItem';
import AddTodoInput from './components/AddTodoInput';
import { Todo } from './types';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
    showSnackbar('Task added!');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    showSnackbar('Task deleted!');
  };

  const clearCompleted = () => {
    const completedCount = todos.filter(t => t.completed).length;
    if (completedCount > 0) {
      setTodos(todos.filter(todo => !todo.completed));
      showSnackbar(`${completedCount} completed task(s) cleared!`);
    }
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const activeTodos = todos.filter(t => !t.completed).length;
  const completedTodos = todos.filter(t => t.completed).length;

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="Todo List" />
            {completedTodos > 0 && (
              <Appbar.Action icon="delete-sweep" onPress={clearCompleted} />
            )}
          </Appbar.Header>

          <AddTodoInput onAddTodo={addTodo} />

          {todos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text variant="titleLarge" style={styles.emptyText}>
                No tasks yet!
              </Text>
              <Text variant="bodyMedium" style={styles.emptySubtext}>
                Add a task to get started
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.statsContainer}>
                <Text variant="bodyMedium" style={styles.stats}>
                  Active: {activeTodos} | Completed: {completedTodos}
                </Text>
              </View>
              <FlatList
                data={todos}
                renderItem={({ item }) => (
                  <TodoItem
                    todo={item}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                )}
                keyExtractor={item => item.id}
                style={styles.list}
              />
            </>
          )}

          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={2000}
            action={{
              label: 'OK',
              onPress: () => setSnackbarVisible(false),
            }}
          >
            {snackbarMessage}
          </Snackbar>

          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999',
  },
  statsContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  stats: {
    textAlign: 'center',
    color: '#666',
  },
});
