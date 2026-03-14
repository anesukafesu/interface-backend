import { FollowEntity } from "@entities/follow.entity";
import { FollowRepository } from "@ports/repositories/follow.repository";

interface GetFollowersForUserFeatureDependencies {
  followRepository: FollowRepository;
}

interface GetFollowersForUserFeatureInput {
  userId: string;
}

export class GetFollowersForUserFeature {
  constructor(
    private readonly dependencies: GetFollowersForUserFeatureDependencies,
  ) {}

  execute({
    userId,
  }: GetFollowersForUserFeatureInput): Promise<FollowEntity[]> {
    return this.dependencies.followRepository.getManyByFollowingId(userId);
  }
}
