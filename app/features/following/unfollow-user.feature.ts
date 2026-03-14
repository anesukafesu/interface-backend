import { FollowRepository } from "@ports/repositories/follow.repository";
import { UserRepository } from "@ports/repositories/user.repository";

interface UnfollowUserFeatureDependencies {
  followRepository: FollowRepository;
  userRepository: UserRepository;
}

interface UnfollowUserFeatureInput {
  userId: string;
  followingId: string;
}

export class UnfollowUserFeature {
  constructor(private readonly dependencies: UnfollowUserFeatureDependencies) {}

  async execute({ userId, followingId }: UnfollowUserFeatureInput) {
    const { followRepository, userRepository } = this.dependencies;

    const deleted = await followRepository.deleteOneByFollowerIdAndFollowingId(
      userId,
      followingId,
    );

    if (deleted) {
      userRepository.decrementFollowerCountForUser(followingId);
    }
  }
}
