import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const TEST_USERNAME = "admin";
  const TEST_PASSWORD = "geslo";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      setError("Vsa polja morajo biti izpolnjena!");
      return;
    }

    if (
      credentials.username === TEST_USERNAME &&
      credentials.password === TEST_PASSWORD
    ) {
      // Shrani v lokalno shrambo in preusmeri na /admin
      localStorage.setItem("jeAdmin", true);
      localStorage.setItem("loginTime", new Date().getTime());
      navigate("/admin");
    } else {
      // Prikaže napako, če podatki niso pravilni
      setError("Napačno uporabniško ime ali geslo!");
    }
  };

  return (
    <div className="App">
      <div className='form-container'>
        <h2>Prijava za administratorje</h2>
        <p>Vpišite vaše vporabniško ime in geslo.</p>
        <input
          type="text"
          name="username"
          placeholder="Uporabniško ime"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Geslo"
          value={credentials.password}
          onChange={handleChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin}>Prijavi se</button>
      </div>
    </div>
  );
};

export default AdminLogin;
