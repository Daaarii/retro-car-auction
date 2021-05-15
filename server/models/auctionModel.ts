import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class Auction extends Model {
    public id!: number
    public status!: string
    public startTime!: string
    public endTime!: string
    public startPrice!: number
    public minBid!: number
    public blitzPrice!: number
}

Auction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
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
        minBid: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        blitzPrice: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }
    },
    {
        tableName: 'Auctions',
        sequelize
    }
)

export default Auction
