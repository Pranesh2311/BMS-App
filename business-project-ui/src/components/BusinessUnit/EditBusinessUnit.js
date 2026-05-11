import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { FaLayerGroup, FaArrowLeft, FaCheck } from "react-icons/fa";
import "../../styles/modules.css";

function EditBusinessUnit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [verticals, setVerticals] = useState([]);
  const [verticalId, setVerticalId] = useState("");
  const [unitName, setUnitName] = useState("");
  const [status, setStatus] = useState("Y");

  const API_UNIT = "/api/business-units";
  const API_VERTICAL = "/api/business-verticals";

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      // fetch verticals
      const vRes = await api.get(API_VERTICAL);
      setVerticals(vRes.data);

      // fetch units
      const uRes = await api.get(API_UNIT);
      const item = uRes.data.find(x => x.id == id);

      if (item) {
        setUnitName(item.name);
        setStatus(item.status);
        setVerticalId(item.businessVerticalId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!unitName.trim() || !verticalId) return;

    await api.put(`${API_UNIT}/${id}`, {
      name: unitName,
      status: status,
      businessVerticalId: Number(verticalId),
    });

    navigate("/unit");
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
            <h2>Edit Business Unit</h2>
            <p>Update unit details and status</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="module-card">
            <div className="module-card-body">

              <div className="mb-3">
                <label className="form-label">Business Vertical</label>
                <select
                  className="form-select"
                  value={verticalId}
                  onChange={(e) => setVerticalId(e.target.value)}
                >
                  <option value="">Select Vertical</option>
                  {verticals.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Business Unit</label>
                <input
                  className="form-control"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                  placeholder="Enter business unit name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Y">Active</option>
                  <option value="N">Inactive</option>
                </select>
              </div>

              <div className="module-btn-group">
                <button className="btn-module-primary" onClick={handleUpdate}>
                  <FaCheck /> Update
                </button>
                <button className="btn-module-secondary" onClick={() => navigate("/unit")}>
                  <FaArrowLeft /> Back
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default EditBusinessUnit;