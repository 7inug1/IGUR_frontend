import Post from "./Post";

function MostLikedPosts({ contents }) {
  const NUMBER_OF_POSTS_TO_SHOW = 5;
  const convertSItoNumber = (item) => {
    if (item[item.length - 1] === "k") {
      item = Number(item.slice(0, item.length - 1)) * 1000;
    }

    if (item[item.length - 1] === "m") {
      item = Number(item.slice(0, item.length - 1)) * 1000000;
    }

    return item;
  };
  const sortedContents = contents.posts.sort((a, b) => {
    const formerNumberOfLikes = convertSItoNumber(a.numberOfLikes);
    const latterNumberOfLikes = convertSItoNumber(b.numberOfLikes);

    return latterNumberOfLikes - formerNumberOfLikes;
  });
  const printSortedContents = () => {
    const array = [];

    for (let i = 0; i < NUMBER_OF_POSTS_TO_SHOW; i++) {
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
  };

  return (
    <ul>
      {
        printSortedContents()
      }
    </ul>
  );
}

export default MostLikedPosts;
