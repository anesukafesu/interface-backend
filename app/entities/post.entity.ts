type PostEntityParams = {
  id: string;
  parentId: string | null;
  parentDeleted: boolean;
  userId: string;
  createdAt: number;
  likesCount: number;
  repliesCount: number;
};

export class PostEntity {
  readonly id: string;
  readonly parentId: string | null;
  readonly parentDeleted: boolean;
  readonly userId: string;
  readonly createdAt: number;
  readonly likesCount: number;
  readonly repliesCount: number;

  constructor({
    id,
    parentId,
    parentDeleted,
    userId,
    createdAt,
    likesCount,
    repliesCount,
  }: PostEntityParams) {
    this.id = id;
    this.parentId = parentId;
    this.parentDeleted = parentDeleted;
    this.userId = userId;
    this.createdAt = createdAt;
    this.likesCount = likesCount;
    this.repliesCount = repliesCount;
  }
}
