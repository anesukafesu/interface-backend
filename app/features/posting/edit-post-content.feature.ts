import { Forbidden } from "../../errors/Forbidden";
import { NotFound } from "../../errors/NotFound";
import { ContentVersionRepository } from "../../ports/repositories/content-version.repository";
import { PostRepository } from "../../ports/repositories/post.repository";
import { IdGenerator } from "../../ports/services/id-generator.service";
import { ContentVersionEntity } from "../../entities/content-version.entity";
import { PostEntity } from "../../entities/post.entity";

interface EditPostInput {
  postId: string;
  userId: string;
  content: string;
}

interface EditPostDependencies {
  postRepository: PostRepository;
  contentVersionRepository: ContentVersionRepository;
  idGenerator: IdGenerator;
}

export class EditPostFeature {
  constructor(private readonly dependencies: EditPostDependencies) {}

  async execute({
    postId,
    userId,
    content,
  }: EditPostInput): Promise<PostEntity> {
    const { postRepository, contentVersionRepository, idGenerator } =
      this.dependencies;

    const post = await postRepository.getOneById(postId);

    if (post === null) {
      throw new NotFound(`The post with the ${postId} does not exist.`);
    }

    if (post.userId !== userId) {
      throw new Forbidden(
        `The user ${userId} does not have permission to edit the post ${postId}.`,
      );
    }

    const newContentVersion = new ContentVersionEntity({
      id: await idGenerator.generate(),
      postId: postId,
      createdAt: Date.now(),
      content: content,
    });

    contentVersionRepository.createOne(newContentVersion);

    return post;
  }
}
