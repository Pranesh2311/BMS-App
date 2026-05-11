import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { FaClipboardList, FaPlus, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import "../../styles/modules.css";

const PHASE_OPTIONS = ["Development", "Maintenance"];
const FREQUENCY_OPTIONS = ["Milestone", "Quarterly", "Monthly"];

function ProjectDetailsEdit() {

  const { id } = useParams();

  const navigate = useNavigate();

  const API = "/api/project-details";

  const [project, setProject] = useState({
    projectName: "",
    category: "",
    projectManager: "",
    clientName: "",
    projectAlternateName: "",
    projectWBS: "",
    overAllValue: ""
  });

  const [phases, setPhases] = useState([]);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await api.get(`${API}/${id}`);
      const data = res.data;

      setProject({
        projectName: data.projectName || "",
        category: data.category || "",
        projectManager: data.projectManager || "",
        clientName: data.clientName || "",
        projectAlternateName: data.projectAlternateName || "",
        projectWBS: data.projectWBS || "",
        overAllValue: data.overAllValue || ""
      });

      setPhases(data.phases || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProject = (key, value) => {
    setProject({ ...project, [key]: value });
  };

  const handlePhase = (index, key, value) => {
    const updated = [...phases];
    updated[index][key] = value;
    setPhases(updated);
  };

  const addPhase = () => {
    setPhases([
      ...phases,
      {
        phase: "",
        value: "",
        startDate: "",
        endDate: "",
        teamSize: "",
        frequency: "Milestone"
      }
    ]);
  };

  const removePhase = (index) => {
    const updated = [...phases];
    updated.splice(index, 1);
    setPhases(updated);
  };

  const handleUpdate = async () => {
    try {
      const payload = { ...project, phases: phases };
      await api.put(`${API}/${id}`, payload);
      alert("Project Updated Successfully");
      navigate("/details");
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
          <div className="module-header-icon" style={{ background: "rgba(67, 233, 123, 0.12)", color: "#43e97b" }}>
            <FaClipboardList />
          </div>
          <div>
            <h2>Edit Project Details</h2>
            <p>Update project information and phases</p>
          </div>
        </div>
      </div>

      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Project Information</div>

          {/* ROW 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Project Name</label>
              <input
                className="form-control"
                value={project.projectName}
                onChange={(e) => handleProject("projectName", e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Category</label>
              <input
                className="form-control"
                value={project.category}
                onChange={(e) => handleProject("category", e.target.value)}
                placeholder="Enter category"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Project Manager</label>
              <input
                className="form-control"
                value={project.projectManager}
                onChange={(e) => handleProject("projectManager", e.target.value)}
                placeholder="Enter manager name"
              />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Client Name</label>
              <input
                className="form-control"
                value={project.clientName}
                onChange={(e) => handleProject("clientName", e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Alternate Name</label>
              <input
                className="form-control"
                value={project.projectAlternateName}
                onChange={(e) => handleProject("projectAlternateName", e.target.value)}
                placeholder="Enter alternate name"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Project WBS</label>
              <input
                className="form-control"
                value={project.projectWBS}
                onChange={(e) => handleProject("projectWBS", e.target.value)}
                placeholder="Enter WBS code"
              />
            </div>
          </div>

          {/* ROW 3 */}
          <div className="row mb-4">
            <div className="col-md-4">
              <label className="form-label">Overall Value</label>
              <input
                className="form-control"
                value={project.overAllValue}
                onChange={(e) => handleProject("overAllValue", e.target.value)}
                placeholder="Enter overall value"
              />
            </div>
          </div>

          {/* PHASES */}
          <div className="module-section-title">Project Phases</div>

          {phases.map((p, index) => (
            <div key={index} className="phase-block">
              <div className="phase-block-header">
                <span className="phase-block-label">Phase {index + 1}</span>
                <button
                  className="btn-module-danger"
                  onClick={() => removePhase(index)}
                  style={{ padding: "5px 12px", fontSize: "12px" }}
                >
                  <FaTimes /> Remove
                </button>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Phase</label>
                  <select
                    className="form-select"
                    value={p.phase}
                    onChange={(e) => handlePhase(index, "phase", e.target.value)}
                  >
                    <option value="">Select</option>
                    {PHASE_OPTIONS.map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Value</label>
                  <input
                    className="form-control"
                    value={p.value}
                    onChange={(e) => handlePhase(index, "value", e.target.value)}
                    placeholder="Enter value"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Team Size</label>
                  <input
                    className="form-control"
                    value={p.teamSize}
                    onChange={(e) => handlePhase(index, "teamSize", e.target.value)}
                    placeholder="Enter team size"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={p.startDate}
                    onChange={(e) => handlePhase(index, "startDate", e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={p.endDate}
                    onChange={(e) => handlePhase(index, "endDate", e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Frequency</label>
                  <select
                    className="form-select"
                    value={p.frequency}
                    onChange={(e) => handlePhase(index, "frequency", e.target.value)}
                  >
                    {FREQUENCY_OPTIONS.map(o => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div className="module-btn-group">
            <button className="btn-module-primary" onClick={handleUpdate}>
              <FaCheck /> Update
            </button>
            <button className="btn-module-success" onClick={addPhase}>
              <FaPlus /> Add Phase
            </button>
            <button className="btn-module-secondary" onClick={() => navigate("/details")}>
              <FaArrowLeft /> Cancel
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ProjectDetailsEdit;