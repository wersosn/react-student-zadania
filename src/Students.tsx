

import { useState } from 'react';
import Student from './Student';
import { StudentClass, StudentType } from './types/Student';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import userEvent from '@testing-library/user-event';

export default function Students() {
  const listTitle = 'Students list';
  const [studentList,updateList]=useState([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowlaski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01'))
  ]);
  const [showAddForm,changeValue]=useState(false);
  const [edit_student, setEditingStudent] = useState<StudentClass |null>(null); // Edycja wybranego studenta

  const addNewStudent=(student:StudentClass)=>{
    changeValue(false)
    console.log("add fn invoked")
    //studentList.push(student);
    let students=[...studentList];
    students.push(student)
    updateList(students)
  }

  const startEditing = (student: StudentClass) => {
    setEditingStudent(student);
  }

  const updateStudent = (updatedStudent: StudentClass) => {
    updateList((prev) => prev.map((student) => student.Index_nr === updatedStudent.Index_nr ? updatedStudent : student));
    console.log("Updating student:", updatedStudent);
    setEditingStudent(null);
  }

  return (
    
    <>
      {listTitle}
      {studentList.length>0 &&
      <ul>
      {studentList.map((el) => {return <li key={el.Index_nr}><Student student={el}/>  <button onClick={() => startEditing(el)}>Edit</button></li>
      })}

      </ul>}
      {studentList.length===0 && <p>No students stored</p>}
      {!showAddForm &&
      <button onClick={()=>changeValue(true)}>Add student</button>
      }
      {showAddForm && <AddStudent addFn={addNewStudent}/>}
      {edit_student && <EditStudent student={edit_student} saveFn={updateStudent} />}
    </>
  );
}