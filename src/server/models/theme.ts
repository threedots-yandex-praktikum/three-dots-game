import { Optional } from 'sequelize';
import { Column, DataType, Model, Table, TableOptions, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { User, UserThemes } from './';

interface ThemeAttributes {
  id: number
  name: string
}

type ThemeCreationAttributes = Optional<ThemeAttributes, 'id'>

@Table({
  updatedAt: false,
  createdAt: false,
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

  @BelongsToMany(() => User, { through: () => UserThemes })
  theme!: Theme;
  
  //если темы в таблице нет, то использовать тему по умолчанию
  @HasMany(() => UserThemes, { onDelete: 'CASCADE' } )
  userThemes!: UserThemes[];

}
