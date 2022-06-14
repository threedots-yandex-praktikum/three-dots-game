import { Optional } from 'sequelize';
import { Column, DataType, Model, Table, TableOptions } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';


interface UserAttributes {
  id: number
  message: string
  user_id: number
  topic_id: number
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

@Table({
  timeStamps: {
    updatedAt: false,
  },
} as TableOptions<Model>)
export class User extends Model<UserAttributes, UserCreationAttributes> {

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
}
