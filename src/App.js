import { useEffect, useState } from "react";
import "./App.css";
import { createTask, getAllTodoList, updateStatus } from "./apicalls";
import Error from "./components/Error";
import TaskList from "./components/TaskList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [currentTask, setCurrentTask] = useState("");
  const [error, setError] = useState(false);

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
    const data = await createTask(currentTask);
    setCurrentTask("");
    setFetch(!fetch);
  };

  const toggleStatus = async (id, title, status) => {
    const data = await updateStatus(id, title, status);
    setFetch(!fetch);
  };

  return (
    <div className="container mt-5">
      <Error message={error} />
      <div className="input-group mb-3">
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
          type="button"
          className="btn btn-outline-success input-group-text"
          onClick={handleSubmit}
        >
          <i class="fas fa-plus" />
        </button>
      </div>

      {todoList.map((task) => (
        <TaskList task={task} toggleStatus={toggleStatus} />
      ))}
    </div>
  );
}

export default App;
