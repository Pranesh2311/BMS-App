import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaArrowLeft, FaCheck } from "react-icons/fa";
import "../../styles/modules.css";

function EditBusinessProject() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [distribution, setDistribution] = useState({});

  const API_UNIT = "/api/business-units";
  const API_PROJECT = "/api/business-projects";

  useEffect(() => {
    fetchUnits();
    fetchProject();
  }, []);

  const fetchUnits = async () => {
    try {
      const res = await api.get(API_UNIT);
      setUnits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProject = async () => {
    try {
      const res = await api.get(`${API_PROJECT}/${id}`);

      const project = res.data;

      setProjectName(project.name);

      const unitIds = project.units.map(u => u.unitId);
      setSelectedUnits(unitIds);

      const dist = {};
      project.units.forEach(u => {
        dist[u.unitId] = u.percentage;
      });
      setDistribution(dist);

    } catch (err) {
      console.error(err);
    }
  };

  const handleUnitChange = (unitId) => {
    if (selectedUnits.includes(unitId)) {
      const updated = selectedUnits.filter(u => u !== unitId);
      setSelectedUnits(updated);
      const newDist = { ...distribution };
      delete newDist[unitId];
      setDistribution(newDist);
    } else {
      setSelectedUnits([...selectedUnits, unitId]);
      setDistribution({ ...distribution, [unitId]: 0 });
    }
  };

  const handleDistChange = (unitId, value) => {
    setDistribution({
      ...distribution,
      [unitId]: Number(value)
    });
  };

  const handleUpdate = async () => {
    const payload = {
      name: projectName,
      units: selectedUnits.map(id => ({
        unitId: id,
        percentage: distribution[id] || 0
      }))
    };

    try {
      await api.put(`${API_PROJECT}/${id}`, payload);
      alert("Project Updated Successfully!");
      navigate("/project");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
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
            <h2>Edit Business Project</h2>
            <p>Update project details and unit distribution</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="module-card">
            <div className="module-card-body">

              {/* Project Name */}
              <div className="mb-3">
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name"
                />
              </div>

              {/* Unit Selection */}
              <div className="mb-3">
                <label className="form-label">Business Units</label>
                <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: "12px", padding: "12px" }}>
                  {units.map(u => (
                    <div key={u.id} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedUnits.includes(u.id)}
                        onChange={() => handleUnitChange(u.id)}
                      />
                      <label className="form-check-label">{u.name}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribution */}
              {selectedUnits.length > 0 && (
                <div className="mb-4">
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

              {/* Buttons */}
              <div className="module-btn-group">
                <button className="btn-module-primary" onClick={handleUpdate}>
                  <FaCheck /> Update
                </button>
                <button className="btn-module-secondary" onClick={() => navigate("/project")}>
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

export default EditBusinessProject;