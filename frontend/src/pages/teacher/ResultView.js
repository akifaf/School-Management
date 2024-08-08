import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { studentListByClass } from "../../axios/admin/AdminServers";
import { axiosInstance } from "../../axios/AxiosInstance";
import { Link } from "react-router-dom";

const ViewResult = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();
  const student_list = useSelector((state) => state.student.student_list);

  useEffect(() => {
    // Fetch classrooms on component mount
    axiosInstance
      .get("classroom/")
      .then((response) => setClassrooms(response.data))
      .catch((error) => console.error("Error fetching classrooms:", error));
  }, []);

  const handleFetchStudents = () => {
    if (!selectedClassroom) {
      toast.error("Please select a classroom");
      return;
    }

    // Dispatch action to fetch students
    dispatch(
      studentListByClass({
        class_no: selectedClassroom.class_no,
        section: selectedClassroom.section,
      })
    ).then(() => {
      // Update state with the fetched student list
      setStudents(student_list);
    });
  };

  const handleClassChange = (e) => {
    const classId = parseInt(e.target.value);
    const classroom = classrooms?.find((c) => c.id === classId);
    setSelectedClassroom(classroom);
  };


  const getStudentDetails = (studentId) => {
    const student = students?.find((s) => s.id === studentId);
    return student || { roll_no: "N/A", username: "N/A" };
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-gray-900 pb-4 font-bold">Exam Result</h1>
      <Toaster position="top-center" richColors />
      {students && students.length > 0 ? (
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between items-center mb-4 font-bold">
              <div>
                Class: {selectedClassroom.class_no} {selectedClassroom.section}
              </div>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Roll Number
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, key) => {
                    const studentDetails = getStudentDetails(student.id);
                    return (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {studentDetails.roll_no}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {studentDetails.username}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <Link to={'/add-result'}
                            type="button"
                            className="text-blue-500"
                          >
                            Add result
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
       
      ) : (
        <>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Classroom:
              </label>
              <select
                onChange={handleClassChange}
                value={selectedClassroom ? selectedClassroom.id : ""}
                className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              >
                <option value="">Select a classroom</option>
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.class_no} {classroom.section}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleFetchStudents}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-5"
          >
            Fetch Students
          </button>
        </>
      )}
    </div>
  );
};

export default ViewResult;
