import { useRef, useState } from "react";

const TodoList = () => {
  const [tasks, setTask] = useState([
    {
      category: "Food",
      tasks: [],
    },
    { category: "Work", tasks: [] },
  ]);
  const [newTask, setNewTask] = useState({});
  const [category, setCategory] = useState("");

  const taskNameRef = useRef<HTMLInputElement>(null);
  const categoryNameRef = useRef<HTMLInputElement>(null);
  const task = { category: "", taskName: "" };

  function handleInputChangeTask(event) {
    setNewTask(event.target.value);
  }

  function handleInputChangeCategory(event) {
    setCategory(event.target.value);
  }
  function addTask() {
    if (newTask) {
      setTask({ ...tasks, newTask });
      console.log([...tasks, newTask]);
      setCategory("");
      setNewTask("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.category.value.length >= 1) {
      console.log(e.target.category.value);
      setCategory("Category:" + e.target.category.value);
    } else {
      console.error("Category must be a single character");
    }
    if (e.target.task.value.length >= 1) {
      console.log(e.target.task.value);
      setCategory(e.target.category.value);
    } else {
      console.error("Task must be a single character");
    }
  }
  return (
    <div>
      <h2>Project Progress: 0%</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              name="task"
              value={newTask}
              onChange={handleInputChangeTask}
              placeholder="New Task Title"
              className="form-control"
              style={{ width: "auto" }}
            />
            <input
              type="text"
              name="category"
              value={category}
              onChange={handleInputChangeCategory}
              placeholder="Category"
              className="form-control"
              style={{ width: "auto" }}
            />
            <button
              className="btn btn-primary"
              type="submit"
              style={{ width: "auto", marginRight: "5px" }}
              onClick={addTask}
            >
              Add Task
            </button>
            <input
              type="text"
              placeholder="Task ID to remove"
              className="form-control"
              style={{ width: "auto" }}
            />
            <button
              className="btn btn-primary"
              type="submit"
              style={{ width: "auto" }}
            >
              Remove Task
            </button>
          </div>
        </form>
      </div>
      {/* <div className="task-element">
        <h2>{category + " " + `(0% completed, ${tasks.length} tasks)`} </h2>
        <ol className="list-group">
          {tasks.map((task, index) => (
            <li key={index}>
              <ul className="list-group-item">{task}</ul>
            </li>
          ))}
        </ol>
      </div> */}
    </div>
  );
};

export default TodoList;
