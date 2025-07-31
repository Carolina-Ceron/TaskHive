import React, { useState, useEffect } from 'react';
import TaskItem from '../components/TaskItem';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/tasks');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Could not fetch tasks. Please check if the backend server is running.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Actualizamos la lista de tareas después de eliminar
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="task-list">
            <h1>My Task Hive</h1>
            <Link to="/add">
                <button>Add New Task</button>
            </Link>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default TaskList;