import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentAttendance } from '../../redux/AttendanceSlice';


const StudentAttendance = ({ studentId }) => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance.attendance);
  const attendanceStatus = useSelector((state) => state.attendance.status);
  const error = useSelector((state) => state.attendance.error);
  const { user } = useSelector(store => store.auth);

  useEffect(() => {
    if (user) {
        console.log(user);
      dispatch(fetchStudentAttendance(user.id));
    }
    console.log(attendance);
  }, [dispatch, user]);

  return (
    <div className="p-4">
      <h1 className="text-3xl text-gray-900 pb-4 font-bold">Student Attendance</h1>
      {attendanceStatus === 'loading' && <p>Loading...</p>}
      {attendanceStatus === 'failed' && <p>Error: {error}</p>}
      {attendanceStatus === 'succeeded' && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                    Date
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {record.date}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {/* <p className="text-black dark:text-white">
                        {record.present ? 'Present' : 'Absent'}
                      </p> */}
                      <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      record.present
                        ? 'bg-success text-success'
                        :  'bg-danger text-danger'
                    }`}
                  >
                    {record.present ? 'Present' : 'Absent'}
                  </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
