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

  @ForeignKey(() => Reaction)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reactionId!: number;

  @BelongsTo(() => Reaction)
  reaction!: Reaction;

  @ForeignKey(() => Comment)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId!: number;

  @BelongsTo(() => Comment)
  comment!: Comment;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId!: number;

  @BelongsTo(() => User)
  reactionUser!: User[];
}
