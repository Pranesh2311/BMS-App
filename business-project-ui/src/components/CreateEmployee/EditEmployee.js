import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { FaUsers, FaArrowLeft, FaCheck } from "react-icons/fa";
import "../../styles/modules.css";

const API = "/api/employees";

export default function EditEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employeeName: "",
    employeeCode: "",
    designation: "",
    mobileNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (id) loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    const res = await api.get(`${API}/${id}`);
    setForm(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await api.put(`${API}/${id}`, form);
    navigate("/employee");
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
            <h2>Edit Employee</h2>
            <p>Update employee information</p>
          </div>
        </div>
      </div>

      <div className="module-card">
        <div className="module-card-body">

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Employee Name</label>
              <input className="form-control" name="employeeName"
                value={form.employeeName || ""}
                placeholder="Full name"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Employee Code</label>
              <input className="form-control" name="employeeCode"
                value={form.employeeCode || ""}
                placeholder="e.g. EMP001"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Designation</label>
              <input className="form-control" name="designation"
                value={form.designation || ""}
                placeholder="e.g. Software Engineer"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Mobile Number</label>
              <input className="form-control" name="mobileNumber"
                value={form.mobileNumber || ""}
                placeholder="Phone number"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Email</label>
              <input className="form-control" name="email"
                value={form.email || ""}
                placeholder="email@example.com"
                onChange={handleChange} />
            </div>

            <div className="col-md-4">
              <label className="form-label">Address</label>
              <input className="form-control" name="address"
                value={form.address || ""}
                placeholder="Street address"
                onChange={handleChange} />
            </div>
          </div>

          <div className="module-btn-group">
            <button className="btn-module-primary" onClick={handleUpdate}>
              <FaCheck /> Update
            </button>
            <button className="btn-module-secondary" onClick={() => navigate("/employee")}>
              <FaArrowLeft /> Cancel
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}