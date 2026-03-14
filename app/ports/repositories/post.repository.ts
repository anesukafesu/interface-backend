import { PostEntity } from "../../entities/post.entity";

export interface PostRepository {
  getOneById(id: string): Promise<PostEntity | null>;

  getManyByUserId(id: string, after?: string): Promise<PostEntity[]>;

  getManyByManyUserIds(
    ids: string[],
    limit: number,
    after?: string,
  ): Promise<PostEntity[]>;

  getManyByParentId(parentId: string): Promise<PostEntity[]>;

  incrementLikeCountOnPost(postId: string): Promise<void>;

  decrementLikeCountOnPost(postId: string): Promise<void>;

  incrementReplyCountOnPost(postId: string): Promise<void>;

  decrementReplyCountOnPost(postId: string): Promise<void>;

  deleteParentReferencesOfPost(postId: string): Promise<void>;

  createOne(post: PostEntity): Promise<void>;

  deleteOneById(id: string): Promise<string>;
}
