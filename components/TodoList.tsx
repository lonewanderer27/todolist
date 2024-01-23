import { FlatList, StyleSheet, View } from 'react-native'
import { H2, Text } from 'tamagui'

import React from 'react'
import Todo from './Todo'
import { TodoType } from '../types'

const TodoList = ({ todos, handleToggle, addTodo, handleDelete, handleUpdate, title }: {
  title: string,
  todos: TodoType[],
  handleToggle: (completed: boolean, id: number) => void,
  handleUpdate: (newTitle: string, newContent: string, id: number) => void,
  handleDelete: (id: number) => void,
  addTodo: (title: string, content: string) => void,
}) => {

  if (todos.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <H2>
        {title} ({todos.length})
      </H2>
      <FlatList
        data={todos}
        renderItem={({ item }: { item: TodoType }) => (
          <Todo
            todo={item}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  )
}

TodoList.defaultProps = {
  title: "Pending"
}

export default TodoList

const styles = StyleSheet.create({
  container: {
    marginBottom: 40
  }
})