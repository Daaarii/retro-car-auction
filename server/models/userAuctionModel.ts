import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class UserAuction extends Model {
    public id!: number
}

UserAuction.init(
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

export default UserAuction
