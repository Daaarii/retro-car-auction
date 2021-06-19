import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class Brand extends Model {
    public id!: number
    public name!: string
}

Brand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'Brands',
        sequelize
    }
)

export default Brand
