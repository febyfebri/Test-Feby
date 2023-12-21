import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Gap from "../../Components/Gap";

const fetchTask = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/todos");
    return res.data.todos || [];
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (todoId) => {
  try {
    const res = await axios.delete(`https://dummyjson.com/todos/${todoId}`);
    console.log(res?.data);
  } catch (error) {
    console.log(error);
  }
};

const TaskListScreen = ({ navigation }) => {
  const {
    data: todos,
    isLoading,
    isPending,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTask,
  });
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = (todoId) => {
    deleteTodoMutation.mutate(todoId);
  };

  const handleEdit = (todo) => {
    navigation.navigate("TaskForm", { todo });
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              maxWidth: 200,
            }}
          >
            {item.todo}
          </Text>
          <Gap width={5} />
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            {item.completed ? "Completed" : "InCompleted"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Gap width={5} />
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Text
              style={{
                padding: 2,
                backgroundColor: "black",
                color: "white",
              }}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <Gap width={5} />
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text
              style={{
                padding: 2,
                backgroundColor: "red",
                color: "white",
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <View>
      {isFetching ? <ActivityIndicator /> : ""}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={() => navigation.navigate("TaskForm")}>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            backgroundColor: "green",
            padding: 20,
            borderRadius: 100,
            left: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
            }}
          >
            Add
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TaskListScreen;
