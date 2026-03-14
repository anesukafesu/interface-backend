type LikeParams = {
  id: string;
  userId: string;
  postId: string;
};

export class LikeEntity {
  readonly id: string;
  readonly userId: string;
  readonly postId: string;

  constructor({ id, userId, postId }: LikeParams) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }
}
