import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const [communities, setCommunities] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchCommunities();
  }, [navigate]);

  const fetchCommunities = async () => {
    try {
      const response = await fetch("http://localhost:5000/communities");
      const data = await response.json();
      setCommunities(data);
    } catch (err) {
      console.error("Error fetching communities:", err);
    }
  };

  const handleJoin = async (communityId: string) => {
    if (!user) return;
    try {
      const response = await fetch(
        `http://localhost:5000/communities/${communityId}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Joined community successfully!");
        fetchCommunities();
      } else {
        alert(data.error || "Failed to join community");
      }
    } catch (err) {
      console.error("Error joining community:", err);
      alert("Failed to join community");
    }
  };

  const handleLeave = async (communityId: string) => {
    if (!user) return;
    try {
      const response = await fetch(
        `http://localhost:5000/communities/${communityId}/leave`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const data = await response.json();
      console.log("Leave response:", data);
      if (data.success) {
        alert("Left community successfully!");
        fetchCommunities();
      } else {
        alert(data.error || "Failed to leave community");
      }
    } catch (err) {
      console.error("Error leaving community:", err);
      alert("Failed to leave community");
    }
  };

  return (
    <div>
      <h1>Community Page</h1>
      {communities.length === 0 ? (
        <p>No communities available.</p>
      ) : (
        <ul>
          {communities.map((community) => {
            const isMember = community.members.some(
              (member: any) => member.toString() === user._id.toString()
            );
            return (
              <li key={community._id}>
                <h3>{community.name}</h3>
                <p>{community.description}</p>
                <p>Members: {community.members.length}</p>
                {isMember ? (
                  <button onClick={() => handleLeave(community._id)}>
                    Leave
                  </button>
                ) : (
                  <button onClick={() => handleJoin(community._id)}>
                    Join
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CommunityPage;
