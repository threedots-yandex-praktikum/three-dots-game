import { Model, Table, Column, DataType, TableOptions, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { Optional } from 'sequelize';
import { User, Topic, Reply, Reaction, CommentReactions } from 'server/models/';

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
    allowNull: true,
    
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  topicId!: number;

  @BelongsTo(() => Topic)
  topics!: Topic;

  @HasMany(() => Reply, { onDelete: 'CASCADE' } )
  replies!: Reply[];

  @BelongsToMany(() => Reaction, { through: () => CommentReactions })
  theme!: Reaction;

}
