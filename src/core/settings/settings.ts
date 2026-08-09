export const SETTINGS = {
  PORT: Number(process.env.PORT || 5003),

  MONGO_URL: 'mongodb://localhost:27017/?maxPoolSize=50',
  DB_NAME: process.env.DB_NAME || '024-s-04-w-01-bloggers-app-hw',
  TEST_DB_NAME: process.env.DB_NAME || '024-s-04-w-01-bloggers-app-hw-test',

  GLOBAL_PREFIX: 'api',

  BLOGS_PREFIX: 'blogs',
  CREATE_BLOG_PATH: '',
  CREATE_POST_FOR_BLOG_PATH: ':blogId/posts',
  GET_BLOG_BY_ID_PATH: ':id',
  GET_BLOG_LIST_PATH: '',
  GET_POST_LIST_BY_BLOG_ID_PATH: ':blogId/posts',
  UPDATE_BLOG_BY_ID_PATH: ':id',
  DELETE_BLOG_BY_ID_PATH: ':id',

  POSTS_PREFIX: 'posts',
  CREATE_POST_PATH: '',
  GET_POST_BY_ID_PATH: ':id',
  GET_POST_LIST_PATH: '',
  GET_COMMENT_LIST_BY_POST_ID_PATH: ':postId/comments',
  UPDATE_POST_BY_ID_PATH: ':id',
  DELETE_POST_BY_ID_PATH: ':id',

  COMMENTS_PREFIX: 'comments',
  GET_COMMENT_BY_ID_PATH: ':id',

  USERS_PREFIX: 'users',
  CREATE_USER_PATH: '',
  GET_USER_LIST_PATH: '',
  DELETE_USER_BY_ID_PATH: ':id',

  TESTING_PREFIX: 'testing',
  CLEAR_DB_PATH: 'all-data',
};
