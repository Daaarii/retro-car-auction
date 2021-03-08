import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class UserActionModel extends Model {
    public id!: number
}

UserActionModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        tableName: 'UsersAuctions',
        sequelize
    }
)

export default UserActionModel
