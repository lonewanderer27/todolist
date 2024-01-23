import { StyleSheet, Text, View } from 'react-native'

import React from 'react'

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Tasks</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 35,
    backgroundColor: "orange"
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: "center"
  }
})