import React, { useEffect, useState } from 'react'

import { useInput } from './useInput'
import { Validations, getErrorMessage } from '../utils/getErrorMessage'
import { EMAIL_REGEX } from '../constants'


export interface IUseInputWithValidation {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: () => void,
    errorMessages: Partial<Record<Validations, string>>,
    isEmpty: boolean,
    isBlur: boolean,
    isValid: boolean,
}

export const useInputWithValidation = (validations?: Partial<Record<Validations, string | number | boolean>>, initialValue: string = '') => {
    const { value, onChange } = useInput(initialValue)

    const [errorMessages, setErrorMessages] = useState<Partial<Record<Validations, string>>>({})

    const [isEmpty, setEmpty] = useState(true)
    const [minLengthError, setMinLengthError] = useState(false)
    const [isBlur, setBlur] = useState(false)
    const [maxLengthError, setMaxLengthError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [isValid, setValid] = useState(true)

    const setValidationCheck = (check: boolean, cb: (value: React.SetStateAction<boolean>) => void, validation: Validations, constraint?: number) => {
        if (check) {
            cb(true)
            setErrorMessages(errorMessages => ({ ...errorMessages, [validation]: getErrorMessage(validation, constraint) }))
        } else {
            cb(false)
            setErrorMessages(errorMessages => {
                const newErrorMessages = {} as Partial<Record<Validations, string>>
                Object.entries(errorMessages).forEach(([key, value]: [key: Validations, value: string]) => {
                    if (key !== validation) {
                        newErrorMessages[key] = value
                    }
                })
                return newErrorMessages
            })
        }
    }

    const checkPasswordValidation = (value: string) => {
        return /[A-Z]/.test(value) && /[0-9]/.test(value)
    }

    const onBlur = () => {
        !isBlur && setBlur(true)
    }

    useEffect(() => {
        if (validations) {
            Object.keys(validations).forEach(validation => {
                switch (validation) {
                    case Validations.isEmpty:
                        setValidationCheck(!value.trim(), setEmpty, validation)
                        break
                    case Validations.minLenth:
                        setValidationCheck(value.trim().length < validations[validation], setMinLengthError, validation, validations[validation] as number)
                        break
                    case Validations.maxLength:
                        setValidationCheck(value.trim().length > validations[validation], setMaxLengthError, validation, validations[validation] as number)
                        break
                    case Validations.isEmail:
                        setValidationCheck(!EMAIL_REGEX.test(value), setEmailError, validation)
                        break
                    case Validations.isPassword:
                        setValidationCheck(!checkPasswordValidation(value), setPasswordError, validation)
                        break
                }
            })
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLengthError || maxLengthError || emailError || passwordError) {
            if (isValid) {
                setValid(false)
            }
        } else {
            if (!isValid) {
                setValid(true)
            }
        }
    }, [isEmpty, minLengthError, maxLengthError, emailError, passwordError])

    return {
        value,
        onChange,
        onBlur,
        errorMessages,
        isEmpty,
        isBlur,
        isValid,
    }
}
