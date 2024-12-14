import { useState, useEffect } from 'react';
import { StudentClass } from './types/Student';
import { HashRouter as Router, Route, NavLink, useNavigate, useParams } from 'react-router';
type StudentPropsType = {
    student: StudentClass;
    saveFn: (updatedStudent: StudentClass) => void;
}

export default function EditStudent(props:StudentPropsType) : React.ReactElement{ 
    const [edited_student, changeStudentData] = useState({ ...props.student.getAsType() });
    const { indexNr } = useParams();
    
    const changeValue = (e:React.FormEvent<HTMLInputElement>):void =>{ 
        const { name, value } = e.currentTarget;
        changeStudentData((prev) => ({
            ...prev, [name]: name === "index_nr" ? +value : value
        }));
    };

    const saveChanges = (): void => {
        const updatedStudent = new StudentClass(
            edited_student.name, edited_student.surname, edited_student.index_nr, edited_student.dataUrodzenia
        );
        props.saveFn(updatedStudent);
        console.log(updatedStudent);
    };

    return (
        <div><br></br>
            Name: <input type='text' name="name" value={edited_student.name} onChange={(e)=>changeValue(e)}/><br></br>
            Surname: <input type='text' name="surname" value={edited_student.surname} onChange={(e)=>changeValue(e)}/><br></br>
            Date of birth: <input type='date' name="dataUrodzenia" value={edited_student.dataUrodzenia.toISOString().split("T")[0]} onChange={(e) =>
                changeStudentData((prev) => ({ ...prev, dataUrodzenia: new Date(e.currentTarget.value),}))}/>
        <button onClick={()=>saveChanges()}>Zapisz zmiany</button>
        </div>
    );
}