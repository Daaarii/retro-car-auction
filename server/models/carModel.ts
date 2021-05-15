import { Model, DataTypes } from 'sequelize'

import sequelize from '../utils/database'


class Car extends Model {
    public id!: number
    public model!: string
    public image!: string[]
    public prodYear!: number | null
    public carCondition!: number
    // public historyOfTheCar!: string
    // public engineCapacity!: number
    // public carInteriorRating!: string
    // public numberOfDoors!: number
    // public carMileage!: number
    // public carColor!: string
    // public fuelType!: string
    // public carInteriorColor!: string
    // public serviceLife!: number
    // public steeringWheelLocation!: string
    // public transmission!: string
    // public equipment!: string[]
    // public numberOfSeatsInTheCar!: number
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
        // historyOfTheCar: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // engineCapacity: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        // carInteriorRating: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // numberOfDoors: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        // carMileage: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        // carColor: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // fuelType: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // carInteriorColor: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // serviceLife: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        // steeringWheelLocation: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // transmission: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // equipment: {
        //     type: DataTypes.ARRAY(DataTypes.STRING),
        //     allowNull: true,
        // },
        // numberOfSeatsInTheCar: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
    },
    {
        tableName: 'Cars',
        sequelize
    }
)

export default Car
