import Auction from './auctionModel'
import Brand from './brandModel'
import CarInfo from './carInfoModel'
import Car from './carModel'
import Country from './countryModel'
import UserAction from './userActionModel'
import User from './userModel'
import Role from './roleModel'
import UserRole from './userRoleModel'
import Bid from './bidModel'

function setEntityRelations() {
    Car.hasMany(CarInfo)
    
    Brand.hasMany(Car)
    
    Auction.hasOne(Car)
    Auction.hasMany(Bid)
    
    Country.hasMany(Brand)
    
    User.hasMany(Car)
    User.hasMany(Auction)
    User.hasMany(Bid)
    
    User.belongsToMany(Auction, { through: UserAction })
    Auction.belongsToMany(User, { through: UserAction })

    User.belongsToMany(Role, { through: UserRole })
    Role.belongsToMany(User, { through: UserRole })

}

export { Auction, Brand, CarInfo, Car, Country, User, Role, setEntityRelations }
