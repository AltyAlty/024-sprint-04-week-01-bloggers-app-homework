export const SETTINGS = {
  PORT: Number(process.env.PORT || 5003),
  MONGO_URL: 'mongodb://localhost:27017/?maxPoolSize=50',
  GLOBAL_PREFIX: 'api',

  BLOGS_PREFIX: 'blogs',
  CREATE_POST_FOR_BLOG_PATH: ':blogId/posts',
  GET_BLOG_BY_ID_PATH: ':id',
  GET_POST_LIST_BY_BLOG_ID_PATH: ':blogId/posts',
  UPDATE_BLOG_BY_ID_PATH: ':id',
  DELETE_BLOG_BY_ID_PATH: ':id',

  POSTS_PREFIX: 'posts',
  GET_POST_BY_ID_PATH: ':id',
  UPDATE_POST_BY_ID_PATH: ':id',
  DELETE_POST_BY_ID_PATH: ':id',
};
