export const urls = {
    home: '/',

    rules: '/rules',

    auctions: '/auctions',

    signIn: '/users/sign_in',
    signUp: '/users/sign_up',

    userProfile: '/users/profile',

    newAuction: '/new_auction',

    auction: '/auction/:id',
    auctionPath: (id: number) => `/auction/${id}`,

    application: '/application/:id',
    applicationPath: (id: number) => `/application/${id}`,

    registrationInAuction: '/auction_registration/:id',
    registrationInAuctionPath: (id: number) => `/auction_registration/${id}`,

    admin: '/admin',
}