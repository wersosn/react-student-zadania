import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StudentClass } from './types/Student';

// Typy kontekstu - aby nie było oddzielnych dla add, edit itd. -> umożliwia routing
interface StudentContextType {
  studentList: StudentClass[];
  addNewStudent: (student: StudentClass) => void;
  updateStudent: (updatedStudent: StudentClass) => void;
  removeStudent: (index_nr: number) => void;
  lastIndex: number;
  student: StudentClass | null;
  setStudentForEdit: (student: StudentClass | null) => void;
}

// Domyślne wartości kontekstu
const StudentContext = createContext<StudentContextType | undefined>(undefined);

// Hook ułatwiający dostęp do kontekstu
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};

// Provider kontekstu -> komponent udostępnia kontekst 'dzieciom'
export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studentList, updateList] = useState([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowlaski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01')),
  ]);
  const [student, setStudent] = useState<StudentClass | null>(null); 
  const [lastIndex, setLastIndex] = useState<number>( // Wyliczanie kolejnego indeksu
    studentList.length ? studentList[studentList.length - 1].Index_nr : 0
  );

  const addNewStudent = (student: StudentClass) => { // Dodawanie nowego studenta do listy
    const updatedList = [...studentList, student];
    updateList(updatedList);
    setLastIndex(lastIndex + 1);
  };

  const updateStudent = (updatedStudent: StudentClass) => { // Modyfikacja danego studenta na liście
    const updatedList = studentList.map((student) =>
      student.Index_nr === updatedStudent.Index_nr ? updatedStudent : student
    );
    updateList(updatedList);
  };

  const removeStudent = (index_nr: number) => { // Usuwanie danego studenta z listy
    const updatedList = studentList.filter((student) => student.Index_nr !== index_nr);
    updateList(updatedList);
  };

  const setStudentForEdit = (student: StudentClass | null) => { // Ustawienie studenta do edycji
    setStudent(student);
  };

  return ( // Udostępnienie wartości kontekstu
    <StudentContext.Provider
      value={{
        studentList,
        addNewStudent,
        updateStudent,
        removeStudent,
        lastIndex,
        student,
        setStudentForEdit
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
