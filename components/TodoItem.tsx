import React from 'react';
import { StyleSheet } from 'react-native';
import { List, IconButton, Checkbox } from 'react-native-paper';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <List.Item
      title={todo.text}
      titleStyle={[
        styles.title,
        todo.completed && styles.completedText
      ]}
      left={() => (
        <Checkbox
          status={todo.completed ? 'checked' : 'unchecked'}
          onPress={() => onToggle(todo.id)}
        />
      )}
      right={() => (
        <IconButton
          icon="delete"
          onPress={() => onDelete(todo.id)}
          iconColor="#f44336"
        />
      )}
      style={styles.item}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
});
