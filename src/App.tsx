import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Students from './Students';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import DeleteStudent from './DeleteStudent';
import { StudentProvider } from './StudentContext';

function App() {
  return (
    <StudentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Students />} />
          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/EditStudent" element={<EditStudent />} />
        </Routes>
      </Router>
    </StudentProvider>
  );
}

export default App;
