import { UserEntity } from "@entities/user.entity";

export interface UserRepository {
  getOneById(id: string): Promise<UserEntity | null>;

  incrementFollowerCountForUser(userId: string): Promise<void>;

  decrementFollowerCountForUser(userId: string): Promise<void>;
}
