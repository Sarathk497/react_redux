import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  fetchUsers,
  setSearchQuery,
  setSelectedUserId,
} from "../Redux/slice/dataslices";
import InfiniteScroll from "react-infinite-scroll-component";

const List = () => {
  const dispatch = useDispatch();
  const { posts, users, searchQuery, selectedUserId } = useSelector(
    (state) => state.data
  );

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.includes(searchQuery) ||
      post.userId.toString().includes(searchQuery);
    const matchesUser = selectedUserId ? post.userId === selectedUserId : true;
    return matchesSearch && matchesUser;
  });

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title or userId"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <select
          onChange={(e) =>
            dispatch(setSelectedUserId(Number(e.target.value) || null))
          }
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
      <InfiniteScroll
        dataLength={filteredPosts.length}
        hasMore={false}
        loader={<h4>Loading...</h4>}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            padding: "10px",
            maxWidth: "1200px",
            margin: "0 auto", 
            backgroundColor: "#f5f5f5",
          }}
        >
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
              <p>
                <b>Title: </b>
                {post.title}
              </p>
              <p>
                <b>Body: </b>
                {post.body}
              </p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default List;
