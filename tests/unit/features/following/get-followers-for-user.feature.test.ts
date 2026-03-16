import { GetFollowersForUserFeature } from "@features/following/get-followers-for-user.feature";
import { FollowRepository } from "@ports/repositories/follow.repository";

describe("Get followers for user", () => {
  const followRepository: jest.Mocked<FollowRepository> = {
    createOne: jest.fn(),
    getOneByFollowerIdAndFollowingId: jest.fn(),
    getManyByFollowerId: jest.fn(),
    getManyByFollowingId: jest.fn(),
    deleteOneByFollowerIdAndFollowingId: jest.fn(),
  };

  const feature = new GetFollowersForUserFeature({ followRepository });

  beforeEach(() => jest.clearAllMocks());

  it("If the user doesn't exist, returns an empty array", async () => {
    followRepository.getManyByFollowingId.mockResolvedValue([]);
    const followers = await feature.execute({ userId: "42" });
    expect(followers).toBeInstanceOf(Array);
    expect(followers.length).toBe(0);
  });

  // .
  it("If the user exists but has no followers, return an empty array", async () => {
    followRepository.getManyByFollowingId.mockResolvedValue([]);
    const followers = await feature.execute({ userId: "42" });
    expect(followers).toBeInstanceOf(Array);
    expect(followers.length).toBe(0);
  });

  const expectedFollows = [
    { id: "a", follower: "1", following: "42" },
    { id: "b", follower: "2", following: "42" },
    { id: "c", follower: "3", following: "42" },
  ];

  it("If the user has followers, return the followers.", async () => {
    followRepository.getManyByFollowingId.mockResolvedValue(expectedFollows);

    const actualFollows = await feature.execute({ userId: "42" });

    expect(expectedFollows).toEqual(actualFollows);
  });
});
