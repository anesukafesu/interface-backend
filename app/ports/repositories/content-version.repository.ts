import { ContentVersionEntity } from "../../entities/content-version.entity";

export interface ContentVersionRepository {
  createOne(contentVersion: ContentVersionEntity): Promise<void>;

  deleteManyByPostId(postId: string): Promise<void>;
}
