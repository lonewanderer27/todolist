import { Adapt, Button, Dialog, Input, Sheet } from 'tamagui'
import { Form, TextArea } from 'tamagui'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { TodoInput, validationSchema } from '../types'
import { object, string } from 'yup'

import { Plus } from '@tamagui/lucide-icons'
import { yupResolver } from "@hookform/resolvers/yup";

const AddTodo = ({ addTodo, open, handleOpenChange }: {
  addTodo: (title: string, content: string) => void,
  open: boolean,
  handleOpenChange: (open: boolean) => void
}) => {
  
  const { register, setValue, handleSubmit, control, reset, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<TodoInput> = (data: TodoInput) => {
    console.log(data)
    addTodo(data.title, data.content ? data.content : "")
  }

  const onError: SubmitErrorHandler<TodoInput> = (data) => {
    console.error(data);
  }

  const titleRef = useRef<TextInput>(null);
  const contentRef = useRef<TextInput>(null);

  return (
    <Dialog modal open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <Button
          style={styles.fab}
        >
          <Plus />
        </Button>
      </Dialog.Trigger>

      <Dialog.Adapt when="sm" platform="touch">
        <Sheet modal animation="medium" zIndex={200000} dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Dialog.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Sheet.Handle />
        </Sheet>
      </Dialog.Adapt>

      <Dialog.Portal>
        <Dialog.Overlay key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}>

        </Dialog.Overlay>
        <Dialog.Content bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4">
          <Dialog.Title>
            New Todo
          </Dialog.Title>

          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Input
              ref={titleRef}
              borderWidth={2}
              placeholder="Input Title"
              onChangeText={(prev) => setValue("title", prev)}
              onLayout={() => titleRef.current?.focus()}
              value={getValues("title")}
              style={styles.textInput}
            />
            <TextArea
              ref={contentRef}
              size="$4"
              borderWidth={2}
              placeholder="Input Content"
              onChangeText={(prev) => setValue("content", prev)}
              value={getValues("content")}
              style={styles.textInput}
            />
            <Form.Trigger asChild>
              <Button>
                Add
              </Button>
            </Form.Trigger>
          </Form>

        </Dialog.Content>
      </Dialog.Portal>

    </Dialog>
  )
}

export default AddTodo;

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 20
  },
  fab: {
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    bottom: 20,
    right: 20,
    position: "absolute",
    height: 70,
    backgroundColor: "gray",
    borderRadius: 100
  }
})