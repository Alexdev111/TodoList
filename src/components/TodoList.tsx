import { useState } from "react";

type Task = {
  category: string;
  task: string;
};

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("");

  const handleInputChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleInputChangeCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTask || !category) return;

    setTasks([...tasks, { category, task: newTask }]);

    setNewTask("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={newTask} onChange={handleInputChangeTask} />
      <input value={category} onChange={handleInputChangeCategory} />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoList;
