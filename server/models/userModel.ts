import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class User extends Model {
    public id!: number
    public email!: string
    public password!: string
    public role!: string
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
    },
    {
        tableName: 'Users',
        sequelize
    }
)

export default User
