import { NotFound } from "@errors/NotFound";
import { ResourceConflict } from "@errors/ResourceConflict";
import { FollowUserFeature } from "@features/following/follow-user.feature";
import { FollowRepository } from "@ports/repositories/follow.repository";
import { UserRepository } from "@ports/repositories/user.repository";
import { IdGenerator } from "@ports/services/id-generator.service";
import { beforeEach } from "node:test";

describe("Follow User Feature", () => {
  const followRepository: jest.Mocked<FollowRepository> = {
    createOne: jest.fn(),
    getManyByFollowerId: jest.fn(),
    getManyByFollowingId: jest.fn(),
    getOneByFollowerIdAndFollowingId: jest.fn(),
    deleteOneByFollowerIdAndFollowingId: jest.fn(),
  };

  const userRepository: jest.Mocked<UserRepository> = {
    getOneById: jest.fn(),
    incrementFollowerCountForUser: jest.fn(),
    decrementFollowerCountForUser: jest.fn(),
  };

  const idGenerator: jest.Mocked<IdGenerator> = {
    generate: jest.fn(),
  };

  const feature = new FollowUserFeature({
    followRepository,
    userRepository,
    idGenerator,
  });

  const mockUser = {
    id: "42",
    username: "johndoe",
    displayName: "johndoe",
    bio: "just your average joe",
    followersCount: 420,
    followingCount: 69,
    githubProfile: "johndoe",
    personalWebsiteLink: "example.com",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Creates a follow when both user and following exist, and user does not already follow following", async () => {
    userRepository.getOneById.mockResolvedValue(mockUser);
    followRepository.getOneByFollowerIdAndFollowingId.mockResolvedValue(null);
    idGenerator.generate.mockResolvedValue("42");

    await feature.execute({ toFollow: "7", toBeFollowed: "42" });

    expect(followRepository.createOne).toHaveBeenCalled();
    expect(userRepository.incrementFollowerCountForUser).toHaveBeenCalledWith(
      "42",
    );
  });

  it("Throws if the user to be followed does not exist", async () => {
    userRepository.getOneById.mockResolvedValue(null);
    followRepository.getOneByFollowerIdAndFollowingId.mockResolvedValue(null);
    await expect(
      feature.execute({ toFollow: "7", toBeFollowed: "42" }),
    ).rejects.toThrow(NotFound);
  });

  it("Does not allow the user to follow twice.", async () => {
    userRepository.getOneById.mockResolvedValue(mockUser);
    followRepository.getOneByFollowerIdAndFollowingId.mockResolvedValue({
      id: "69",
      follower: "7",
      following: "42",
    });

    await expect(
      feature.execute({ toFollow: "7", toBeFollowed: "42" }),
    ).rejects.toThrow(ResourceConflict);

    // expect(followRepository.createOne).not.toHaveBeenCalled();
  });
});
