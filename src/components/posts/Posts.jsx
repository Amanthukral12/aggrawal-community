import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import supabase from "../../supabaseClient";
import { UseProfile } from "../../contexts/ProfileContext";
import PostItem from "./PostItem";

const Posts = () => {
  const [posts, setPosts] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [fileURLs, setFileURLs] = useState([]);
  const [fileUpload, setFileUpload] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [formError, setFormError] = useState(null);

  const { currentProfile } = UseProfile();

  const fetchPosts = async () => {
    const { data, error } = await supabase.from("posts").select("*");

    if (error) {
      console.log(error);
      setFetchError("Could not fetch the posts");
      setPosts([]);
    }
    if (data) {
      console.log(data);
      setPosts(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setFormError("Please fill the title and content fields");
      return;
    }

    if (fileUpload) {
      var downloadUrls = await Promise.all(
        fileUpload.map(async (file) => {
          const imageRef = ref(db, `files/${file.name}${Date.now()}`);
          await uploadBytes(imageRef, file);
          return getDownloadURL(imageRef);
        })
      );
    }
    setFileURLs(downloadUrls);

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          fileURLs: downloadUrls,
          posted_by: currentProfile.first_name + currentProfile.last_name,
          userID: currentProfile.id,
        },
      ])
      .select();

    if (error) {
      setFormError("Error posting post please try again after sometime");
    }
    if (data) {
      setFormError(null);
      setTitle("");
      setContent("");
    }
    fetchPosts();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          cols="30"
          rows="10"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          type="file"
          multiple
          onChange={(e) => {
            const selectedFiles = e.target.files;

            setFileUpload(Object.values(selectedFiles));
          }}
        />
        <button> Upload Image</button>
        {formError && <p>{formError}</p>}
      </form>
      {fetchError && <p>{fetchError}</p>}

      {posts && (
        <div>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} fetchPosts={fetchPosts} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
