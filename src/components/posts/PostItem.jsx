import propTypes from "prop-types";
import { UseProfile } from "../../contexts/ProfileContext";
import supabase from "../../supabaseClient";
import { MdDelete } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { db } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";
const PostItem = ({ post, fetchPosts }) => {
  const { currentProfile } = UseProfile();
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
  };

  const deletePost = async (id) => {
    const { data } = await supabase
      .from("posts")
      .select("fileURLs")
      .eq("id", id)
      .eq("userID", currentProfile?.id);

    console.log(data[0].fileURLs);

    if (data[0].fileURLs) {
      data.map(async (d) => {
        if (d.fileURLs) {
          d.fileURLs.map(async (fileURL) => {
            let photoURL = fileURL;

            const fileRef = ref(db, photoURL);

            await deleteObject(fileRef);
          });
        }
      });
    }

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .eq("userID", currentProfile?.id);
    if (error) console.log(error);
    fetchPosts();
  };

  return (
    <main>
      <section className="postHeader">
        <p>{post.posted_by}</p>
        {post.userID === currentProfile.id ? (
          <MdDelete onClick={() => deletePost(post.id)} />
        ) : null}
      </section>
      <section className="postMain">
        <div className="postDetails">
          <p className="postTitle">{post.title}</p>
          <p className="postContent">{post.content}</p>
        </div>
        <Slider {...settings}>
          {post.fileURLs &&
            post.fileURLs.map((url, index) => (
              <img src={url} key={index} alt="" />
            ))}
        </Slider>
      </section>
    </main>
  );
};

export default PostItem;

PostItem.propTypes = {
  post: propTypes.object,
  fetchPosts: propTypes.func,
};
