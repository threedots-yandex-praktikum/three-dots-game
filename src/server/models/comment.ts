import { Model, Table, Column, DataType, TableOptions, ForeignKey } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { Optional } from 'sequelize';
import { User } from 'server/models/user';
import { Topic } from 'server/models/topic';


interface CommentAttributes {
  id: number
  message: string
  userId: number
  topicId: number
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>

@Table({
  updatedAt: false,
} as TableOptions<Model>)
export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {

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
  message!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  topicId!: number;
}
