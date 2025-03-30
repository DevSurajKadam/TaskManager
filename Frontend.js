import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/tasks";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    setTasks(response.data);
  };

  const addTask = async () => {
    await axios.post(API_URL, { title, description, status: "pending" });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <div className="my-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2">Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 my-2 flex justify-between">
            <span>{task.title} - {task.description}</span>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white p-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
