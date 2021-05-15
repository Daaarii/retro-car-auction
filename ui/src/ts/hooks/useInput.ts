import { useState } from 'react'


export const useInput = (initialValue: string = '') => {
    const [value, setValue] = useState(initialValue)
    const [isBlur, setBlur] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setBlur(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isBlur,
    }

}
