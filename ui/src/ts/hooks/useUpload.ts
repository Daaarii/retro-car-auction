import { useState } from 'react'




export const useUpload = (multiple?: boolean) => {
    const [value, setValue] = useState<File | FileList>(null)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (multiple) {
            setValue(e.target.files)
        } else {
            setValue(e.target.files[0])
        }
    }
    return {
        value,
        onChange,
    }

}
