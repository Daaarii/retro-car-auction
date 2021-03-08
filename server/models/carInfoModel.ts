import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class CarInfoModel extends Model {
    public id!: number
    public title!: string
    public description!: string
}

CarInfoModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'CarInfos',
        sequelize
    }
)

export default CarInfoModel
