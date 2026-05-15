import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

interface AddTodoInputProps {
  onAddTodo: (text: string) => void;
}

export default function AddTodoInput({ onAddTodo }: AddTodoInputProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Add a new task"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        style={styles.input}
        right={
          <TextInput.Icon
            icon="plus-circle"
            onPress={handleAdd}
            disabled={!text.trim()}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    backgroundColor: '#fff',
  },
});
