import { useRef, useState } from "react";
import type { FormEvent } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    {
      category: "Food",
      tasks: [
        { name: "Make lassagna", completed: false },
        { name: "Eat sushi", completed: false },
      ],
    },
    {
      category: "Work",
      tasks: [
        { name: "Make new project", completed: false },
        { name: "Learn something new", completed: false },
      ],
    },
  ]);

  const [, setNewTask] = useState<{
    category: string;
    taskName: string;
  } | null>(null);

  const taskNameRef = useRef<HTMLInputElement>(null);
  const categoryNameRef = useRef<HTMLInputElement>(null);
  const deleteTaskRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (taskNameRef.current != null && categoryNameRef.current != null) {
      //   newTask.taskName = taskNameRef.current.value;
      //   newTask.category = categoryNameRef.current.value;
      const taskName = taskNameRef.current.value.trim();
      const category = categoryNameRef.current.value.trim();

      if (!taskName || !category) return;
      setTasks((prevTasks) => {
        const existingCategory = prevTasks.find(
          (t) => t.category.toLowerCase() === category.toLowerCase(),
        );

        if (existingCategory) {
          return prevTasks.map((t) =>
            t.category.toLowerCase() === category.toLowerCase()
              ? {
                  ...t,
                  tasks: [...t.tasks, { name: taskName, completed: false }],
                }
              : t,
          );
        } else {
          return [
            ...prevTasks,
            {
              category,
              tasks: [{ name: taskName, completed: false }],
            },
          ];
        }
      });

      setNewTask({ category, taskName });
      taskNameRef.current.value = "";
      categoryNameRef.current.value = "";
    }
  };

  function onClickTaskComplete(categoryIndex: number, taskIndex: number) {
    setTasks((prev) =>
      prev.map((cat, i) =>
        i === categoryIndex
          ? {
              ...cat,
              tasks: cat.tasks.map((task, j) =>
                j === taskIndex
                  ? { ...task, completed: !task.completed }
                  : task,
              ),
            }
          : cat,
      ),
    );
  }

  function deleteTask() {
    const taskToDelete = deleteTaskRef.current?.value.trim().toLowerCase();

    if (!taskToDelete) return;

    setTasks((prevTasks) =>
      prevTasks.map((category) => ({
        ...category,
        tasks: category.tasks.filter(
          (task) => task.name.toLowerCase() !== taskToDelete,
        ),
      })),
    );

    if (deleteTaskRef.current) {
      deleteTaskRef.current.value = "";
    }
  }

  const totalCompletedTasks = tasks
    .map((tList) => tList.tasks.filter((t) => t.completed).length)
    .reduce((acc, curr) => acc + curr);

  const totalTasks = tasks
    .map((t) => t.tasks.length)
    .reduce((acc, curr) => acc + curr, 0);

  const procent =
    totalTasks === 0 ? 0 : Math.round((totalCompletedTasks * 100) / totalTasks);
  return (
    <div>
      <h2>Project Progress: {procent}%</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <input
              type="text"
              name="task"
              ref={taskNameRef}
              placeholder="New Task Title"
              className="form-control"
              style={{ width: "auto" }}
            />
            <input
              type="text"
              name="category"
              ref={categoryNameRef}
              placeholder="Category"
              className="form-control"
              style={{ width: "auto" }}
            />
            <button
              className="btn btn-primary"
              type="submit"
              style={{ width: "auto", marginRight: "5px" }}
            >
              Add Task
            </button>
            <input
              type="text"
              ref={deleteTaskRef}
              placeholder="Task title to remove"
              className="form-control"
              style={{ width: "auto" }}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={deleteTask}
              style={{ width: "auto" }}
            >
              Remove Task
            </button>
          </div>
        </form>
      </div>
      <div className="task-element">
        {tasks.map((taskGroup, categoryIndex) => (
          <ol key={categoryIndex} className="list-group">
            <h2>
              {taskGroup.category} (
              {taskGroup.tasks.length === 0
                ? 0
                : Math.round(
                    (100 * taskGroup.tasks.filter((t) => t.completed).length) /
                      taskGroup.tasks.length,
                  )}
              % completed, {taskGroup.tasks.length} tasks)
            </h2>

            {taskGroup.tasks.map((task, taskIndex) => (
              <li
                key={taskIndex}
                className={`list-group-item ${
                  task.completed ? "list-group-item-success" : ""
                }`}
                onClick={() => onClickTaskComplete(categoryIndex, taskIndex)}
              >
                {task.name}
              </li>
            ))}
          </ol>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
