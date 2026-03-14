import { Forbidden } from "../../errors/Forbidden";
import { ContentVersionRepository } from "../../ports/repositories/content-version.repository";
import { PostRepository } from "../../ports/repositories/post.repository";
import { LikeRepository } from "../../ports/repositories/like.repository";

interface DeletePostInput {
  userId: string;
  postId: string;
}

interface DeletePostDependencies {
  postRepository: PostRepository;
  likeRepository: LikeRepository;
  contentVersionRepository: ContentVersionRepository;
}

export class DeletePostFeature {
  constructor(private readonly dependencies: DeletePostDependencies) {}

  async execute({ userId, postId }: DeletePostInput): Promise<string> {
    const { postRepository, likeRepository, contentVersionRepository } =
      this.dependencies;

    const post = await postRepository.getOneById(postId);

    if (post === null) {
      return postId;
    }

    if (post.userId !== userId) {
      throw new Forbidden(
        `User with id ${userId} cannot delete post ${postId}`,
      );
    }

    await likeRepository.deleteManyByPostId(postId);
    await contentVersionRepository.deleteManyByPostId(postId);
    await postRepository.deleteParentReferencesOfPost(postId);
    await postRepository.deleteOneById(postId);

    if (post.parentId) {
      postRepository.decrementReplyCountOnPost(post.parentId);
    }

    return postId;
  }
}
