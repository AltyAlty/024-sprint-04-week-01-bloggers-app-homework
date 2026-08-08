/*Output DTO для данных об одном из последних лайков поста.*/
export type NewestPostLikeOutputDTO = {
  addedAt: Date;
  userId: string;
  login: string;
};
