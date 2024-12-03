import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminBooks.css'; // Import custom styles if needed

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [editedBook, setEditedBook] = useState({
    isbn: '',
    title: '',
    author: '',
    description: '',
    category: '',
    department: '',
    bookposter: null,
    bookpdf: null,
  });
  const [departments, setDepartments] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [iframeVisible, setIframeVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchDepartments();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books/getBooks');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books/getDepartments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setEditedBook({
      isbn: book.isbn,
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      department: book.department,
      bookposter: null,
      bookpdf: null,
    });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  const handleEditFileChange = (event) => {
    const { name, files } = event.target;
    setEditedBook({
      ...editedBook,
      [name]: files[0],
    });
  };

  const handleEditSubmit = async (event, bookId) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('isbn', editedBook.isbn);
    formData.append('title', editedBook.title);
    formData.append('author', editedBook.author);
    formData.append('description', editedBook.description);
    formData.append('category', editedBook.category);
    formData.append('department', editedBook.department);
    formData.append('bookposter', editedBook.bookposter);
    formData.append('bookpdf', editedBook.bookpdf);

    try {
      await axios.put(`http://localhost:3001/api/books/updateBook/${bookId}`, formData);
      setEditingBook(null);
      setEditedBook({
        isbn: '',
        title: '',
        author: '',
        description: '',
        category: '',
        department: '',
        bookposter: null,
        bookpdf: null,
      });
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleEditCancel = () => {
    setEditingBook(null);
    setEditedBook({
      isbn: '',
      title: '',
      author: '',
      description: '',
      category: '',
      department: '',
      bookposter: null,
      bookpdf: null,
    });
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3001/api/books/deleteBook/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('isbn', editedBook.isbn);
    formData.append('title', editedBook.title);
    formData.append('author', editedBook.author);
    formData.append('description', editedBook.description);
    formData.append('category', editedBook.category);
    formData.append('department', editedBook.department);
    formData.append('bookposter', editedBook.bookposter);
    formData.append('bookpdf', editedBook.bookpdf);

    try {
      await axios.post('http://localhost:3001/api/books/addBook', formData);
      toggleAddForm();
      setEditedBook({
        isbn: '',
        title: '',
        author: '',
        description: '',
        category: '',
        department: '',
        bookposter: null,
        bookpdf: null,
      });
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleAddCancel = () => {
    toggleAddForm();
    setEditedBook({
      isbn: '',
      title: '',
      author: '',
      description: '',
      category: '',
      department: '',
      bookposter: null,
      bookpdf: null,
    });
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setDepartmentFilter(value);
  };

  const showIframe = (src) => {
    setSelectedPdfUrl(src);
    setIframeVisible(true);
  };

  const closePdfViewer = () => {
    setSelectedPdfUrl(null);
    setIframeVisible(false);
  };

  return (
    <div className="admin-books-container bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Book List</h1>
      <button
        className="add-book-button bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 hover:scale-105 transition-all"
        onClick={toggleAddForm}
      >
        Add Book
      </button>
      <div className="filter-container my-4">
        <label htmlFor="departmentFilter" className="font-bold mr-2">Filter by Department:</label>
        <select
          id="departmentFilter"
          name="departmentFilter"
          className="border p-2 rounded"
          value={departmentFilter}
          onChange={handleFilterChange}
        >
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {isAddFormVisible && (
        <div className="add-book-form bg-white p-6 rounded-lg shadow-lg mt-4">
          <h3 className="text-xl font-semibold mb-4">Add Book</h3>
          <form onSubmit={handleAddSubmit} encType="multipart/form-data">
            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={editedBook.isbn}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editedBook.title}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={editedBook.author}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={editedBook.description}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editedBook.category}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={editedBook.department}
              onChange={handleEditInputChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="file"
              name="bookposter"
              accept="image/*"
              onChange={handleEditFileChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="file"
              name="bookpdf"
              accept=".pdf"
              onChange={handleEditFileChange}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 hover:scale-105 transition-all"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleAddCancel}
              className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400 hover:scale-105 transition-all"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <table className="book-list-table w-full mt-8 border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4">Book ID</th>
            <th className="p-4">Book Poster</th>
            <th className="p-4">ISBN</th>
            <th className="p-4">Title</th>
            <th className="p-4">Author</th>
            <th className="p-4">Description</th>
            <th className="p-4">Category</th>
            <th className="p-4">Department</th>
            <th className="p-4">PDF</th>
            <th className="p-4">Edit</th>
            <th className="p-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {books
            .filter((book) => {
              if (!departmentFilter) {
                return true;
              }
              return book.department === departmentFilter;
            })
            .map((book) => (
              <React.Fragment key={book.id}>
                <tr className="border-b">
                  <td className="p-4">{book.id}</td>
                  <td className="p-4">
                    <img
                      src={`http://localhost:3001/api/books/uploads/${book.bookposter}`}
                      alt={book.title}
                      className="book-poster max-w-[100px] transition-transform transform hover:scale-105"
                    />
                  </td>
                  <td className="p-4">{book.isbn}</td>
                  <td className="p-4">{book.title}</td>
                  <td className="p-4">{book.author}</td>
                  <td className="p-4">{book.description}</td>
                  <td className="p-4">{book.category}</td>
                  <td className="p-4">{book.department}</td>
                  <td className="p-4">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400 transition-all"
                      onClick={() => showIframe(`http://localhost:3001/api/books/uploads/${book.bookpdf}`)}
                    >
                      View PDF
                    </button>
                  </td>
                  <td className="p-4">{book.created_at}</td>
                  <td className="p-4">
                    <button
                      className="edit-button bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400 transition-all"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      className="delete-button bg-red-500 text-white py-1 px-3 rounded hover:bg-red-400 transition-all"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {editingBook && editingBook.id === book.id && (
                  <tr key={`edit-${book.id}`}>
                    <td colSpan="12" className="p-4">
                      <form onSubmit={(event) => handleEditSubmit(event, book.id)} className="w-full">
                        <input
                          type="text"
                          name="isbn"
                          placeholder="ISBN"
                          value={editedBook.isbn}
                          onChange={handleEditInputChange}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={editedBook.title}
                          onChange={handleEditInputChange}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="text"
                          name="author"
                          placeholder="Author"
                          value={editedBook.author}
                          onChange={handleEditInputChange}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          value={editedBook.description}
                          onChange={handleEditInputChange}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="text"
                          name="category"
                          placeholder="Category"
                          value={editedBook.category}
                          onChange={handleEditInputChange}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="text"
                          name="department"
                          placeholder="Department"
                          value={editedBook.department}
                          onChange={handleEditInputChange}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="file"
                          name="bookposter"
                          accept="image/*"
                          onChange={handleEditFileChange}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <input
                          type="file"
                          name="bookpdf"
                          accept=".pdf"
                          onChange={handleEditFileChange}
                          className="w-full p-2 border rounded mb-2"
                        />
                        <button
                          type="submit"
                          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 transition-all"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={handleEditCancel}
                          className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400 transition-all"
                        >
                          Cancel
                        </button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>

      {iframeVisible && (
        <div className="iframe-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
  <div className="iframe-container relative bg-white p-6 rounded-lg shadow-lg">
    <iframe
      title="PDF Viewer"
      src={selectedPdfUrl}
      className="iframe-content"
    />
    <button
      className="close-pdf-button mt-6 w-full"
      onClick={closePdfViewer}
    >
      Close PDF
    </button>
  </div>
</div>

   
      )}
    </div>
  );
};

export default AdminBooks;
