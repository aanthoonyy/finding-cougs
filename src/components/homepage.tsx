import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);


  if (!user) {
    return null; 
  }

  return (
    <div>
      <h1>Welcome, {user.name || user.email}!</h1>

      <form>
        <textarea
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default Homepage;
