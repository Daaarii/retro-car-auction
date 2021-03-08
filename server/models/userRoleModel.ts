import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class UserRoleModel extends Model {
    public id!: number
}

UserRoleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        tableName: 'UsersRoles',
        sequelize
    }
)

export default UserRoleModel
