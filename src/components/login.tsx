import { useState, useEffect } from "react";
import { Router } from "react-router"
import { useNavigate } from "react-router-dom";
import '../design/main.css';
import '../design/colors.css';
import '../design/shapes.css';
import '../design/alignment.css';
import '../design/text.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
    setUsername("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/login"
        : "http://localhost:5000/register";

      const body = isLogin
        ? { email, password }
        : { name, username, email, password };

      let result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();

      if (isLogin) {
        if (result && result.success) {
          localStorage.setItem("user", JSON.stringify(result.user));

          alert("Login successful!");
          navigate("/homepage");
        } else {
          alert(result.error || "Invalid credentials");
        }
      } else {
        if (result && result._id) {
          alert("Account created successfully!");
        } else {
          alert("Something went wrong creating account");
        }
      }

      fetchUsers();

    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="primary">
      <h2 className="center paddingTop20">{isLogin ? "Login" : "Create Account"}</h2>
      
      <form onSubmit={handleSubmit} className="margin20">
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="margin10 form-control"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="margin10 form-control"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="margin10 form-control"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="margin10 form-control"
        />

        <button type="submit" className="marginLeft10">
          {isLogin ? "Login" : "Create Account"}
        </button>
      </form>

      <hr />

      <button onClick={handleToggleMode} className="marginLeft30">
        {isLogin
          ? "Don't have an account? Create one"
          : "Already have an account? Login"}
      </button>

      <hr />

      <h2 className="secondary margin20 padding10">All Registered Users (Testing Only)</h2>
      <ul className="secondary margin20">
        {users.map((user) => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name} &nbsp;|&nbsp;
            <strong>Username:</strong> {user.username} &nbsp;|&nbsp;
            <strong>Email:</strong> {user.email} &nbsp;|&nbsp;
            <strong>Password:</strong> {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Login;
