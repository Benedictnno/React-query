import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import customFetch from "./utils";
import { toast } from "react-toastify";

const SingleItem = ({ item }) => {
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

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => EditTask({ trackId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        disabled={isLoading}
        onClick={() => deleteTask({ trackId: item.id })}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
