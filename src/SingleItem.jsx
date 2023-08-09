import { useDeleteTask, useEditTask } from "./ReactQuery";

const SingleItem = ({ item }) => {
  const { EditTask } = useEditTask();
  const { deleteTask, isLoading } = useDeleteTask();

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
 