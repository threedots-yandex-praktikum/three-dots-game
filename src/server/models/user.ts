import { Optional } from "sequelize";
import {
  Column,
  DataType,
  Model,
  Table,
  TableOptions,
  HasMany,
} from "sequelize-typescript";
import { ModelAttributeColumnOptions } from "sequelize/types/model";
import { Topic, Comment, CommentReactions } from "server/models/";

export enum userTheme {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

interface UserAttributes {
  id: number;
  name: string;
  theme: userTheme;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

@Table({
  updatedAt: false,
} as TableOptions<Model>)
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  } as ModelAttributeColumnOptions)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: userTheme.LIGHT,
  })
  theme!: userTheme;

  @HasMany(() => Topic, { onDelete: "SET NULL" })
  topics!: Topic[];

  @HasMany(() => Comment, { onDelete: "SET NULL" })
  comments!: Comment[];

  @HasMany(() => CommentReactions, { onDelete: "SET NULL" })
  commentReactions!: CommentReactions[];
}
