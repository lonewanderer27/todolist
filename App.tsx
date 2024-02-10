import { Adapt, Overlay } from 'tamagui';
import { Dialog, Portal, TamaguiProvider, createTamagui } from 'tamagui'
import { StyleSheet, Text, View } from "react-native";

import AddTodo from "./components/AddTodo";
import { Button } from 'tamagui';
import FAB from "./components/FAB";
import Header from "./components/Header";
import NoTodos from './components/NoTodos';
import { Plus } from '@tamagui/lucide-icons';
import { Sheet } from 'tamagui';
import { StatusBar } from "expo-status-bar";
import TodoList from "./components/TodoList";
import { TodoType } from "./types";
import appConfig from "./tamagui.config";
import { useState } from "react";

// this makes typescript properly type everything based on the config
type Conf = typeof appConfig
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf { }
}

export default () => {
  return (
    <TamaguiProvider config={appConfig}>
      <App />
    </TamaguiProvider>
  )
}

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [todos, setTodos] = useState<TodoType[]>(() => []);

  const toggleCompleted = (completed: boolean, id: number) => {
    console.log("toggleCompleted! ", completed);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: completed } : todo
      )
    )
  }

  const addTodo = (title: string, content: string) => {
    console.log("new todo:")
    console.log("title: ", title, " content: ", content);

    if (content.length < 2 || title.length < 2) {
      return;
    }

    setTodos((prev) => [...prev, {
      title, content, completed: false,
      id: prev.length
    }])

    setDialogOpen(false);
  }

  const updateTodo = (newTitle: string, newContent: string, id: number) => {
    console.log("update todo", id, " (ID)");
    console.log("newTitle: ", newTitle, " newContent: ", newContent);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ?
          { ...todo, title: newTitle, content: newContent } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    console.log("delete todo: ", id, " (ID)");
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.subcontainer}>

        {todos.length === 0 && (
          <NoTodos />
        )}

        <TodoList
          handleDelete={deleteTodo}
          title="Completed"
          todos={todos.filter((i) => i.completed)}
          handleToggle={toggleCompleted} addTodo={addTodo}
        />

        <TodoList 
          handleDelete={deleteTodo} 
          todos={todos.filter((i) => !i.completed)} 
          handleToggle={toggleCompleted} 
          addTodo={addTodo}
        />

        <AddTodo
          addTodo={addTodo}
          open={dialogOpen}
          handleOpenChange={(open) => setDialogOpen(open)}
        />

        <StatusBar style="auto" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start"
  },
});
