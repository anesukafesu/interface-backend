import { LikeRepository } from "../../ports/repositories/like.repository";
import { PostRepository } from "../../ports/repositories/post.repository";

interface UnlikePostFeatureDependencies {
  likeRepository: LikeRepository;
  postRepository: PostRepository;
}

interface UnlikePostFeatureInput {
  userId: string;
  postId: string;
}

export class UnlikePostFeature {
  constructor(private readonly dependencies: UnlikePostFeatureDependencies) {}

  async execute({ userId, postId }: UnlikePostFeatureInput): Promise<void> {
    const { likeRepository, postRepository } = this.dependencies;

    const deleted = await likeRepository.deleteOneByUserIdAndPostId(
      userId,
      postId,
    );

    if (deleted) {
      postRepository.decrementLikeCountOnPost(postId);
    }
  }
}
