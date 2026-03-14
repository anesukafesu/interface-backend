type UserParams = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  githubProfile: string;
  personalWebsiteLink: string;
  followersCount: number;
  followingCount: number;
};

export class UserEntity {
  readonly id: string;
  readonly username: string;
  readonly displayName: string;
  readonly bio: string;
  readonly githubProfile: string;
  readonly personalWebsiteLink: string;
  readonly followersCount: number;
  readonly followingCount: number;

  constructor({
    id,
    username,
    displayName,
    bio,
    githubProfile,
    personalWebsiteLink,
    followersCount,
    followingCount,
  }: UserParams) {
    this.id = id;
    this.username = username;
    this.displayName = displayName;
    this.bio = bio;
    this.githubProfile = githubProfile;
    this.personalWebsiteLink = personalWebsiteLink;
    this.followersCount = followersCount;
    this.followingCount = followingCount;
  }
}
