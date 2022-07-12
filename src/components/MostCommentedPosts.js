import styled from 'styled-components';
import Post from "./Post";

function MostCommentedPosts({ contents }) {
  const sortedContents = contents.posts.sort((a, b) => b.numberOfReplies - a.numberOfReplies);
  const ITERATION = 8;
  const printSortedContents = () => {
    const array = [];

    for (let i = 0; i < ITERATION; i++) {
      const post = sortedContents[i];

      array.push(
        <Post
          key={i}
          location={post.location}
          imgSrc={post.imgSrc}
          description={post.description}
          numberOfLikes={post.numberOfLikes}
          numberOfReplies={post.numberOfReplies}
          datePosted={post.datePosted}
        />
      );
    }

    return array;
  }

  return (
    <ul>
      {
        printSortedContents()
      }
    </ul>
  );
}

export default MostCommentedPosts;
