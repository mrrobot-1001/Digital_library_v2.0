import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    fetchBooks();
    fetchDepartments();
  }, [searchTerm, departmentFilter]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books/getBooks');
      let filteredBooks = response.data;

      if (searchTerm) {
        filteredBooks = filteredBooks.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (departmentFilter) {
        filteredBooks = filteredBooks.filter(
          (book) => book.department === departmentFilter
        );
      }

      setBooks(filteredBooks);
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

  const openBookPdf = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl);
  };

  const closeBookPdf = () => {
    setSelectedPdfUrl(null);
  };

  const summarizeDescription = async (description) => {
    try {
      const response = await axios.post('http://localhost:3001/api/summarize', { text: description });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing the description:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">All Uploaded Books</h1>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search by book name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {/* Book Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow">
            <img
              src={`http://localhost:3001/api/books/uploads/${book.bookposter}`}
              alt={book.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
              <p className="text-gray-700 mt-2">Author: {book.author}</p>
              <p className="text-gray-600 mt-2">Description: {book.description}</p>
              {summary && <p className="text-blue-600 mt-2">Summary: {summary}</p>}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => openBookPdf(book.bookpdf)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Read
              </button>
              <button
                onClick={() => summarizeDescription(book.description)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Summarize
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PDF Viewer */}
      {selectedPdfUrl && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-4xl">
            <button
              onClick={closeBookPdf}
              className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Close PDF
            </button>
            <iframe
              title="Book PDF Viewer"
              src={`http://localhost:3001/api/books/uploads/${selectedPdfUrl}`}
              className="w-full h-96"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
