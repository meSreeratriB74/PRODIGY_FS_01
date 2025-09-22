import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);

    if (data.token) {
      alert("Login successful!");
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert(data.msg || "Login failed");
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "70px auto",
      padding: "30px",
      border: "1px solid hsla(0, 0%, 87%, 1.00)",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4a90e2",
      color: "#fff",
      fontSize: "16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    link: {
      display: "block",
      textAlign: "center",
      marginTop: "15px",
      color: "#4a90e2",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <br />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#44ea23ff")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
        >
          Login
        </button>
      </form>
      <Link to="/register" style={styles.link}>
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default Login;
