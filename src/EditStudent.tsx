import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStudentContext } from './StudentContext';
import { StudentClass } from './types/Student';
import Students from './Students';

export default function EditStudent(): React.ReactElement {
  const navigate = useNavigate();
  const { studentList, updateStudent } = useStudentContext(); // Pobieranie danych studentów oraz funkcję aktualizacji z kontekstu
  const [searchParams] = useSearchParams(); // Hook umożliwiający pobranie parametrów z URL
  const id = parseInt(searchParams.get('id') || '0', 10);
  const studentToEdit = studentList.find((student) => student.Index_nr === id);
  const [editedStudent, setEditedStudent] = useState<StudentClass | null>(null);

  useEffect(() => { // Ustawienie studenta do edycji (w przypadku braku daty ustawi domyślną, gdyż jej brak powoduje błąd)
    if (studentToEdit) {
      setEditedStudent(
        new StudentClass(
          studentToEdit.name,
          studentToEdit.surname,
          studentToEdit.Index_nr,
          studentToEdit.dataUrodzenia instanceof Date && !isNaN(studentToEdit.dataUrodzenia.getTime())
            ? studentToEdit.dataUrodzenia
            : new Date('2000-01-01') 
        )
      );
    }
  }, [studentToEdit]);

  if (!editedStudent) {
    return <p>Student not found</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Obsługa zmian danych w formularzu
    const { name, value } = e.target;
    setEditedStudent((prev) =>
      prev
        ? new StudentClass(
          name === 'name' ? value : prev.name,
          name === 'surname' ? value : prev.surname,
          prev.Index_nr,
          name === 'dataUrodzenia' ? new Date(value) : prev.dataUrodzenia
        )
        : null
    );
  };

  const handleSubmit = () => { // Obsługa formularza - update studenta
    if (editedStudent) {
      updateStudent(editedStudent);
      navigate('/');
    }
  };

  return (
    <div>
      <Students />
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editedStudent.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={editedStudent.surname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dataUrodzenia"
            value={editedStudent.dataUrodzenia.toISOString().split('T')[0]}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>Save Changes</button>
      </form>
    </div>
  );
}
