import { makeAutoObservable } from 'mobx'

import RCAClient from '../api/retroCarAuctionClient'
import { IApplicationDataRequest, IAuctionDataRequest, IBrand, ICountry, IModel } from '../entities/auction'
import { ISignInData, ISignUpData } from '../entities/auth'

import authStorage from '../utils/authStorage'


class User {
    constructor() {
        makeAutoObservable(this)
    }

    loading: boolean = false
    error: Error = null
    id: number = Number(authStorage.getUserid())
    isAuth: boolean = authStorage.getToken() && Date.now() < Number(authStorage.getExpiryDate())
    role: string = 'admin'
    signUpFieldErrors: Record<string, string> = {}
    signInFieldErrors: Record<string, string> = {}
    moneyBalance: number = 10000
    auctionsUserParticipates: number[] = []

    signUp = async (data: ISignUpData) => {
        this.loading = true
        try {
            const response = await RCAClient.signUp(data)
            if (!response.ok) {
                this.signUpFieldErrors = await response.json()
            } else {
                this.signUpFieldErrors = {}
                return { redirect: true }
            }
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }

    }

    signIn = async (data: ISignInData) => {
        this.loading = true
        try {
            const response = await RCAClient.signIn(data)
            if (!response.ok) {
                this.signInFieldErrors = await response.json()
            } else {
                const { token, expiryDate, userId } = await response.json()
                authStorage.addToken(token, expiryDate, userId)

                await this.fetchUserData(userId)

                this.autoLogout(Number(authStorage.getExpiryDate()) - Date.now())
                this.isAuth = true
                this.signInFieldErrors = {}

                return { redirect: true }
            }
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    fetchUserData = async (userId: number) => {
        try {
            const responseUserData = await RCAClient.getUserData(userId)
            if (!responseUserData.ok) {
                this.error = new Error()
            } else {
                const { auctionsUserParticipates } = await responseUserData.json()
                console.log('fetch', auctionsUserParticipates)
                this.auctionsUserParticipates = auctionsUserParticipates || []
            }
        } catch (err) {
            this.error = err
        }
    }

    signOut = () => {
        this.isAuth = false

        authStorage.clear()
    }

    autoLogout = (ms: number) => {
        setTimeout(() => {
            authStorage.clear()
            this.isAuth = false
        }, ms)
    }

    makeRequest = async (auctionData: IApplicationDataRequest) => {
        this.loading = true
        try {
            const response = await RCAClient.makeRequest(auctionData)
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    // createAuction = async (auctionData: IAuctionDataRequest) => {
    //     this.loading = true
    //     try {
    //         const response = await RCAClient.createAuction(auctionData)
    //         if (response.ok) {
    //             return {
    //                 result: 0,
    //             }
    //         }
    //     } catch (err) {
    //         this.error = err
    //     } finally {
    //         this.loading = false
    //     }
    // }

    acceptApplication = async (id: number, auctionStartTime: string) => {
        try {
            const response = await RCAClient.acceptApplication(id, auctionStartTime)
            if (response.ok) {
                return {
                    result: 0,
                }
            }
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    rejectApplication = async (id: number) => {
        try {
            const response = await RCAClient.rejectApplication(id)
            if (response.ok) {
                return {
                    result: 0,
                }
            }
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    registerInAuction = async (userId: string, auctionId: string) => {
        this.loading = true
        try {
            const response = await RCAClient.registerInAuction(userId, auctionId)
            const { id } = await response.json()
            this.auctionsUserParticipates.push(id)
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

    addCountry = async (data: ICountry) => {
        try {
            const response = await RCAClient.addCountry(data)
            if (response.ok) {
                return { result: 0 }
            }
            return { result: 1 }
        } catch (err) {
            this.error = err
        }
    }

    addBrand = async (data: IBrand) => {
        try {
            const response = await RCAClient.addBrand(data)
            if (response.ok) {
                return { result: 0 }
            }
            return { result: 1 }
        } catch (err) {
            this.error = err
        }
    }

    addModel = async (data: IModel) => {
        try {
            const response = await RCAClient.addModel(data)
            if (response.ok) {
                return { result: 0 }
            }
            return { result: 1 }
        } catch (err) {
            this.error = err
        }
    }

}

export default new User()
