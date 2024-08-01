// ResultForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosAttendanceInstance, axiosInstance } from '../../axios/AxiosInstance';

const ResultForm = () => {
    const [students, setStudents] = useState([]);
    const [syllabus, setSyllabus] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedSyllabus, setSelectedSyllabus] = useState('');
    const [assignmentMark, setAssignmentMark] = useState('');
    const [examMark, setExamMark] = useState('');

    useEffect(() => {
        axiosInstance.get('student/')
            .then(response => setStudents(response.data))
            .catch(error => console.error('Error fetching students:', error));

        axiosAttendanceInstance.get('syllabus/')
            .then(response => setSyllabus(response.data))
            .catch(error => console.error('Error fetching syllabus:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const resultData = {
            student: selectedStudent,
            syllabus: selectedSyllabus,
            assignment_mark: assignmentMark,
            exam_mark: examMark
        };

        axios.post('/api/results/', resultData)
            .then(response => console.log('Result added:', response.data))
            .catch(error => console.error('Error adding result:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Student:</label>
                <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)}>
                    <option value="">Select a student</option>
                    {students.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.username}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Syllabus:</label>
                <select value={selectedSyllabus} onChange={e => setSelectedSyllabus(e.target.value)}>
                    <option value="">Select a syllabus</option>
                    {syllabus.map(syl => (
                        <option key={syl.id} value={syl.id}>
                            {syl.classroom.class_no} {syl.classroom.section} - {syl.subject.subject}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Assignment Mark:</label>
                <input
                    type="number"
                    value={assignmentMark}
                    onChange={e => setAssignmentMark(e.target.value)}
                />
            </div>
            <div>
                <label>Exam Mark:</label>
                <input
                    type="number"
                    value={examMark}
                    onChange={e => setExamMark(e.target.value)}
                />
            </div>
            <button type="submit">Add Result</button>
        </form>
    );
};

export default ResultForm;
