import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaPlus, FaPen, FaTrash } from "react-icons/fa";
import "../../styles/modules.css";

function BusinessVertical() {
  const [businessVertical, setBusinessVertical] = useState("");
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const API = "/api/business-verticals";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get(API);
    setList(res.data);
  };

  const handleSubmit = async () => {
    if (!businessVertical.trim()) return;

    await api.post(API, { name: businessVertical });

    setBusinessVertical("");
    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`${API}/${id}`);
    fetchData();
  };

  return (
    <div className="module-page">

      {/* Page Header */}
      <div className="module-header">
        <div className="module-header-left">
          <div className="module-header-icon" style={{ background: "rgba(102, 126, 234, 0.12)", color: "#667eea" }}>
            <FaBuilding />
          </div>
          <div>
            <h2>Business Vertical</h2>
            <p>Create and manage your business verticals</p>
          </div>
        </div>
      </div>

      {/* Create Form Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Add New Vertical</div>

          <div className="row g-3 align-items-end">
            <div className="col-md-8">
              <label className="form-label">Vertical Name</label>
              <input
                className="form-control form-control-lg"
                value={businessVertical}
                onChange={(e) => setBusinessVertical(e.target.value)}
                placeholder="Enter business vertical name"
              />
            </div>

            <div className="col-md-4">
              <button
                className="btn-module-primary w-100"
                onClick={handleSubmit}
                style={{ padding: "13px 24px" }}
              >
                <FaPlus /> Add Vertical
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Vertical List</div>

          {list.length === 0 ? (
            <div className="module-empty">
              <div className="module-empty-icon">📋</div>
              <h4>No verticals yet</h4>
              <p>Add your first business vertical above</p>
            </div>
          ) : (
            <div className="module-table-wrapper">
              <table className="module-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600, color: "#94a3b8" }}>{index + 1}</td>
                      <td style={{ fontWeight: 600 }}>{item.name}</td>
                      <td>
                        <span className={`status-badge ${item.status === "Y" ? "active" : "inactive"}`}>
                          {item.status === "Y" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="td-actions">
                          <button
                            className="btn-module-edit"
                            onClick={() => navigate(`/vertical/edit/${item.id}`)}
                          >
                            <FaPen /> Edit
                          </button>
                          <button
                            className="btn-module-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default BusinessVertical;