import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class User extends Model {
    public id!: number
    public firstName!: string
    public lastName!: string
    public nickname!: string
    public email!: string
    public password!: string
    public role!: string
    public avatar!: string
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'Users',
        sequelize
    }
)

export default User
