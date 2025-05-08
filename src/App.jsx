import { useState, useEffect } from 'react';

export default function DestinationPage() {
  const [filteredDoctors, setFilteredDoctors] = useState([]); // Initialize with an empty array
  const [filters, setFilters] = useState({ specialization: '', location: '' });
  const [page, setPage] = useState(1);
  const limit = 2;
  const [dummyDoctors, Setdummydoctor] = useState([]); // Initialize with an empty array

  useEffect(() => {
    fetch("http://localhost:5000/api/doctorlists")
      .then((res) => res.json())
      .then((data) => {
        Setdummydoctor(data);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
      });
  }, []);

  useEffect(() => {
    let filtered = dummyDoctors.filter((doc) => {
      return (
        (filters.specialization === '' || doc.specialization === filters.specialization) &&
        (filters.location === '' || doc.location.toLowerCase().includes(filters.location.toLowerCase()))
      );
    });
    setFilteredDoctors(filtered);
    setPage(1);
  }, [filters, dummyDoctors]); // Added dummyDoctors as a dependency

  const totalPages = Math.ceil(filteredDoctors.length / limit);
  const paginatedDoctors = filteredDoctors.slice((page - 1) * limit, page * limit);

  return (
    <div className="container mx-auto">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 text-center shadow">
        <h1 className="text-2xl font-bold">Apollo 24/7 - Doctor's Listing</h1>
      </header>

      {/* Filters */}
      <section className="p-4 bg-gray-100 flex flex-wrap gap-4 justify-start">
        <select
          className="p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, specialization: e.target.value })}
        >
          <option value="">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="General Physician">General Physician</option>
          <option value="Dentist">Dentist</option>
          <option value="Pediatrician">Pediatrician</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          className="p-2 border rounded"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
      </section>

      {/* Doctor Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {paginatedDoctors.length === 0 ? (
          <p className="text-gray-600">No doctors found.</p>
        ) : (
          paginatedDoctors.map((doc) => (
            <div key={doc._id} className="border rounded p-4 shadow hover:shadow-lg">
              <h3 className="text-lg font-semibold">{doc.name}</h3>
              <p className="text-gray-700">{doc.specialization}</p>
              <p className="text-gray-600">{doc.location}</p>
              <p className="text-sm text-gray-500">{doc.contact}</p>
            </div>
          ))
        )}
      </section>

      {/* Pagination */}
      <section className="flex justify-center gap-4 p-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="self-center">Page {page} of {totalPages}</span>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </section>
    </div>
  );
}
