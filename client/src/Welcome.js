import { useEffect, useState } from "react";

function Welcome() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("❌ You are not logged in!");
      return;
    }

    fetch("http://localhost:5000/api/auth/protected", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setMessage(data.msg))
      .catch(err => setMessage("⚠️ Error: " + err.message));
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>Welcome Page</h2>
      <p>{message}</p>
    </div>
  );
}

export default Welcome;
