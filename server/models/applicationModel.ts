import { RequestOptions } from 'https'
import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class Application extends Model {
    public id!: number
    public status!: string
    public applicationTime!: string
}

Application.init(
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
        applicationTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'Applications',
        sequelize
    }
)

export default Application
