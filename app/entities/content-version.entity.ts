type ContentVersionEntityParams = {
  id: string;
  postId: string;
  createdAt: number;
  content: string;
};

export class ContentVersionEntity {
  readonly id: string;
  readonly postId: string;
  readonly createdAt: number;
  readonly content: string;

  constructor({ id, postId, createdAt, content }: ContentVersionEntityParams) {
    this.id = id;
    this.postId = postId;
    this.createdAt = createdAt;
    this.content = content;
  }
}
