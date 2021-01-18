import { useEffect, useState } from "react";
import "./App.css";
import { createItem, getAllTodoList, updateItem, deleteItem } from "./apicalls";
import Error from "./components/Error";
import TaskList from "./components/TaskList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [currentTask, setCurrentTask] = useState("");
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTodoList();
      setTodoList(data);
      console.log(data);
    };
    fetchData();
  }, [fetch]);

  const handleChange = (event) => {
    setError(false);
    setCurrentTask(event.target.value);
  };

  const handleSubmit = async () => {
    if (!currentTask) return setError("Can't submit empty task");
    if (edit) {
      const data = await updateItem(edit, currentTask);
      setEdit();
    } else {
      const data = await createItem(currentTask);
    }
    setCurrentTask("");
    setFetch(!fetch);
  };

  const toggleStatus = async (id, title, status) => {
    const data = await updateItem(id, title, status);
    setFetch(!fetch);
  };

  const deleteTask = async (id) => {
    const data = await deleteItem(id);
    console.log(data);
    setFetch(!fetch);
  };

  const handleEdit = async (id, title) => {
    setEdit(id);
    setCurrentTask(title);
  };
  const cancleEdit = async (id, title) => {
    setEdit();
    setCurrentTask("");
  };

  return (
    <div className="container mt-5">
      <Error message={error} />
      <h1>All to-do List</h1>
      <form className="input-group my-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="New TODO item"
          value={currentTask}
          onChange={handleChange}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <button
          type="submit"
          className="btn btn-outline-success input-group-text"
        >
          {!edit ? <i class="fas fa-plus" /> : <i class="fas fa-pen-alt" />}
        </button>
        {edit && (
          <button
            type="button"
            className="btn btn-outline-danger input-group-text"
            onClick={cancleEdit}
          >
            <i class="fas fa-undo" />
          </button>
        )}
      </form>

      {todoList.length > 0 ? (
        <div id="task-group">
          {todoList.map((task) => (
            <TaskList
              task={task}
              toggleStatus={toggleStatus}
              deleteTask={deleteTask}
              handleEdit={handleEdit}
              disableId={edit}
            />
          ))}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <div className=" mt-3 ">
            <i class="far fa-folder-open fa-10x" />
            <div className=" align-middle">
              <h5>TODO list is empty</h5>
              <p>Well done.</p>

              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
