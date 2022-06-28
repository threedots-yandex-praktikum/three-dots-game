import { Model, Table, Column, DataType, TableOptions, BelongsToMany } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { Optional } from 'sequelize';
import { CommentReactions, Comment } from 'server/models/';

interface ReactionAttributes {
  id: number
  code: string
}

type ReactionCreationAttributes = Optional<ReactionAttributes, 'id'>

@Table({
  updatedAt: false,
  createdAt: false,
} as TableOptions<Model>)
export class Reaction extends Model<ReactionAttributes, ReactionCreationAttributes> {

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
  code!: string;

  @BelongsToMany(() => Comment, { through: () => CommentReactions })
  comments!: Comment[];
}
