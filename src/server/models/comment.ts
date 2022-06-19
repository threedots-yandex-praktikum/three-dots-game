import { Model, Table, Column, DataType, TableOptions, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { Optional } from 'sequelize';
import { User, Topic, Reaction, CommentReactions } from 'server/models/';


interface CommentAttributes {
  id: number
  message: string
  userId: number
  topicId: number
  parentId: number
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
    allowNull: true,

  })
  userId!: number;

  @BelongsTo(() => User, { as: 'author' })
  user!: User;

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  topicId!: number;

  @BelongsTo(() => Topic)
  topic!: Topic;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parentId!: number;

  @HasMany(() => Comment, { onDelete: 'CASCADE' } )
  replies!: Comment[];

  @BelongsToMany(() => Reaction, { through: () => CommentReactions, onDelete: 'CASCADE' })
  reactions!: Reaction[];

  @BelongsToMany(() => User, { through: () => CommentReactions, onDelete: 'CASCADE' })
  reactionUsers!: User[];
}
