import { PostRepository } from "../../ports/repositories/post.repository";

interface ViewPostsByParentFeatureDependencies {
  postRepository: PostRepository;
}

interface ViewPostsByParentFeatureInput {
  parentId: string;
}

export class ViewPostsByParentFeature {
  constructor(
    private readonly dependencies: ViewPostsByParentFeatureDependencies,
  ) {}

  async execute({ parentId }: ViewPostsByParentFeatureInput) {
    return await this.dependencies.postRepository.getManyByParentId(parentId);
  }
}
