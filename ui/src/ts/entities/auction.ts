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

export interface IAuctionData {
    [key: string]: string | ICarInfo
    model: string
    brand: string
    prodYear: string
    carCondition: string
    carInfo: ICarInfo
    auctionStartTime: string
    auctionEndTime: string
    startPrice: string
    minBid: string
    blitzPrice?: string
}
