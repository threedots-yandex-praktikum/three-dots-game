import { Optional } from 'sequelize';
import { Column, DataType, ForeignKey, Model, Table, TableOptions } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { User, Comment } from 'server/models';


interface ReplyAttributes {
  id: number
  message: string
  userId: number
  commentId: number
  parentId: number
}

type ReplyCreationAttributes = Optional<ReplyAttributes, 'id'>

@Table({} as TableOptions<Model>)
export class Reply extends Model<ReplyAttributes, ReplyCreationAttributes> {

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

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId!: number;

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parentId!: number;
}
