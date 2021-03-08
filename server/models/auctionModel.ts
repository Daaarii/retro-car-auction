import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class Auction extends Model {
    public id!: number
    public startTime!: string
    public endTime!: string
    public startPrice!: number
}

Auction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        startPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'Auctions',
        sequelize
    }
)

export default Auction
