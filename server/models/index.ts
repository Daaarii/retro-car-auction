import Auction from './auctionModel'
import Brand from './brandModel'
import CarInfo from './carInfoModel'
import Car from './carModel'
import Country from './countryModel'
import UserAuction from './userAuctionModel'
import User from './userModel'
import Bid from './bidModel'
import Application from './applicationModel'

import countries from '../countries'
import brands from '../brands'

const countryRecords = countries.map(country => ({ name: country }))

function setEntityRelations() {
    Car.hasMany(CarInfo)
    Car.hasOne(Auction)

    Brand.hasMany(Car)
    
    Auction.hasOne(Application)
    Auction.hasMany(Bid)
    
    Country.hasMany(Brand)
    
    User.hasMany(Car)
    User.hasMany(Auction)
    User.hasMany(Application)
    User.hasMany(Bid)
    
    User.belongsToMany(Auction, { through: UserAuction })
    Auction.belongsToMany(User, { through: UserAuction })
   
}

export { Auction, Bid, Brand, CarInfo, Car, Country, User, Application, setEntityRelations }
