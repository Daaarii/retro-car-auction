import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class CarInfo extends Model {
    public id!: number
    public title!: string
    public description!: string
}

CarInfo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'CarInfos',
        sequelize
    }
)

export default CarInfo
