import React, { createContext, useContext, useState, ReactNode } from 'react';
import { StudentClass } from './types/Student';

// Typy kontekstu
interface StudentContextType {
  studentList: StudentClass[];
  addNewStudent: (student: StudentClass) => void;
  updateStudent: (updatedStudent: StudentClass) => void;
  removeStudent: (index_nr: number) => void;
  lastIndex: number;
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

// Provider kontekstu
export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [studentList, updateList] = useState([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowlaski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01')),
  ]);

  const [lastIndex, setLastIndex] = useState<number>(
    studentList.length ? studentList[studentList.length - 1].Index_nr : 0
  );

  const addNewStudent = (student: StudentClass) => {
    const updatedList = [...studentList, student];
    updateList(updatedList);
    setLastIndex(lastIndex + 1);
  };

  const updateStudent = (updatedStudent: StudentClass) => {
    const updatedList = studentList.map((student) =>
      student.Index_nr === updatedStudent.Index_nr ? updatedStudent : student
    );
    updateList(updatedList);
  };

  const removeStudent = (index_nr: number) => {
    const updatedList = studentList.filter((student) => student.Index_nr !== index_nr);
    updateList(updatedList);
  };

  return (
    <StudentContext.Provider
      value={{
        studentList,
        addNewStudent,
        updateStudent,
        removeStudent,
        lastIndex,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
