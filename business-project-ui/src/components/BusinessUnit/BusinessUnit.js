import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaLayerGroup, FaPlus, FaPen, FaTrash } from "react-icons/fa";
import "../../styles/modules.css";

function BusinessUnit() {
  const [verticals, setVerticals] = useState([]);
  const [verticalId, setVerticalId] = useState("");
  const [unitName, setUnitName] = useState("");
  const [list, setList] = useState([]);

  const navigate = useNavigate();

  const API_UNIT = "/api/business-units";
  const API_VERTICAL = "/api/business-verticals";

  useEffect(() => {
    fetchVerticals();
    fetchUnits();
  }, []);

  const fetchVerticals = async () => {
    const res = await api.get(API_VERTICAL);
    setVerticals(res.data);
  };

  const fetchUnits = async () => {
    const res = await api.get(API_UNIT);
    setList(res.data);
  };

  const handleSubmit = async () => {
    if (!verticalId || !unitName.trim()) return;

    await api.post(API_UNIT, {
      name: unitName,
      businessVerticalId: verticalId,
    });

    setUnitName("");
    setVerticalId("");
    fetchUnits();
  };

  const handleDelete = async (id) => {
    await api.delete(`${API_UNIT}/${id}`);
    fetchUnits();
  };

  return (
    <div className="module-page">

      {/* Page Header */}
      <div className="module-header">
        <div className="module-header-left">
          <div className="module-header-icon" style={{ background: "rgba(245, 87, 108, 0.12)", color: "#f5576c" }}>
            <FaLayerGroup />
          </div>
          <div>
            <h2>Business Unit</h2>
            <p>Create and manage units under each vertical</p>
          </div>
        </div>
      </div>

      {/* Create Form Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Create New Unit</div>

          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label">Business Vertical</label>
              <select
                className="form-select"
                value={verticalId}
                onChange={(e) => setVerticalId(e.target.value)}
              >
                <option value="">Select Business Vertical</option>
                {verticals.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">Unit Name</label>
              <input
                className="form-control"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="Enter business unit"
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn-module-primary w-100"
                onClick={handleSubmit}
              >
                <FaPlus /> Add Unit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Unit List</div>

          {list.length === 0 ? (
            <div className="module-empty">
              <div className="module-empty-icon">📦</div>
              <h4>No units yet</h4>
              <p>Add your first business unit above</p>
            </div>
          ) : (
            <div className="module-table-wrapper">
              <table className="module-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vertical</th>
                    <th>Unit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600, color: "#94a3b8" }}>{index + 1}</td>
                      <td>{item.verticalName}</td>
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
                            onClick={() => navigate(`/unit/edit/${item.id}`)}
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

export default BusinessUnit;