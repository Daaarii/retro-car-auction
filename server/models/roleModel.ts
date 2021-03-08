import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class Role extends Model {
    public id!: number
    public name!: string
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Roles',
        sequelize
    }
)

export default Role
