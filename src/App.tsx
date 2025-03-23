import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, username, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    console.warn("Register result:", result);

    if (result) {
      alert("Data saved successfully");
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");

      fetchUsers();
    }
  };

  return (
    <>
      <h1>This is React WebApp</h1>
      <form>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleOnSubmit}>
          Submit
        </button>
      </form>

      <hr />

      <h2>Registered Users (Testing Only)</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>Name:</strong> {user.name} &nbsp;|&nbsp;
            <strong>Password:</strong> {user.password} &nbsp;|&nbsp;
            <strong>username:</strong> {user.username} 
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
