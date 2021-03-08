import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class Country extends Model {
    public id!: number
    public name!: string
}

Country.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'Countries',
        sequelize
    }
)

export default Country
