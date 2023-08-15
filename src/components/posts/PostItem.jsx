import propTypes from "prop-types";
import { UseProfile } from "../../contexts/ProfileContext";
import supabase from "../../supabaseClient";
const PostItem = ({ post, fetchPosts }) => {
  const { currentProfile } = UseProfile();

  const deletePost = async (id) => {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .eq("userID", currentProfile?.id);
    if (error) console.log(error);
    fetchPosts();
  };

  return (
    <div>
      {post.userID === currentProfile.id ? (
        <button onClick={() => deletePost(post.id)}>Delete Post</button>
      ) : (
        ""
      )}
      <p>{post.posted_by}</p>
      <p>{post.title}</p>
      <p>{post.content}</p>
      {post.fileURLs.map((url, index) => (
        <img
          src={url}
          key={index}
          alt=""
          style={{ width: "200px", height: "200px" }}
        />
      ))}
    </div>
  );
};

export default PostItem;

PostItem.propTypes = {
  post: propTypes.object,
  fetchPosts: propTypes.func,
};
