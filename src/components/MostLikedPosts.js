import Post from "./Post";
import { useState, useEffect } from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';
import styled from "styled-components";

const MostLikedHeader = styled.h2`
  font-size: 30px;
  padding-top: 20px;
  margin-bottom: 20px;
`;
const UL = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1%;
`;

function MostLikedPosts({ posts }) {
  const [sortedPosts, setSortedPosts] = useState({});
  const NUMBER_OF_POSTS_TO_SHOW = 6;
  const convertSItoNumber = (likes) => {
    let numberOfLikes = likes;

    if (numberOfLikes[numberOfLikes.length - 1] === "k") {
      numberOfLikes = Number(numberOfLikes.slice(0, numberOfLikes.length - 1)) * 1000;
    } else if (numberOfLikes[numberOfLikes.length - 1] === "m") {
      numberOfLikes = Number(numberOfLikes.slice(0, numberOfLikes.length - 1)) * 1000000;
    } else {
      Number(numberOfLikes);
    }

    return numberOfLikes;
  };

  const printSortedContents = (sortedPosts) => {
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
            prediction={post.prediction}
          />
        );
      }
    } else {
      array.push(<div>no posts to show</div>);
    }

    return array;
  };

  useEffect(() => {
    if (posts?.length && !Object.keys(sortedPosts).length) {
      let sortedContents = posts.slice();

      sortedContents?.sort((a, b) => {
        const formerNumberOfLikes = convertSItoNumber(a.numberOfLikes);
        const latterNumberOfLikes = convertSItoNumber(b.numberOfLikes);

        return latterNumberOfLikes - formerNumberOfLikes;
      });

      setSortedPosts(sortedContents);
    }
  }, [posts, sortedPosts]);

  useDeepCompareEffect(() => {
    if (sortedPosts?.length) {
      printSortedContents(sortedPosts);
    }
  }, [sortedPosts]);

  return (
    <>
      <MostLikedHeader className="most-liked-header">Most-Liked Posts</MostLikedHeader>
      <UL>
        { printSortedContents(sortedPosts) }
      </UL>
    </>
  );
}

export default MostLikedPosts;
