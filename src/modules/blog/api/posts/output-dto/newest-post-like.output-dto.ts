/*Output DTO для данных о последнем лайке поста.*/
export type NewestPostLikeOutputDTO = {
  addedAt: Date;
  userId: string;
  login: string;
};
