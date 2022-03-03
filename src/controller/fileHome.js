export const separateDeletedPost = (data) => {
  let posts = [];
  let deletedPosts = [];

  data.forEach((element) => {
    if (element.trash) {
      deletedPosts.push(element);
    } else {
      posts.push(element);
    }
  });

  const allPosts = [posts, deletedPosts];

  return allPosts;
};
