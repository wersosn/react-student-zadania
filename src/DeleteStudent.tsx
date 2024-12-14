import { useState } from 'react';
import { StudentClass } from './types/Student';
type RemoveStudentProps = {
    index_nr: number;
    removeFn: (index_nr: number) => void;
};

export default function RemoveStudent({ index_nr, removeFn }: RemoveStudentProps): React.ReactElement {
    const handleRemove = () => {
        if (window.confirm("Czy napewno chcesz usunąć tego studenta z listy?")) {
            removeFn(index_nr);
        }
    };

    return (
        <button onClick={handleRemove} style={{ marginLeft: '10px' }}>
            Delete
        </button>
    );
}