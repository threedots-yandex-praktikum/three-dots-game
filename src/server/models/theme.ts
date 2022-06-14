import { Optional } from 'sequelize';
import { Column, DataType, ForeignKey, Model, Table, TableOptions } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { User } from 'server/models/user';


export enum themeStatus {
  ACTIVE = 0,
  AVAILABLE = 1,
  UNAVAILABLE = 2
}

interface ThemeAttributes {
  id: number
  name: string
  status: themeStatus
  userId: number
}

type ThemeCreationAttributes = Optional<ThemeAttributes, 'id'>

@Table({
  timeStamps: false,
} as TableOptions<Model>)
export class Theme extends Model<ThemeAttributes, ThemeCreationAttributes> {

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
