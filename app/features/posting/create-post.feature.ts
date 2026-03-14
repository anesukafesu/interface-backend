import { ContentVersionRepository } from "../../ports/repositories/content-version.repository";
import { PostRepository } from "../../ports/repositories/post.repository";
import { IdGenerator } from "../../ports/services/id-generator.service";
import { ContentVersionEntity } from "../../entities/content-version.entity";
import { PostEntity } from "../../entities/post.entity";
import { NotFound } from "../../errors/NotFound";
import { InvalidInput } from "../../errors/InvalidInput";

interface CreatePostInput {
  parentId: string | null;
  userId: string;
  content: string;
}

interface CreatePostDependencies {
  idGenerator: IdGenerator;
  postRepository: PostRepository;
  contentVersionRepository: ContentVersionRepository;
}

export class CreatePostFeature {
  constructor(private readonly dependencies: CreatePostDependencies) {}

  async execute({
    userId,
    content,
    parentId,
  }: CreatePostInput): Promise<PostEntity> {
    const { idGenerator, postRepository, contentVersionRepository } =
      this.dependencies;

    const normalisedContent = content.trim();

    if (normalisedContent === "") {
      throw new InvalidInput("The content field is empty.");
    }

    if (parentId) {
      const parent = await postRepository.getOneById(parentId);
      if (parent === null) {
        throw new NotFound(
          `Cannot create a reply to post ${parentId} as the post does not exist.`,
        );
      }
    }

    const now = Date.now();

    const newPost = new PostEntity({
      id: await idGenerator.generate(),
      parentId: parentId,
      parentDeleted: false,
      userId: userId,
      createdAt: now,
      likesCount: 0,
      repliesCount: 0,
    });

    const newContentVersion = new ContentVersionEntity({
      id: await idGenerator.generate(),
      postId: newPost.id,
      createdAt: now,
      content: content,
    });

    await postRepository.createOne(newPost);
    await contentVersionRepository.createOne(newContentVersion);

    if (parentId) {
      postRepository.incrementReplyCountOnPost(parentId);
    }

    return newPost;
  }
}
