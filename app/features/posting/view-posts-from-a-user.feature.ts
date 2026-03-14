import { PostRepository } from "../../ports/repositories/post.repository";

interface ViewPostsFromAUserInput {
  userId: string;
  after?: string;
}

interface ViewPostsFromAUserDependencies {
  postRepository: PostRepository;
}

export class ViewPostsFromAUserUseCase {
  constructor(private readonly dependencies: ViewPostsFromAUserDependencies) {}

  async execute({ userId, after }: ViewPostsFromAUserInput) {
    return await this.dependencies.postRepository.getManyByUserId(
      userId,
      after,
    );
  }
}
