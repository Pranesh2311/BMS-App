import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaPlus, FaPen, FaTrash } from "react-icons/fa";
import "../../styles/modules.css";

function BusinessProject() {

  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [distribution, setDistribution] = useState({});
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();

  const API_UNIT = "/api/business-units";
  const API_PROJECT = "/api/business-projects";

  useEffect(() => {
    fetchUnits();
    fetchProjects();
  }, []);

  const fetchUnits = async () => {
    const res = await api.get(API_UNIT);
    setUnits(res.data);
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get(API_PROJECT);
      setProjects(res.data);
    } catch (err) {
      console.error("Project API Error:", err);
    }
  };

  const handleUnitChange = (unitId) => {
    if (selectedUnits.includes(unitId)) {
      setSelectedUnits(selectedUnits.filter(u => u !== unitId));
    } else {
      setSelectedUnits([...selectedUnits, unitId]);
    }
  };

  const handleDistChange = (unitId, value) => {
    setDistribution({
      ...distribution,
      [unitId]: Number(value)
    });
  };

  const handleSubmit = async () => {

    const payload = {
      name: projectName,
      units: selectedUnits.map(id => ({
        unitId: id,
        percentage: distribution[id] || 0
      }))
    };

    await api.post(API_PROJECT, payload);

    alert("Project Created!");

    // reset
    setProjectName("");
    setSelectedUnits([]);
    setDistribution({});

    fetchProjects();
  };

  const handleDelete = async (id) => {
    await api.delete(`${API_PROJECT}/${id}`);
    fetchProjects();
  };

  return (
    <div className="module-page">

      {/* Page Header */}
      <div className="module-header">
        <div className="module-header-left">
          <div className="module-header-icon" style={{ background: "rgba(79, 172, 254, 0.12)", color: "#4facfe" }}>
            <FaProjectDiagram />
          </div>
          <div>
            <h2>Business Project</h2>
            <p>Create projects and assign unit distributions</p>
          </div>
        </div>
      </div>

      {/* Create Form Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Create New Project</div>

          {/* Project Name */}
          <div className="mb-3">
            <label className="form-label">Project Name</label>
            <input
              className="form-control"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>

          {/* Units Selection */}
          <div className="mb-3">
            <label className="form-label">Business Units</label>
            <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: "12px", padding: "12px" }}>
              {units.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>No units available</p>
              ) : (
                units.map(u => (
                  <div key={u.id} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedUnits.includes(u.id)}
                      onChange={() => handleUnitChange(u.id)}
                    />
                    <label className="form-check-label">
                      {u.name}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Distribution */}
          {selectedUnits.length > 0 && (
            <div className="mb-3">
              <label className="form-label">Distribution (%)</label>
              {selectedUnits.map(id => (
                <div key={id} className="distribution-row">
                  <span className="info-badge">
                    {units.find(u => u.id === id)?.name}
                  </span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="%"
                    value={distribution[id] || ""}
                    onChange={(e) => handleDistChange(id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="module-btn-group" style={{ borderTop: "none", paddingTop: 0, marginTop: 16 }}>
            <button className="btn-module-primary" onClick={handleSubmit}>
              <FaPlus /> Create Project
            </button>
          </div>
        </div>
      </div>

      {/* List Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Project List</div>

          {projects.length === 0 ? (
            <div className="module-empty">
              <div className="module-empty-icon">🚀</div>
              <h4>No projects yet</h4>
              <p>Create your first business project above</p>
            </div>
          ) : (
            <div className="module-table-wrapper">
              <table className="module-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Units</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.map((p, index) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600, color: "#94a3b8" }}>{index + 1}</td>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td>
                        {p.units?.map((u, i) => (
                          <span key={i} className="info-badge" style={{ marginRight: 6, marginBottom: 4, fontSize: "12px", padding: "4px 10px" }}>
                            {u.unitName} ({u.percentage}%)
                          </span>
                        ))}
                      </td>
                      <td>
                        <div className="td-actions">
                          <button
                            className="btn-module-edit"
                            onClick={() => navigate(`/project/edit/${p.id}`)}
                          >
                            <FaPen /> Edit
                          </button>
                          <button
                            className="btn-module-danger"
                            onClick={() => handleDelete(p.id)}
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

export default BusinessProject;