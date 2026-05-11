import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { FaBuilding, FaArrowLeft, FaCheck } from "react-icons/fa";
import "../../styles/modules.css";

function EditBusinessVertical() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Y");

  const API = "/api/business-verticals";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get(API);
    const item = res.data.find((x) => x.id == id);

    if (item) {
      setName(item.name);
      setStatus(item.status);
    }
  };

  const handleUpdate = async () => {
    await api.put(`${API}/${id}`, {
      name: name,
      status: status,
    });

    navigate("/vertical");
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
            <h2>Edit Business Vertical</h2>
            <p>Update vertical details and status</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="module-card">
            <div className="module-card-body">

              {/* Name Field */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control form-control-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter business vertical"
                />
              </div>

              {/* Status Field */}
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

              {/* Buttons */}
              <div className="module-btn-group">
                <button className="btn-module-primary" onClick={handleUpdate}>
                  <FaCheck /> Update
                </button>
                <button className="btn-module-secondary" onClick={() => navigate("/vertical")}>
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

export default EditBusinessVertical;