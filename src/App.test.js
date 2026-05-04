import React, { useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const response = await fetch(
      "http://127.0.0.1:5000/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    if (data.user_id) {

      localStorage.setItem(
        "user_id",
        data.user_id
      );

    }

  };

  return (

    <div
      style={{
        padding: "30px",
        backgroundColor: "#e6ffe6",
        minHeight: "100vh"
      }}
    >

      <h1>StockTrack Inventory</h1>

      <h2>Login</h2>

      <div style={{ marginBottom: "10px" }}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

      </div>

      <div style={{ marginBottom: "10px" }}>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

      </div>

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}

export default App;
