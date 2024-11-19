import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, fetchUsers, setSearchQuery, setSelectedUserId } from "../Redux/slice/dataslices";
import InfiniteScroll from "react-infinite-scroll-component";

const List = () => {
  const dispatch = useDispatch();

  // Access Redux state
  const { posts, users, searchQuery, selectedUserId } = useSelector((state) => state.data);

  // Fetch posts and users when the component mounts
  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter and search logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.includes(searchQuery) || post.userId.toString().includes(searchQuery);
    const matchesUser = selectedUserId ? post.userId === selectedUserId : true;
    return matchesSearch && matchesUser;
  });

  // Infinite scroll - Simulated loader (as data is static, no true infinite scroll)
  const loadMorePosts = () => {
    // In a real-world case, this would fetch more data from the server.
    // Here, it just simulates the effect by dispatching another fetchPosts (no-op for this API).
    console.log("Load more triggered"); // Placeholder for API logic
  };

  return (
    <div>
      {/* Search and Filter Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title or userId"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <select
          onChange={(e) => dispatch(setSelectedUserId(Number(e.target.value) || null))}
          style={{ padding: "5px" }}
        >
          <option value="">Filter by user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Infinite Scroll Section */}
      <InfiniteScroll
        dataLength={filteredPosts.length}
        next={loadMorePosts}
        hasMore={false} // Set to true if fetching more data is implemented
        loader={<h4>Loading...</h4>}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3>User ID: {post.userId}</h3>
              <p>{post.title}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default List;
