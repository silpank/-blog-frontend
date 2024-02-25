import { useParams } from 'react-router-dom';

function Post() {
  const { postId } = useParams();
  
  // Now you can use postId in your component logic

  return (
    <div>
      <h2>Post ID: {postId}</h2>
      {/* Other post content */}
    </div>
  );
}

export default Post;
