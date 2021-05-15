import { makeAutoObservable } from 'mobx'

import RCAClient from '../api/retroCarAuctionClient'
import { IAuctionData } from '../entities/auction'
import { ISignInData, ISignUpData } from '../entities/auth'

import authStorage from '../utils/authStorage'


class User {
    constructor() {
        makeAutoObservable(this)
    }

    loading: boolean = false
    error: Error = null
    isAuth: boolean = authStorage.getToken() && Date.now() < Number(authStorage.getExpiryDate())
    signUpFieldErrors: Record<string, string> = {}
    signInFieldErrors: Record<string, string> = {}
    userData = {}
    // createdAuctions = []
    // otherAuctions = []

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

                const userData = await RCAClient.getUserData(userId)
                
                this.autoLogout(Number(authStorage.getExpiryDate()) - Date.now())
                this.isAuth = true
                this.signInFieldErrors = {}

                if (!userData.ok) {
                    this.error = new Error()
                } else {
                    // const { avatar }  = await userData.json()
                    // this.avatar = avatar
                    return { redirect: true }
                }
            }
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
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

    createAuction = async (auctionData: IAuctionData) => {
        this.loading = true
        try {
            const response = await RCAClient.createAuction(auctionData)
            if (response.ok) {

            }
        } catch (err) {
            this.error = err
        } finally {
            this.loading = false
        }
    }

}

export default new User()
