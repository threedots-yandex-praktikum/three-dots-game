import {
  Model,
  Table,
  Column,
  DataType,
  TableOptions,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { User, Reaction, Comment  } from 'server/models/';

interface CommentReactionsAttributes {
  reactionId: number
  commentId: number
  userId: number
}

@Table({
  updatedAt: false,
  createdAt: false,
} as TableOptions<Model>)
export class CommentReactions extends Model<CommentReactionsAttributes> {

  @PrimaryKey
  @ForeignKey(() => Reaction)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reactionId!: number;

  @BelongsTo(() => Reaction)
  reaction!: Reaction;

  @PrimaryKey
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId!: number;

  @BelongsTo(() => Comment)
  comment!: Comment;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  reactionUser!: User[];
}
