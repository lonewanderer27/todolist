import { StyleSheet, View } from 'react-native'

import { Plus } from '@tamagui/lucide-icons'
import React from 'react'
import { Text } from 'tamagui'

const NoTodos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Click the <Plus/> icon to add to-do</Text>
    </View>
  )
}

export default NoTodos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    fontSize: 20
  }
})