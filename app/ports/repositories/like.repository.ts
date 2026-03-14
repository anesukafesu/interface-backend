import { LikeEntity } from "../../entities/like.entity";

export interface LikeRepository {
  createOne(like: LikeEntity): Promise<void>;

  deleteOneByUserIdAndPostId(userId: string, postId: string): Promise<boolean>;

  deleteManyByPostId(postId: string): Promise<void>;
}
