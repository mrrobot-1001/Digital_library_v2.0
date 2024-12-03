import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Users, FileText, Info, LogOut } from "lucide-react"; // Importing Lucide icons
import axios from "axios";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("teachers");
  const [teachers, setTeachers] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState({
    name: '',
    contactNumber: '',
    department: '',
    username: '',
    password: '',
    profilePhoto: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, [departmentFilter]);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/teachers/getTeachers');
      setTeachers(response.data);
      filterTeachersByDepartment();
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTeachersByDepartment = () => {
    if (!departmentFilter) {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter((teacher) => teacher.department === departmentFilter);
      setFilteredTeachers(filtered);
    }
  };

  const handleAddClick = () => {
    setIsAddFormVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddFormVisible(false);
    clearEditedTeacher();
  };

  const clearEditedTeacher = () => {
    setEditedTeacher({
      name: '',
      contactNumber: '',
      department: '',
      username: '',
      password: '',
      profilePhoto: null,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTeacher({
      ...editedTeacher,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setEditedTeacher({
      ...editedTeacher,
      [name]: files[0],
    });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', editedTeacher.name);
    formData.append('contactNumber', editedTeacher.contactNumber);
    formData.append('department', editedTeacher.department);
    formData.append('username', editedTeacher.username);
    formData.append('password', editedTeacher.password);
    formData.append('profilePhoto', editedTeacher.profilePhoto);

    try {
      await axios.post('http://localhost:3001/api/teachers/addTeacher', formData);
      fetchTeachers();
      setIsAddFormVisible(false);
      clearEditedTeacher();
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  const handleDeleteClick = async (teacherId) => {
    try {
      await axios.delete(`http://localhost:3001/api/teachers/deleteTeacher/${teacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const pages = {
    teachers: (
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Teachers</h2>
        <button onClick={handleAddClick} className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md">
          Add Teacher
        </button>

        {isAddFormVisible && (
          <div className="add-teacher-form">
            <h3>Add Teacher</h3>
            <form onSubmit={handleAddSubmit} encType="multipart/form-data">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editedTeacher.name}
                onChange={handleInputChange}
                className="mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={editedTeacher.contactNumber}
                onChange={handleInputChange}
                className="mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={editedTeacher.department}
                onChange={handleInputChange}
                className="mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={editedTeacher.username}
                onChange={handleInputChange}
                className="mb-2 p-2 border rounded"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={editedTeacher.password}
                onChange={handleInputChange}
                className="mb-2 p-2 border rounded"
              />
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="mb-2"
              />
              <div className="flex space-x-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                <button type="button" onClick={handleAddCancel} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="teacher-list-table w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Teacher ID</th>
                <th className="px-4 py-2">Profile Photo</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Contact Number</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td className="px-4 py-2">{teacher.id}</td>
                  <td className="px-4 py-2">
                    {teacher.profilePhoto && (
                      <img
                        src={`http://localhost:3001/uploads/${teacher.profilePhoto}`}
                        alt={teacher.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">{teacher.name}</td>
                  <td className="px-4 py-2">{teacher.contact_number}</td>
                  <td className="px-4 py-2">{teacher.department}</td>
                  <td className="px-4 py-2">{teacher.username}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteClick(teacher.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    ),
    // Other pages like Books, Notes, etc., can be added here
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <motion.div
        className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 text-2xl font-bold tracking-wide text-center text-white">
          Admin Dashboard
        </div>
        <div className="flex-1 space-y-2">
          <button
            onClick={() => setActivePage("teachers")}
            className={`w-full text-left px-6 py-4 text-lg font-medium hover:bg-gray-700 transition duration-300 rounded-md transform hover:scale-105 ${
              activePage === "teachers" ? "bg-gray-800" : ""
            }`}
          >
            <Users className="inline mr-4" /> Teachers
          </button>
          <button
            onClick={() => setActivePage("books")}
            className={`w-full text-left px-6 py-4 text-lg font-medium hover:bg-gray-700 transition duration-300 rounded-md transform hover:scale-105 ${
              activePage === "books" ? "bg-gray-800" : ""
            }`}
          >
            <Book className="inline mr-4" /> Books
          </button>
          <button
            onClick={() => setActivePage("notes")}
            className={`w-full text-left px-6 py-4 text-lg font-medium hover:bg-gray-700 transition duration-300 rounded-md transform hover:scale-105 ${
              activePage === "notes" ? "bg-gray-800" : ""
            }`}
          >
            <FileText className="inline mr-4" /> Notes
          </button>
          <button
            onClick={() => setActivePage("about")}
            className={`w-full text-left px-6 py-4 text-lg font-medium hover:bg-gray-700 transition duration-300 rounded-md transform hover:scale-105 ${
              activePage === "about" ? "bg-gray-800" : ""
            }`}
          >
            <Info className="inline mr-4" /> About
          </button>
          <button
            onClick={() => console.log("Logging out...")}
            className="w-full text-left px-6 py-4 text-lg font-medium hover:bg-gray-700 transition duration-300 rounded-md transform hover:scale-105"
          >
            <LogOut className="inline mr-4" /> Log Out
          </button>
        </div>
      </motion.div>
      <div className="flex-1 p-6">
        <AnimatePresence>
          <motion.div
            key={activePage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {pages[activePage]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
