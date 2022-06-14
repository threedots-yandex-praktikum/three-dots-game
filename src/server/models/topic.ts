import { Optional } from 'sequelize';
import { Column, DataType, ForeignKey, Model, Table, TableOptions } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { User } from 'server/models/user';


interface TopicAttributes {
  id: number
  message: string
  user_id: number
  topic_id: number
}

type TopicCreationAttributes = Optional<TopicAttributes, 'id'>

@Table({
  timeStamps: {
    updatedAt: false,
  },
} as TableOptions<Model>)
export class Topic extends Model<TopicAttributes, TopicCreationAttributes> {

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
    type: DataType.INTEGER,
    allowNull: false,
  })
  status!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;
}
