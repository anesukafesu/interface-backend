import { FollowEntity } from "@entities/follow.entity";

export interface FollowRepository {
  createOne(follow: FollowEntity): Promise<void>;

  getManyByFollowerId(followerId: string): Promise<FollowEntity[]>;

  getManyByFollowingId(followingId: string): Promise<FollowEntity[]>;

  deleteOneByFollowerIdAndFollowingId(
    followerId: string,
    followingId: string,
  ): Promise<boolean>;
}
