import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratings, setRatings] = useState({});
  const itemsPerPage = 5;

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(data);

    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRatings(savedRatings);
  }, []);

  const handleRating = (page, index, rating) => {
    const updatedRatings = {
      ...ratings,
      [page]: {
        ...ratings[page],
        [index]: rating,
      },
    };

    setRatings(updatedRatings);
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));
  };

  const displayedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-dashboard">
      <div className="applications-container">
        <h2 className="dashboard-title">PREJETE VLOGE</h2>
          {displayedApplications.map((app, index) => (
          <div key={index} className="application-card">
                  <div>
                    <div className="application-details">
                        <div><p className="detail-title">Ime:</p><p> {app.ime}</p></div>
                        <div><p className="detail-title">Priimek:</p><p> {app.priimek}</p></div>
                        <div><p className="detail-title">Naslov:</p><p> {app.email}</p></div>
                    </div>
                    <hr className="divider" />
                    <div className="rating-section">
                        <p className="rating-title">Oceni vlogo:</p>
                          <div className="stars-container">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                              key={star}  
                              className={`star ${ratings[currentPage]?.[index] >= star ? "gold" : "gray"}`}
                              onClick={() => handleRating(currentPage, index, star)}>    
                            ★
                            </span>
                            ))}
                          </div>
                    </div>
                  </div>
                  <div>
                    <div><p className="detail-title">Opis:</p><p> {app.cv}</p></div>
                  </div>
            
          </div>
            ))}
      </div>
      <div className="pagination-container">
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(applications.length / itemsPerPage) },
            (_, i) => (
              <li key={i}>
                <button
                  className={`pagination-button ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
  
};

export default AdminDashboard;
