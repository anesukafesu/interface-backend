import { FollowEntity } from "@entities/follow.entity";
import { NotFound } from "@errors/NotFound";
import { FollowRepository } from "@ports/repositories/follow.repository";
import { UserRepository } from "@ports/repositories/user.repository";
import { IdGenerator } from "@ports/services/id-generator.service";

interface FollowUserFeatureDependencies {
  followRepository: FollowRepository;
  userRepository: UserRepository;
  idGenerator: IdGenerator;
}

interface FollowUserFeatureInput {
  userId: string;
  followingId: string;
}

export class FollowUserFeature {
  constructor(private readonly dependencies: FollowUserFeatureDependencies) {}

  async execute({ userId, followingId }: FollowUserFeatureInput) {
    const { followRepository, userRepository, idGenerator } = this.dependencies;

    const following = await userRepository.getOneById(followingId);
    if (following) {
      throw new NotFound(
        `Cannot follow user ${followingId} as the user does not exist.`,
      );
    }

    const follow = new FollowEntity({
      id: await idGenerator.generate(),
      following: followingId,
      follower: userId,
    });

    followRepository.createOne(follow);
    userRepository.incrementFollowerCountForUser(followingId);
  }
}
