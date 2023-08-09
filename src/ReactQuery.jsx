import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import customFetch from "./utils";
import { toast } from "react-toastify";

export const useFetchTask = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  return { isLoading, data, isError, error };
};

export const useCreateTask = (setNewItemName) => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task added");
    //   setNewItemName("");
    },
    onError: (error) => {
      console.log(toast.error(error.response.data.msg));
    },
  });

  return { createTask, isLoading };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: EditTask } = useMutation({
    mutationFn: ({ trackId, isDone }) =>
      customFetch.patch(`/${trackId}`, { isDone }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // toast.success("task edited");
      // setEditing("");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });

  return { EditTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isLoading } = useMutation({
    mutationFn: ({ trackId }) => customFetch.delete(`/${trackId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // toast.success("task edited");
      // setEditing("");
    },
    onError: (error) => {
      toast.error(error.response.data.msg);
    },
  });
  return { deleteTask, isLoading };
};
