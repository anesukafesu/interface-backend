import { FollowEntity } from "@entities/follow.entity";
import { NotFound } from "@errors/NotFound";
import { ResourceConflict } from "@errors/ResourceConflict";
import { FollowRepository } from "@ports/repositories/follow.repository";
import { UserRepository } from "@ports/repositories/user.repository";
import { IdGenerator } from "@ports/services/id-generator.service";

interface FollowUserFeatureDependencies {
  followRepository: FollowRepository;
  userRepository: UserRepository;
  idGenerator: IdGenerator;
}

interface FollowUserFeatureInput {
  toFollow: string;
  toBeFollowed: string;
}

export class FollowUserFeature {
  constructor(private readonly dependencies: FollowUserFeatureDependencies) {}

  async execute({ toFollow, toBeFollowed }: FollowUserFeatureInput) {
    const { followRepository, userRepository, idGenerator } = this.dependencies;

    const userToBeFollowed = await userRepository.getOneById(toBeFollowed);
    if (userToBeFollowed === null) {
      throw new NotFound(
        `Cannot follow user ${toBeFollowed} as the user does not exist.`,
      );
    }

    const existingFollow =
      await followRepository.getOneByFollowerIdAndFollowingId(
        toFollow,
        toBeFollowed,
      );

    if (existingFollow !== null) {
      throw new ResourceConflict(
        `User ${toFollow} already follows ${toBeFollowed}.`,
      );
    }

    const follow = new FollowEntity({
      id: await idGenerator.generate(),
      following: toBeFollowed,
      follower: toFollow,
    });

    followRepository.createOne(follow);
    userRepository.incrementFollowerCountForUser(toBeFollowed);
  }
}
