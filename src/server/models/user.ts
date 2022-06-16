import { Optional } from 'sequelize';
import { Column, DataType, Model, Table, TableOptions, HasMany,  BelongsToMany } from 'sequelize-typescript';
import { ModelAttributeColumnOptions } from 'sequelize/types/model';
import { Theme, UserThemes, Topic, Comment, Reply, CommentReactions } from 'server/models/';

interface UserAttributes {
  id: number
  name: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

@Table({
  updatedAt: false,
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

  @BelongsToMany(() => Theme, { through: () => UserThemes })
  theme!: Theme;
  
  @HasMany(() => UserThemes, { onDelete: 'CASCADE' } )
  userThemes!: UserThemes[];

  @HasMany(() => Topic, { onDelete: 'SET NULL' } )
  topics!: Topic[];

  @HasMany(() => Comment, { onDelete: 'SET NULL' } )
  comments!: Comment[];
  
  @HasMany(() => Reply, { onDelete: 'SET NULL' } )
  replies!: Reply[];

  @HasMany(() => CommentReactions, { onDelete: 'SET NULL' } )
  commentReactions!: CommentReactions[];
}
