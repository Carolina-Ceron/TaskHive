
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 8080
const HOST = '127.0.0.1'

let tasks = [
    { id: 1, title: 'Supermarket', description: 'bread, jam, cheese', completed: false,createdAt: '2023-10-01' },
    { id: 2, title: 'Janes party', description: 'this is a description', completed: true, createdAt: '2023-10-02' },
];

app.use(cors());
app.use(express.json());

//GET: Obtener todas las tareas
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// GET: Obtener una tarea por ID
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});    

// POST: Crear una nueva tarea
app.post('/api/tasks', (req, res) => {
    const task = {
    id: tasks.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
    createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    res.status(201).json(task);
});

// PUT: Actualizar una tarea existente
app.put('/api/tasks/:id', (req, res) => {
    const taskToUpdate = tasks.find(t => t.id === parseInt(req.params.id)); 
    if (!taskToUpdate) return res.status(404).send('Task not found');
    taskToUpdate.title = req.body.title;
    taskToUpdate.description = req.body.description;
    taskToUpdate.completed = req.body.completed;
    taskToUpdate.date = req.body.date;
    res.json(taskToUpdate);
});

// DELETE: Eliminar una tarea
app.delete('/api/tasks/:id', (req, res) => {
const taskId = tasks.findIndex(t => t.id === parseInt(req.params.id));
if (taskId === -1) return res.status(404).send('Task not found');
tasks.splice(taskId, 1);
res.status(204).send();
});

app.listen(PORT, HOST, () => {
    console.log(`Server listening in http://${HOST}:${PORT}`);
});