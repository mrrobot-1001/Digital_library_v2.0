import React from 'react';

function AboutUsPage() {
  return (
    <div className="bg-white max-w-4xl mx-auto my-10 p-8 rounded-lg shadow-md animate-fade-in">
      {/* About Digital Library */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Digital Library</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          A digital library is a modern information resource that stores and provides access to digital content, such as e-books, academic papers, multimedia, and databases, accessible through electronic devices connected to the internet. These libraries offer numerous advantages, including enhanced accessibility, convenience, powerful search capabilities, preservation of rare materials, interactivity, collaboration opportunities, and cost-effectiveness. However, they also face challenges related to copyright, digital preservation, and the digital divide. In summary, digital libraries have revolutionized information access and management, becoming essential tools for students, researchers, educators, and anyone seeking knowledge in the digital age. Their role in our information landscape is expected to grow as technology continues to advance.
        </p>
      </section>

      {/* About Disha College */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Disha College</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Disha College is located in Raipur, the capital of Chhattisgarh. Managed by Disha Education Society, the college strives to offer quality education through a curriculum that aligns with Pt. Ravishankar Shukla University, Raipur (C.G). Our motto, "Learning with Conscience," emphasizes the development of conscientious, future-ready leaders who contribute meaningfully to society and the universe. The mission of Disha College is an unending commitment to nurturing harmony and co-existence as a fundamental life value.
        </p>
      </section>

      {/* Image */}
      <div className="mb-8">
        <img
          src="/images/dc.jpg"
          alt="Disha College Campus"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* About Society */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Society</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Established in 2001, Disha Education Society was founded by philanthropist Shri Surendra Jain. With a vision to offer quality education, the society has successfully launched various institutions, including Disha College, DSM, and DSME, affiliated with universities across Chhattisgarh. We are now expanding towards establishing a university, offering advanced vocational training programs, and launching impactful initiatives for student growth.
        </p>
      </section>

      {/* Contact Information */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Contact Us</h2>
        <p className="text-center text-gray-700">
          <strong>DISHA PARK CAMPUS</strong><br />
          <i className="fas fa-map-marker-alt"></i> Address: Building 1, First Floor, Ram Nagar - Kota Marg, Behind NIT and Hotel Piccadilly, Raipur - 492003<br />
          <i className="fas fa-phone"></i> Mobile No.: 0771-4349400<br />
          <i className="fas fa-envelope"></i> Email: principal.dishacollege@dishamail.com
        </p>
      </section>
    </div>
  );
}

export default AboutUsPage;
