import { Model, Table, Column, DataType, TableOptions } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { Optional } from 'sequelize';


export interface CommentAttributes {
  id: number
  message: string
  user_id: number
  topic_id: number
}

type CommentAttributesCreateAttributes = Optional<CommentAttributes, 'id'>

@Table({
  freezeTableName: true,
  timeStamps: {
    updatedAt: false,
  },
} as TableOptions<Model>)
export class Comment extends Model<CommentAttributes, CommentAttributesCreateAttributes> {

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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  topic_id!: number;

  /*
  * TODO завершить описание отношений моделей
  * */
}
