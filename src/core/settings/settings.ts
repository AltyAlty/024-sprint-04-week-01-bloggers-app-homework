export const SETTINGS = {
  PORT: Number(process.env.PORT || 5003),
  MONGO_URL: 'mongodb://localhost:27017/?maxPoolSize=50',
  GLOBAL_PREFIX: 'api',

  BLOGS_PREFIX: 'blogs',
  GET_BLOG_BY_ID_PATH: ':id',
  UPDATE_BLOG_BY_ID_PATH: '/:id',
  DELETE_BLOG_BY_ID_PATH: '/:id',
};
