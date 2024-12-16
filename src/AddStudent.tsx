import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentContext } from './StudentContext';
import { StudentClass } from './types/Student';

export default function AddStudent() {
  const navigate = useNavigate();
  const { addNewStudent, lastIndex } = useStudentContext(); // Pobranie funkcji z kontekstu

  const [newStudent, setNewStudent] = useState({
    name: '',
    surname: '',
    dataUrodzenia: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const student = new StudentClass(
      newStudent.name,
      newStudent.surname,
      lastIndex + 1,
      new Date(newStudent.dataUrodzenia)
    );
    addNewStudent(student); // Wywołanie funkcji z kontekstu
    navigate('/'); // Powrót do listy studentów
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={newStudent.surname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dataUrodzenia"
            value={newStudent.dataUrodzenia}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Add Student</button>
      </form>
    </div>
  );
}
