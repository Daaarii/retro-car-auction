import { IUseInputWithValidation } from '../hooks/useInputWithValidation'

export const getValidationProps = (
    { value, onChange, onBlur, errorMessages, isBlur, isValid }: IUseInputWithValidation,
    serverValidationInfo?: string,
) => {
    return {
        value,
        onChange,
        onBlur,
        error: !isValid && isBlur || !!serverValidationInfo,
        helperText: (!isValid && isBlur && Object.values(errorMessages).join('. ')) ||
            !!serverValidationInfo && serverValidationInfo,
    }
}
