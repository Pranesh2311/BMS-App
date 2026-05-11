import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaPlus, FaPen, FaTrash } from "react-icons/fa";
import "../../styles/modules.css";

export default function EmployeePage() {

  const navigate = useNavigate();
  const API = "/api/employees";

  // FORM STATE
  const [form, setForm] = useState({
    employeeName: "",
    employeeCode: "",
    designation: "",
    mobileNumber: "",
    email: "",
    address: "",
  });

  // LIST STATE
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await api.get(API);
    setList(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post(API, form);

      alert("Employee Created Successfully");

      setForm({
        employeeName: "",
        employeeCode: "",
        designation: "",
        mobileNumber: "",
        email: "",
        address: "",
      });

      fetchEmployees();

    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await api.delete(`${API}/${id}`);
      fetchEmployees();
    }
  };

  return (
    <div className="module-page">

      {/* Page Header */}
      <div className="module-header">
        <div className="module-header-left">
          <div className="module-header-icon" style={{ background: "rgba(250, 112, 154, 0.12)", color: "#fa709a" }}>
            <FaUsers />
          </div>
          <div>
            <h2>Employees</h2>
            <p>Onboard and manage employee profiles</p>
          </div>
        </div>
      </div>

      {/* Create Form Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Create Employee</div>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Employee Name</label>
              <input className="form-control" name="employeeName"
                value={form.employeeName}
                placeholder="Full name"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Employee Code</label>
              <input className="form-control" name="employeeCode"
                value={form.employeeCode}
                placeholder="e.g. EMP001"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Designation</label>
              <input className="form-control" name="designation"
                value={form.designation}
                placeholder="e.g. Software Engineer"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Mobile Number</label>
              <input className="form-control" name="mobileNumber"
                value={form.mobileNumber}
                placeholder="Phone number"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input className="form-control" name="email"
                value={form.email}
                placeholder="email@example.com"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Address</label>
              <input className="form-control" name="address"
                value={form.address}
                placeholder="Street address"
                onChange={handleChange} />
            </div>
          </div>

          <div className="module-btn-group">
            <button className="btn-module-primary" onClick={handleSubmit}>
              <FaPlus /> Create Employee
            </button>
            <button className="btn-module-secondary" onClick={() => navigate("/employee")}>
              Cancel
            </button>
          </div>

        </div>
      </div>

      {/* List Card */}
      <div className="module-card">
        <div className="module-card-body">
          <div className="module-card-title">Employee List</div>

          {list.length === 0 ? (
            <div className="module-empty">
              <div className="module-empty-icon">👥</div>
              <h4>No employees yet</h4>
              <p>Add your first employee above</p>
            </div>
          ) : (
            <div className="module-table-wrapper">
              <table className="module-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Designation</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {list.map((emp, index) => (
                    <tr key={emp.id}>
                      <td style={{ fontWeight: 600, color: "#94a3b8" }}>{index + 1}</td>
                      <td style={{ fontWeight: 600 }}>{emp.employeeName}</td>
                      <td>
                        <span className="info-badge" style={{ fontSize: "12px", padding: "4px 10px" }}>
                          {emp.employeeCode}
                        </span>
                      </td>
                      <td>{emp.designation}</td>
                      <td>{emp.mobileNumber}</td>
                      <td>{emp.email}</td>
                      <td>
                        <div className="td-actions">
                          <button
                            className="btn-module-edit"
                            onClick={() => navigate(`/employee/edit/${emp.id}`)}
                          >
                            <FaPen /> Edit
                          </button>
                          <button
                            className="btn-module-danger"
                            onClick={() => handleDelete(emp.id)}
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