import styled from 'styled-components';
import Post from "./Post";
import { useState, useEffect } from "react";


function MostCommentedPosts({ posts }) {
  const [sortedPosts, setSortedPosts] = useState(null);

  // const sortedContents = sortedPosts.posts.sort((a, b) => b.numberOfReplies - a.numberOfReplies);
  const NUMBER_OF_POSTS_TO_SHOW = 5;
  const printSortedContents = () => {
    const array = [];

    if (sortedPosts?.length) { 
      for (let i = 0; i < NUMBER_OF_POSTS_TO_SHOW; i++) {
        const post = sortedPosts[i];
        
        array.push(
          <Post
            key={post.id}
            location={post.location}
            imgSrc={post.imgSrc}
            description={post.description}
            numberOfLikes={post.numberOfLikes}
            numberOfReplies={post.numberOfReplies}
            datePosted={post.datePosted}
          />
        );
      }
    } else {
      array.push(<div>no posts to show</div>);
    }

    return array;
  }

  useEffect(() => {
    if (posts?.length) {
      let sortedContents = posts.slice(0);
      sortedContents?.sort((a, b) => b.numberOfReplies - a.numberOfReplies);

      setSortedPosts(sortedContents);
    }
  }, [posts]);

  return (
    <>
      <h1>Most Commented</h1>
      <ul>
        {
          printSortedContents()
        }
      </ul>
    </>
  );
}

export default MostCommentedPosts;
