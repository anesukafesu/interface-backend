import { PostRepository } from "../../ports/repositories/post.repository";
import { PostEntity } from "../../entities/post.entity";

const POST_LIMIT = 500;

interface ViewPostsFromMultipleUsersDependencies {
  postRepository: PostRepository;
}

interface ViewPostsFromMultipleUsersInput {
  userIds: string[];
  after?: string;
}

export class ViewPostsFromMultipleUsers {
  constructor(
    private readonly dependencies: ViewPostsFromMultipleUsersDependencies,
  ) {}

  async execute({
    userIds,
    after,
  }: ViewPostsFromMultipleUsersInput): Promise<PostEntity[]> {
    return await this.dependencies.postRepository.getManyByManyUserIds(
      userIds,
      POST_LIMIT,
      after,
    );
  }
}
