import { Column, DataType, BelongsTo, Model, Table, TableOptions, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { User, Theme } from 'server/models';

interface UserThemesAttributes {
  themeId: number
  userId: number
}

@Table({
  updatedAt: false,
  createdAt: false,
} as TableOptions<Model>)
export class UserThemes extends Model<UserThemesAttributes> {

  @ForeignKey(() => Theme)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  themeId!: number;

  @BelongsTo(() => Theme)
  theme!: Theme;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
