import { useNavigate } from 'react-router-dom';
import { useStudentContext } from './StudentContext';
import Student from './Student';
import DeleteStudent from './DeleteStudent';

export default function Students() {
  const navigate = useNavigate();
  const { studentList, removeStudent } = useStudentContext(); // Pobranie danych z kontekstu

  return (
    <div>
      <h2>Students List</h2>
      {studentList.length > 0 ? (
        <ul>
          {studentList.map((el) => (
            <li key={el.Index_nr}>
              <Student student={el} />
              <button onClick={() => navigate(`/EditStudent?id=${el.Index_nr}`)}>Edit</button>
              <DeleteStudent index_nr={el.Index_nr} removeFn={removeStudent} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No students stored</p>
      )}
      <button onClick={() => navigate('/AddStudent')}>Add Student</button>
    </div>
  );
}
