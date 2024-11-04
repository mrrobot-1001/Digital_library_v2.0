import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FileText, Video, Download, X } from 'lucide-react'; // Lucide React Icons
import { motion } from 'framer-motion'; // Framer Motion for animations

const Contents = () => {
  const [contentList, setContentList] = useState([]);
  const [filters, setFilters] = useState({
    departmentFilter: '',
    teacherNameFilter: '',
    classNameFilter: '',
    materialTypeFilter: '',
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');

  // Fetch content data
  const fetchContent = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/content/getContentWithTeacherNames', {
        params: filters,
      });
      setContentList(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  // Fetch content data on filter change
  useEffect(() => {
    fetchContent();
  }, [filters]);

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value,
    });
  };

  // Handle view PDF
  const handleViewPdf = (pdfUrl) => {
    setPdfUrl(pdfUrl);
  };

  // Handle close PDF viewer
  const handleClosePdfViewer = () => {
    setPdfUrl(null);
  };

  // Handle open video modal
  const openVideoModal = (url) => {
    setVideoUrl(url);
  };

  // Handle close video modal
  const closeVideoModal = () => {
    setVideoUrl('');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <motion.h1
        className="text-4xl font-semibold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Content Library
      </motion.h1>

      {/* Filters Section */}
      <div className="flex flex-wrap justify-center space-x-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="teacherNameFilter" className="text-sm mb-1">
            Teacher Name
          </label>
          <select
            id="teacherNameFilter"
            value={filters.teacherNameFilter}
            onChange={(e) => handleFilterChange('teacherNameFilter', e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Teachers</option>
            {Array.from(new Set(contentList.map((content) => content.teacher_name))).map(
              (teacherName) => (
                <option key={teacherName} value={teacherName}>
                  {teacherName}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="classNameFilter" className="text-sm mb-1">
            Class Name
          </label>
          <select
            id="classNameFilter"
            value={filters.classNameFilter}
            onChange={(e) => handleFilterChange('classNameFilter', e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Classes</option>
            {Array.from(new Set(contentList.map((content) => content.class_name))).map(
              (className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="materialTypeFilter" className="text-sm mb-1">
            Material Type
          </label>
          <select
            id="materialTypeFilter"
            value={filters.materialTypeFilter}
            onChange={(e) => handleFilterChange('materialTypeFilter', e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Types</option>
            <option value="notes">Notes</option>
            <option value="videos">Videos</option>
            <option value="ppt">PPT</option>
          </select>
        </div>
      </div>

      {/* Content Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {contentList.map((content) => (
          <motion.div
            key={content.id}
            className="bg-white p-4 rounded shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <p className="font-semibold text-lg mb-2">{content.teacher_name}</p>
            <p className="text-sm text-gray-600">Class: {content.class_name}</p>
            <p className="text-sm text-gray-600">Subject: {content.subject}</p>
            <p className="text-sm text-gray-600">Material Type: {content.material_type}</p>

            <div className="flex justify-center items-center my-4">
              {content.material_type === 'notes' && (
                <button
                  className="flex items-center justify-center text-blue-500"
                  onClick={() => handleViewPdf(`http://localhost:3001/api/content/getPdf/${content.study_material}`)}
                >
                  <FileText className="mr-2" /> View PDF
                </button>
              )}
              {content.material_type === 'videos' && (
                <button
                  className="flex items-center text-blue-500"
                  onClick={() => openVideoModal(`http://localhost:3001/api/content/getVideo/${content.study_material}`)}
                >
                  <Video className="mr-2" /> View Video
                </button>
              )}
              {content.material_type === 'ppt' && (
                <a
                  className="flex items-center text-blue-500"
                  href={`http://localhost:3001/api/content/getPpt/${content.study_material}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2" /> Download PPT
                </a>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Uploaded: {moment(content.uploaded_at).format('MMMM DD, YYYY')}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* PDF Viewer Modal */}
      {pdfUrl && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-6 rounded shadow-lg max-w-3xl w-full relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={handleClosePdfViewer}
            >
              <X size={24} />
            </button>
            <iframe src={pdfUrl} title="PDF Viewer" width="100%" height="500px"></iframe>
          </motion.div>
        </motion.div>
      )}

      {/* Video Modal */}
      {videoUrl && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-6 rounded shadow-lg max-w-3xl w-full relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={closeVideoModal}
            >
              <X size={24} />
            </button>
            <video controls src={videoUrl} width="100%" className="rounded"></video>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Contents;
