import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);

      const response = await axios.post(
        "http://127.0.0.1:5000/api/signin",
        data
      );

      // save user (optional)
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert(response.data.message);

      // redirect after login
      navigate("/events");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row mt-5 justify-content-center">
      <div className="col-md-5 card shadow p-4">

        <h2 className="text-center mb-3">Sign In</h2>

        <form onSubmit={submit}>

          {loading && <p className="text-info">Logging in...</p>}
          {error && <p className="text-danger">{error}</p>}

          <input
            type="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-success w-100" type="submit">
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/">Sign Up</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signin;