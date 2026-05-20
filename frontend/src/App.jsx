import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error('Error fetching tasks:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/tasks`, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', completed: false });
      setError('');
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
        setError('');
      } catch (err) {
        setError('Failed to delete task. Please try again.');
        console.error('Error deleting task:', err);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task._id);
    setEditedTaskData({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value, checked } = e.target;
    setEditedTaskData(prevData => ({
      ...prevData,
      [name]: name === 'completed' ? checked : value
    }));
  };

  const handleSaveEdit = async (id) => {
    if (!editedTaskData.title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, editedTaskData);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
      setEditingTask(null);
      setError('');
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const toggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      const response = await axios.put(`${API_URL}/tasks/${task._id}`, updatedTask);
      setTasks(tasks.map(t => (t._id === task._id ? response.data : t)));
      setError('');
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error toggling complete:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <main className="app-main">
        <section className="add-task-section">
          <h2>Add New Task</h2>
          <form onSubmit={handleAddTask} className="task-form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Enter task description (optional)"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              <FaPlus /> Add Task
            </button>
          </form>
        </section>

        <section className="task-list-section">
          <h2>My Tasks</h2>
          {error && <p className="error-message">{error}</p>}
          {tasks.length === 0 && !error && <p>No tasks yet. Add one above!</p>}
          <ul className="task-list">
            {tasks.map(task => (
              <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                {editingTask === task._id ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        value={editedTaskData.title}
                        onChange={handleEditInputChange}
                        className="edit-input"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        name="description"
                        value={editedTaskData.description}
                        onChange={handleEditInputChange}
                        className="edit-textarea"
                      ></textarea>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id={`completed-${task._id}`}
                        name="completed"
                        checked={editedTaskData.completed}
                        onChange={handleEditInputChange}
                      />
                      <label htmlFor={`completed-${task._id}`}>Completed</label>
                    </div>
                    <div className="task-actions edit-actions">
                      <button onClick={() => handleSaveEdit(task._id)} className="btn btn-success btn-small"><FaCheck /> Save</button>
                      <button onClick={handleCancelEdit} className="btn btn-secondary btn-small"><FaTimes /> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="task-details">
                      <h3 className="task-title">{task.title}</h3>
                      {task.description && <p className="task-description">{task.description}</p>}
                    </div>
                    <div className="task-actions">
                      <button onClick={() => toggleComplete(task)} className={`btn ${task.completed ? 'btn-warning btn-small' : 'btn-info btn-small'}`}>
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button onClick={() => handleEditTask(task)} className="btn btn-edit btn-small"><FaEdit /> Edit</button>
                      <button onClick={() => handleDeleteTask(task._id)} className="btn btn-danger btn-small"><FaTrash /> Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
