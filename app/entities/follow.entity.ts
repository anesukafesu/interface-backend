type FollowEntityParams = {
  id: string;
  follower: string;
  following: string;
};

export class FollowEntity {
  readonly id: string;
  readonly follower: string;
  readonly following: string;

  constructor({ id, follower, following }: FollowEntityParams) {
    this.id = id;
    this.follower = follower;
    this.following = following;
  }
}
