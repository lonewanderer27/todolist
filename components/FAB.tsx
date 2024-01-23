import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Button } from 'tamagui'
import { Plus } from '@tamagui/lucide-icons'
import React from 'react'

const FAB = () => {
  return (
    <Button
      style={styles.fab}
    >
      <Plus />
    </Button>
  )
}

export default FAB

const styles = StyleSheet.create({
  fab: {
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    bottom: 10,
    right: 10,
    position: "absolute",
    height: 70,
    backgroundColor: "gray",
    borderRadius: 100
  }
})