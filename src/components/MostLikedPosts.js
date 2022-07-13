import Post from "./Post";
import { useState, useEffect } from "react";
import useDeepCompareEffect from 'use-deep-compare-effect';

function MostLikedPosts({ posts }) {
  const [sortedPosts, setSortedPosts] = useState({});
  const NUMBER_OF_POSTS_TO_SHOW = 5;
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
  // const array = [];
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
          />
        );
      }
    } else {
      array.push(<div>no posts to show</div>);
    }

    return array;
  };

  useEffect(() => {
    console.log("posts", posts);
    if (posts?.length) {
      console.log("useeffect");
      
      let sortedContents = posts.slice();

      sortedContents?.sort((a, b) => {
        const formerNumberOfLikes = convertSItoNumber(a.numberOfLikes);
        const latterNumberOfLikes = convertSItoNumber(b.numberOfLikes);

        return latterNumberOfLikes - formerNumberOfLikes;
      });

      console.log("sortedContents", sortedContents);
    
      // printSortedContents(sortedContents);
      setSortedPosts(sortedContents);
    }
  }, [posts]);

  useDeepCompareEffect(() => {
    if (sortedPosts?.length) {
      printSortedContents(sortedPosts);
    }
  }, [sortedPosts]);

  return (
    <>
      <h1>Most Liked</h1>
      <ul>
        { printSortedContents(sortedPosts) }
      </ul>
    </>
  );
}

export default MostLikedPosts;
