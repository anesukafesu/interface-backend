import { NotFound } from "../../errors/NotFound";
import { LikeRepository } from "../../ports/repositories/like.repository";
import { PostRepository } from "../../ports/repositories/post.repository";
import { IdGenerator } from "../../ports/services/id-generator.service";
import { LikeEntity } from "../../entities/like.entity";

interface LikePostFeatureInput {
  postId: string;
  userId: string;
}

interface LikePostFeatureDependencies {
  postRepository: PostRepository;
  likeRepository: LikeRepository;
  idGenerator: IdGenerator;
}

export class LikePostFeature {
  constructor(private readonly dependencies: LikePostFeatureDependencies) {}

  async execute({ postId, userId }: LikePostFeatureInput) {
    const { postRepository, likeRepository, idGenerator } = this.dependencies;

    const post = await postRepository.getOneById(postId);

    if (post === null) {
      throw new NotFound(`Post with id ${postId} could not be found.`);
    }

    const newLike = new LikeEntity({
      id: await idGenerator.generate(),
      postId: postId,
      userId: userId,
    });

    likeRepository.createOne(newLike);
    postRepository.incrementLikeCountOnPost(postId);
  }
}
