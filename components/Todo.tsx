import { Button, Checkbox } from 'tamagui'
import { Check, Delete, Trash2 } from '@tamagui/lucide-icons'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

import { Keyboard } from 'react-native'
import { Text } from 'tamagui'
import { TodoType } from '../types'

const Todo = ({ todo, handleToggle, handleDelete }: {
  todo: TodoType,
  handleToggle: (completed: boolean, id: number) => void,
  handleUpdate: (newTitle: string, newContent: string, id: number) => void,
  handleDelete: (id: number) => void
}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.checkContainer}>
        <Checkbox
          size="$7"
          onCheckedChange={(checked) => handleToggle(checked ? true : false, todo.id)}
          checked={todo.completed}
        >
          <Checkbox.Indicator circular>
            <Check />
          </Checkbox.Indicator>
        </Checkbox>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{todo.title}</Text>
        {todo.content.length > 0 && (<Text style={styles.content}>{todo.content}</Text>)}
      </View>

      <TouchableWithoutFeedback style={styles.deleteContainer} onPress={() => handleDelete(todo.id)}>
        <Trash2 />
      </TouchableWithoutFeedback>
    </View>
  )
}

export default Todo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20
  },
  checkContainer: {
    flex: 2
  },
  contentContainer: {
    flex: 10
  },
  deleteContainer: {
    flex: 2
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10
  },
  content: {
    fontSize: 15
  }
})