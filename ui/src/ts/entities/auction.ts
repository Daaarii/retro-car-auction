export enum Transmission {
    AT = 'AT',
    MT = 'MT',
    FA = 'FA',
    F6 = 'F6',
    F5 = 'F5',
    F4 = 'F4',
    F3 = 'F3',
    F2 = 'F2',
    F1 = 'F1',
    CA = 'CA',
    C5 = 'C5',
    C4 = 'C4',
    C3 = 'C3',
    C2 = 'C2',
    C1 = 'C1',
}

export enum Equipment {
    AC = 'AC',
    AW = 'AW',
    TV = 'TV',
    LS = 'LS',
    PS = 'PS',
    PW = 'PW',
    SR = 'SR',
    Nothing = 'Nothing',
}

export enum Rating {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
}

export enum Fuel {
    Petrol = 'Petrol',
    Diesel = 'Diesel',
    Gas = 'Gas',
    Electricity = 'Electricity',
}

export enum SteeringWheelLocation {
    Left = 'Left',
    Right = 'Right',
}

interface ICarInfo {
    [key: string]: string | Rating | Fuel | Transmission | SteeringWheelLocation | FileList,
    historyOfTheCar: string
    engineCapacity: string
    carInteriorRating: Rating
    numberOfDoors: string
    carMileage: string
    carColor: string
    fuelType: Fuel
    carInteriorColor: string
    serviceLife: string
    steeringWheelLocation: SteeringWheelLocation
    transmission: Transmission
    equipment: string
    numberOfSeatsInTheCar: string
    files: FileList
}

export interface IApplicationDataRequest {
    [key: string]: string | ICarInfo
    model: string
    brand: string
    prodYear: string
    carCondition: string
    carInfo?: ICarInfo
    applicationTime: string
    startPrice: string
    minBid: string
    blitzPrice?: string

}

export interface IAuctionDataRequest {
    [key: string]: string | ICarInfo
    model: string
    brand: string
    prodYear: string
    carCondition: string
    carInfo?: ICarInfo
    auctionStartTime: string
    startPrice: string
    minBid: string
    blitzPrice?: string
}

export enum AuctionStatus {
    PENDING = 'Pending',
    STARTED = 'Started',
    ENDED = 'Ended',
}

export interface IRequestResponse {
    CarId: number
    UserId: number
    blitzPrice?: number
    createdAt: string
    id: number
    minBid: number
    startPrice: number
    applicationTime: string
    status: AuctionStatus
    updatedAt: string

}

export interface IAuctionResponse {
    CarId: number
    UserId: number
    blitzPrice?: number
    createdAt: string
    id: number
    minBid: number
    startPrice: number
    startTime: string
    status: AuctionStatus
    updatedAt: string
}

export interface ICarResponse {
    BrandModalId: number
    UserId: number
    carCondition: number
    createdAt: string
    id: number
    image: string[]
    model: string
    prodYear: number
    updatedAt: string
}

export interface IUserResponse {
    avatar: string
    createdAt: string
    email: string
    firstName: string
    id: number
    lastName: string
    nickname: string
    role: string
    updatedAt: string
}

export interface IAuctionsDataResponse {
    auctions: IAuctionResponse[],
    cars: ICarResponse[],   
    users: IUserResponse[],
}

type CarInfo = { [key: string]: string }

export interface IBidData {
    auctionId: number,
    userId: number,
    bid: number,
}

export interface IBid {
    id: number,
    time: string,
    price: number,
}

export interface IAuctionDataResponse {
    auction: Partial<IAuctionResponse>,
    car: Partial<ICarResponse>,
    user: Partial<IUserResponse>,
    carInfo: CarInfo[],
    bids: IBid[],
}

export const mapVariablesToHuman = new Map(
    [
        ['historyOfTheCar', 'History of the car'],
        ['engineCapacity', 'Engine capacity'],
        ['carInteriorRating', 'Car interior rating'],
        ['numberOfDoors', 'Number of doors'],
        ['carMileage', 'Car mileage'],
        ['carColor', 'Car color'],
        ['fuelType', 'Fuel type'],
        ['carInteriorColor', 'Car interior color'],
        ['serviceLife', 'Service life'],
        ['steeringWheelLocation', 'Steering wheel location'],
        ['transmission', 'Transmission'],
        ['equipment', 'Equipment'],
        ['numberOfSeatsInTheCar', 'Number of seats in the car'],
    ]
)

export interface ICountry {
    country: string,
}

export interface IBrand {
    brand: string,
    countryId: number,
}

export interface IModel {
    model: string,
    brandId: number,
}
