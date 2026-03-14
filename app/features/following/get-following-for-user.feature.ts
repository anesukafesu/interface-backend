import { FollowEntity } from "@entities/follow.entity";
import { FollowRepository } from "@ports/repositories/follow.repository";

interface GetFollowingForUserFeatureDependencies {
  followRepository: FollowRepository;
}

interface GetFollowingForUserFeatureInput {
  userId: string;
}

export class GetFollowingForUserFeature {
  constructor(
    private readonly dependencies: GetFollowingForUserFeatureDependencies,
  ) {}

  execute({
    userId,
  }: GetFollowingForUserFeatureInput): Promise<FollowEntity[]> {
    return this.dependencies.followRepository.getManyByFollowerId(userId);
  }
}
