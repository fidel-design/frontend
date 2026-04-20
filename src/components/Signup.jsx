import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const data = new FormData();
      data.append("username", form.username);
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("phone", form.phone);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/signup",
        data
      );

      setSuccess(response.data.Success || "Signup successful!");

      setForm({
        username: "",
        email: "",
        password: "",
        phone: ""
      });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mt-4 justify-content-center">
      <div className="col-md-6 card shadow p-4">

        <h2 className="text-center mb-3">Sign Up</h2>

        <form onSubmit={submit}>

          {loading && <p className="text-info">Please wait...</p>}
          {success && <p className="text-success">{success}</p>}
          {error && <p className="text-danger">{error}</p>}

          <input
            name="username"
            type="text"
            placeholder="Enter Username"
            className="form-control mb-2"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="form-control mb-2"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="form-control mb-2"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            type="tel"
            placeholder="Enter Phone"
            className="form-control mb-3"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100" type="submit">
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/signin">Sign In</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;