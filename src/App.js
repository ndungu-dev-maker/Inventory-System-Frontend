import React, { useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [minQuantity, setMinQuantity] = useState("");

  const [products, setProducts] = useState([]);

  const [selectedProductId,
  setSelectedProductId] = useState("");

  const [newQuantity,
  setNewQuantity] = useState("");

  // LOGIN FUNCTION

  const handleLogin = async () => {

    const response = await fetch(
      "https://inventory-system-backend-kqu6.onrender.com/login",
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

      setLoggedIn(true);

      fetchProducts();

    }

  };

  // REGISTER FUNCTION

  const handleRegister = async () => {

    const response = await fetch(
      "https://inventory-system-backend-kqu6.onrender.com/register",
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

    setIsRegistering(false);

  };

  // FETCH PRODUCTS

  const fetchProducts = async () => {

    const user_id =
      localStorage.getItem("user_id");

    const response = await fetch(
      `https://inventory-system-backend-kqu6.onrender.com/products/${user_id}`
    );

    const data = await response.json();

    setProducts(data);

  };

  // ADD PRODUCT

  const handleAddProduct = async () => {

    const user_id =
      localStorage.getItem("user_id");

    const response = await fetch(
      "https://inventory-system-backend-kqu6.onrender.com/add-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          quantity: parseInt(quantity),
          min_quantity: parseInt(minQuantity),
          user_id
        })
      }
    );

    const data = await response.json();

    alert(data.message);

    fetchProducts();

  };

  // UPDATE EXACT STOCK

  const handleExactUpdate =
  async () => {

    if (!selectedProductId ||
        !newQuantity) {

      alert(
        "Select product and enter quantity"
      );

      return;
    }

    await fetch(
      `https://inventory-system-backend-kqu6.onrender.com/update-product/${selectedProductId}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
          "application/json"
        },

        body: JSON.stringify({
          quantity: parseInt(newQuantity)
        })
      }
    );

    alert("Stock updated");

    fetchProducts();

  };

  // DELETE PRODUCT

  const handleDeleteProduct =
  async (id) => {

    await fetch(
      `https://inventory-system-backend-kqu6.onrender.com/delete-product/${id}`,
      {
        method: "DELETE"
      }
    );

    fetchProducts();

  };

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("user_id");

    setLoggedIn(false);

  };

  // ABOUT PAGE

  if (showAbout) {

    return (

      <div
        style={{
          padding: "30px",
          backgroundColor: "#e6ffe6",
          minHeight: "100vh",
          textAlign: "center"
        }}
      >

        <h1>About StockTrack</h1>

        <h3>Developed by:</h3>

        <h2>
          Israel Ndung'u
        </h2>

        <img
          src="/myphoto.jpg"
          alt="Developer"
          style={{
            width: "200px",
            borderRadius: "10px",
            marginTop: "20px"
          }}
        />

        <br /><br />

        <button
          onClick={() =>
            setShowAbout(false)
          }
        >
          Back
        </button>

      </div>

    );

  }

  // DASHBOARD VIEW

  if (loggedIn) {

    return (

      <div
        style={{
          padding: "30px",
          backgroundColor: "#e6ffe6",
          minHeight: "100vh"
        }}
      >

        <h1>StockTrack Dashboard</h1>

        <button onClick={handleLogout}>
          Logout
        </button>

        <button
          onClick={() =>
            setShowAbout(true)
          }
          style={{
            marginLeft: "10px"
          }}
        >
          About
        </button>

        <h3 style={{ marginTop: "20px" }}>
          Add Product
        </h3>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) =>
            setQuantity(e.target.value)
          }
        />

        <br /><br />

        <input
          type="number"
          placeholder="Minimum Quantity"
          value={minQuantity}
          onChange={(e) =>
            setMinQuantity(e.target.value)
          }
        />

        <br /><br />

        <button onClick={handleAddProduct}>
          Add Product
        </button>

        {/* UPDATE STOCK SECTION */}

        <h3 style={{ marginTop: "30px" }}>
          Update Stock
        </h3>

        <select
          value={selectedProductId}
          onChange={(e) =>
            setSelectedProductId(
              e.target.value
            )
          }
        >

          <option value="">
            Select Product
          </option>

          {products.map(product => (

            <option
              key={product.id}
              value={product.id}
            >

              {product.name}

            </option>

          ))}

        </select>

        <br /><br />

        <input
          type="number"
          placeholder="Enter New Quantity"
          value={newQuantity}
          onChange={(e) =>
            setNewQuantity(
              e.target.value
            )
          }
        />

        <br /><br />

        <button
          onClick={handleExactUpdate}
        >
          Update Stock
        </button>

        {/* PRODUCT LIST */}

        <h3 style={{ marginTop: "30px" }}>
          Product List
        </h3>

        <ul>

          {products.map((product) => (

            <li key={product.id}>

              {product.name} — Qty:
              {product.quantity}

              {" "} (Min:
              {product.min_quantity})

              {" "} — {product.status}

              <button
                onClick={() =>
                  handleDeleteProduct(
                    product.id
                  )
                }
                style={{
                  marginLeft: "10px"
                }}
              >
                Delete
              </button>

            </li>

          ))}

        </ul>

      </div>

    );

  }

  // LOGIN / REGISTER VIEW

  return (

    <div
      style={{
        padding: "30px",
        backgroundColor: "#e6ffe6",
        minHeight: "100vh"
      }}
    >

      <h1>StockTrack Inventory</h1>

      {isRegistering ? (

        <div>

          <h2>Register</h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <br /><br />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <br /><br />

          <button onClick={handleRegister}>
            Register
          </button>

          <br /><br />

          <button
            onClick={() =>
              setIsRegistering(false)
            }
          >
            Back to Login
          </button>

        </div>

      ) : (

        <div>

          <h2>Login</h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <br /><br />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <br /><br />

          <button onClick={handleLogin}>
            Login
          </button>

          <br /><br />

          <button
            onClick={() =>
              setIsRegistering(true)
            }
          >
            Register
          </button>

        </div>

      )}

    </div>

  );

}

export default App;
