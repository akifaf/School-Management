import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../../axios/AxiosInstance";
import { Toaster } from "sonner";
import StudentView from "./StudentView";

function ClassView() {
  const dispatch = useDispatch();
  const [classRooms, setClassRooms] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("classroom/")
      .then((response) => setClassRooms(response.data))
      .catch((error) => console.error("Error fetching classrooms:", error));
  }, []);

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
  };

  return (
    <>
      <h1 className="text-3xl text-gray-900 mx-3 pb-4 font-bold">
        Student Management
      </h1>
      <Toaster position="top-center" richColors />

      {!selectedClass ? (
        <div className="flex flex-wrap gap-4 justify-center">
          {classRooms.map((classItem, index) => (
            <div
              key={index}
              className="max-w-xs p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex-1 sm:flex-none sm:w-1/3 cursor-pointer"
              onClick={() => handleClassClick(classItem)}
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {`Class ${classItem.class_no}`}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {`Section ${classItem.section}`}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {`Class Teacher: ${classItem.class_teacher}`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <StudentView classRoom={selectedClass} />
      )}
    </>
  );
}

export default ClassView;
