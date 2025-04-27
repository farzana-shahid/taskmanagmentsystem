// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Create Wireframe', status: 'new' },
    { id: 2, title: 'Build Login Page', status: 'inprogress' },
    { id: 3, title: 'Publish Website', status: 'done' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const statuses = ['new', 'inprogress', 'done'];

  const getTitle = (status) => {
    switch (status) {
      case 'new':
        return 'New Work';
      case 'inprogress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return '';
    }
  };

  const handleAddTask = (status) => {
    if (newTaskTitle.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status,
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, title) => {
    setEditingTaskId(id);
    setEditedTitle(title);
  };

  const handleSaveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editedTitle } : task
      )
    );
    setEditingTaskId(null);
    setEditedTitle('');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Task Management Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <div key={status} className="bg-white rounded-3xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-center mb-4">{getTitle(status)}</h2>

            {/* Add New Task Input */}
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="New Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 p-2 rounded-l-lg border-t border-b border-l focus:outline-none"
              />
              <button
                onClick={() => handleAddTask(status)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-lg"
              >
                Add
              </button>
            </div>

            <div className="space-y-4">
              {tasks.filter((task) => task.status === status).map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
                >
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="flex-1 p-2 mr-2 border rounded"
                    />
                  ) : (
                    <span className="flex-1">{task.title}</span>
                  )}
                  {editingTaskId === task.id ? (
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditTask(task.id, task.title)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Performance / Task Count */}
            <div className="mt-6 text-center text-gray-500">
              Total: {tasks.filter((task) => task.status === status).length} tasks
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

/* backend/
│
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── authMiddleware.js
├── .env
├── server.js
*/ 