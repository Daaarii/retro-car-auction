import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class Car extends Model {
    public id!: number
    public model!: string
    public image!: string[]
    public prodYear!: number | null
    public carCondition!: number
}

Car.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        prodYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        carCondition: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: 'Cars',
        sequelize
    }
)

export default Car
