import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class BrandModal extends Model {
    public id!: number
    public name!: string
}

BrandModal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'Brands',
        sequelize
    }
)

export default BrandModal
