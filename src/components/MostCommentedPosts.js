import styled from 'styled-components';
import Post from "./Post";
import { useState, useEffect } from "react";

const UL = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1%;
`;
const MostCommentedHeader = styled.h2`
  font-size: 30px;
  margin-top: 40px;
  margin-bottom: 20px;
`;
const Message = styled.p`
  font-size: 25px;
  text-align: center;
  margin-top: 40px;
`;

function MostCommentedPosts({ posts }) {
  const [sortedPosts, setSortedPosts] = useState(null);
  const NUMBER_OF_POSTS_TO_SHOW = 6;
  const printSortedContents = () => {
    const array = [];

    if (sortedPosts?.length) {
      const numberOfLoops = sortedPosts.length < NUMBER_OF_POSTS_TO_SHOW ? sortedPosts.length : NUMBER_OF_POSTS_TO_SHOW;
      
      for (let i = 0; i < numberOfLoops; i++) {
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
            prediction={post.prediction}
          />
        );
      }
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
      <MostCommentedHeader className='most-commented-header'>Most-Commented Posts</MostCommentedHeader>
      {sortedPosts?.length &&
        <UL>
          {
            printSortedContents()
          }
        </UL>
      }
      {!sortedPosts?.length && <Message>no posts to show</Message>}
    </>
  );
}

export default MostCommentedPosts;
