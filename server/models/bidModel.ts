import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class BidModel extends Model {
    public id!: number
    public price!: number
    public time!: string
}

BidModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'Bids',
        sequelize
    }
)

export default BidModel
