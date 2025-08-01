import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const TaskForm = () => {
    const { id } = useParams(); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:8080/api/tasks/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title);
                    setDescription(data.description);
                    setCompleted(data.completed);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            completed, 
            createdAt: new Date().toISOString()
        };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8080/api/tasks/${id}` : 'http://localhost:8080/api/tasks';

        try {
            const response = await fetch(url, {
                method, headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            navigate('/');
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <div className="task-form">
            <div className="task-form-header">
            <Link to="/">
                <button>Go back</button>
            </Link>
            </div>
            <div className="task-form-container">
                <h1>Create New Task</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <label htmlFor="completed">Completed:</label>
                        <input type="checkbox" id="completed" checked={completed} onChange={(e) => setCompleted(e.target.checked)}/>
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;