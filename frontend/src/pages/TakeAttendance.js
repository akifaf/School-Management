import React, { useState, useEffect, useRef } from "react";
import { axiosAttendanceInstance, axiosInstance } from "../axios/AxiosInstance";
import { toast, Toaster } from "sonner";
import flatpickr from "flatpickr";
import { studentListByClass } from "../axios/admin/AdminServers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AttendanceForm = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const datepickerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("classroom/")
      .then((response) => setClassrooms(response.data))
      .catch((error) => console.error("Error fetching classrooms:", error));
  }, []);

  useEffect(() => {
    flatpickr(datepickerRef.current, {
      mode: "single",
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
        setSelectedDate(dateStr);
      },
    });
  }, []);

  const handleFetchStudents = async () => {
    console.log(selectedClassroom);
    const responses = await dispatch(
      studentListByClass({
        class_no: selectedClassroom.class_no,
        section: selectedClassroom.section,
      })
    );
    console.log("response", responses);
    if (!responses.error) {
      setStudents(responses.payload);
      console.log(students);
    }
    // axiosAttendanceInstance
    //   .get(`${selectedClassroom.id}/${selectedDate}/`)
    //   .then((response) => {
    //     setStudents(response.data.students);
    //     console.log(response.data);
    //     const initialAttendance = response.data.students.reduce(
    //       (acc, student) => {
    //         acc[student.id] = false;
    //         return acc;
    //       },
    //       {}
    //     );
    //     setAttendance(initialAttendance);
    //   })
    //   .catch((error) => console.error("Error fetching students:", error));
  };

  const handleClassClick = (classItem) => {
    setSelectedClassroom(classItem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const attendanceData = students.map((student) => ({
      student: student.id,
      date: selectedDate,
      present: attendance[student.id],
    }));
    console.log(attendanceData);
    axiosAttendanceInstance
      .post("/take_attendance/", attendanceData)
      .then((response) => {
        console.log("Attendance saved:", response.data);
        toast.success("Attendance saved successfully");
        navigate("/view-attendance");
      })
      .catch((error) => {
        console.error("Error saving attendance:", error);
        toast.error("Error saving attendance");
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-gray-900 pb-4 font-bold">Mark Attendance</h1>
      <Toaster position="top-center" richColors />
      {students.length === 0 ? (
        <>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Classroom:
              </label>
              <select
                onChange={(e) => handleClassClick(JSON.parse(e.target.value))}
                value={JSON.stringify(selectedClassroom)}
                className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              >
                <option value="">Select a classroom</option>
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={JSON.stringify(classroom)}>
                    {classroom.class_no} {classroom.section}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date:
              </label>
              <input
                ref={datepickerRef}
                type="text"
                value={selectedDate}
                className="form-datepicker block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Select date"
                readOnly
              />
            </div>
          </div>
          <button
            onClick={handleFetchStudents}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-5"
          >
            Fetch Students
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="flex justify-between items-center mb-4 font-bold">
              <div>
                Class: {selectedClassroom.class_no} {selectedClassroom.section}
              </div>
              <div>Date: {selectedDate}</div>
            </div>

            <div className="max-w-full overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Roll Numberr
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Name
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, key) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                          {student.roll_no}
                        </h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {student.username}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <input
                          type="checkbox"
                          checked={attendance[student.id]}
                          onChange={(e) =>
                            setAttendance({
                              ...attendance,
                              [student.id]: e.target.checked,
                            })
                          }
                          className="form-checkbox h-4 w-4 text-blue-600 mx-8"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
          >
            Save Attendance
          </button>
        </form>
      )}
    </div>
  );
};

export default AttendanceForm;
