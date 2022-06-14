import { Optional } from 'sequelize';
import { Column, DataType, ForeignKey, Model, Table, TableOptions } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { User } from 'server/models/user';


export enum topicStatus {
  OPEN = 0,
  CLOSED = 1,
}

interface TopicAttributes {
  id: number
  name: string
  status: number
  userId: number
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
