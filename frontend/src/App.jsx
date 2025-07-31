import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import './App.css'; 

function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<TaskList/>}/>
            <Route path="/add" element={<TaskForm/>}/>
            <Route path="/edit/:id" element={<TaskForm/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default App;
