import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import {
  IsRestoringProvider,
  Mutation,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Gap from "../../Components/Gap";
import { goBack, navigate } from "../../Router/NavigationServices";

const createTodo = async (data) => {
  try {
    const res = await axios.post("https://dummyjson.com/todos/add", data);
    return res.data;
  } catch (error) {
    console.error("error");
  }
};

const updateTodo = async (todoId, data) => {
  try {
    const res = await axios.put(`https://dummyjson.com/todos/${todoId}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const TaskFormScreen = ({ route, navigation }) => {
  const { todo } = route.params || {};
  const queryClient = useQueryClient();
  const isEditing = Boolean(todo);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: todo ? todo.todo : "",
      completed: todo ? todo.completed : "",
    },
  });

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries("todo");
    },
  });

  const editTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: (data, todo) => {
      queryClient.setQueryData({ queryKey: ["todos", { id: todo.id }, data] });
      navigation.goBack();
    },
  });

  const onSubmit = (data) => {
    const datas = {
      title: data.title,
      completed: isEditing ? todo.completed : "Incompleted",
      userId: isEditing ? todo.userId : 1,
      id: isEditing ? todo.id : 2,
    };
    console.log(datas);
    isEditing
      ? editTodoMutation.mutate(datas.id, datas)
      : createTodoMutation.mutate(datas);
  };

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <Controller
        control={control}
        render={({ field }) => (
          <>
            <Text>Title</Text>
            <TextInput
              style={{
                borderWidth: 1,
                padding: 5,
              }}
              {...field}
              onChangeText={(value) => setValue("title", value)}
            />
            {errors.title && <Text>Title is required</Text>}
          </>
        )}
        name="title"
        rules={{ required: true }}
      />
      <Gap height={10} />

      <ActivityIndicator
        animating={createTodoMutation.isPending || editTodoMutation.isPending}
        size="small"
        color="#0000ff"
      />

      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default TaskFormScreen;
