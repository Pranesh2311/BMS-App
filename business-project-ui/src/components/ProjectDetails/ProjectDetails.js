import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaPlus, FaPen, FaTrash } from "react-icons/fa";
import "../../styles/modules.css";

const PHASE_OPTIONS = ["Development", "Maintenance"];
const FREQUENCY_OPTIONS = ["Milestone", "Quarterly", "Monthly"];

function ProjectDetails() {

  const [project, setProject] = useState({
    projectName: "",
    category: "",
    projectManager: "",
    clientName: "",
    projectAlternateName: "",
    projectWBS: "",
    overAllValue: ""
  });

  const navigate = useNavigate();

  const [phases, setPhases] = useState([
    {
      phase: "",
      value: "",
      startDate: "",
      endDate: "",
      teamSize: "",
      frequency: "Milestone"
    }
  ]);

  const [list, setList] = useState([]);

  const API = "/api/project-details";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(API);
      console.log(res.data);
      setList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= PROJECT =================

  const handleProject = (key, value) => {
    setProject({
      ...project,
      [key]: value
    });
  };

  // ================= PHASE =================

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

  // ================= SUBMIT =================

  const handleSubmit = async () => {

    const payload = {
      ...project,
      phases: phases
    };

    await api.post(API, payload);

    alert("Project Saved!");

    fetchData();
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {

    await api.delete(`${API}/${id}`);

    fetchData();
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
            <h2>Project Details</h2>
            <p>Track detailed project information, phases and timelines</p>
          </div>
        </div>
      </div>

      {/* Create Form Card */}
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
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">Phase</label>
                  <select
                    className="form-select"
                    value={p.phase}
                    onChange={(e) => handlePhase(index, "phase", e.target.value)}
                  >
                    <option value="">Select Phase</option>
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
            <button className="btn-module-primary" onClick={handleSubmit}>
              Submit Project
            </button>
            <button className="btn-module-success" onClick={addPhase}>
              <FaPlus /> Add Phase
            </button>
          </div>

        </div>
      </div>

      {/* List Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Project List</div>

          {list.length === 0 ? (
            <div className="module-empty">
              <div className="module-empty-icon">📊</div>
              <h4>No project details yet</h4>
              <p>Create your first project above</p>
            </div>
          ) : (
            <div className="module-table-wrapper">
              <table className="module-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project</th>
                    <th>Category</th>
                    <th>Manager</th>
                    <th>Client</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600, color: "#94a3b8" }}>{index + 1}</td>
                      <td style={{ fontWeight: 600 }}>{item.projectName}</td>
                      <td>{item.category}</td>
                      <td>{item.projectManager}</td>
                      <td>{item.clientName}</td>
                      <td>
                        <div className="td-actions">
                          <button
                            className="btn-module-edit"
                            onClick={() => navigate(`/details/edit/${item.id}`)}
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

export default ProjectDetails;