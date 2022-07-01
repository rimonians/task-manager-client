import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useTasks = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  const fetchTasks = async (type) => {
    const res = await axios.get(`http://localhost:8080/task/all`);
    setLoading(false);
    setTasks(res.data);
  };

  // Update task
  const updateTask = async (id, status) => {
    try {
      const data = {
        status: status === "complete" ? "uncomplete" : "complete",
      };
      const res = await axios.put(`http://localhost:8080/task/${id}`, data);
      toast.success("Task successfully updated");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/task/${id}`);
      toast.success("Task successfully deleted");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    loading,
    tasks,
    fetchTasks,
    updateTask,
    deleteTask,
  };
};

export default useTasks;
