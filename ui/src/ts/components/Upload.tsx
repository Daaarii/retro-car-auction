import React from 'react'
import { Button } from '@material-ui/core'


export const Upload = ({ onChange, multiple }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, multiple?: boolean }) => {
    return (
        <div>
            <input
                id="upload"
                type="file"
                style={{ display: 'none' }}
                onChange={onChange}
                multiple={Boolean(multiple)}
            />
            <label htmlFor="upload">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
        </div>
    )
}
