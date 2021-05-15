import React, { useState, useRef } from 'react'

import retroCarAuctionClient  from '../api/retroCarAuctionClient'


export const PAddCar = () => {
    const [carModel, setCarModel] = useState<string>('')
    const [manufacturer, setManufacturer] = useState<string>('')
    const [carProdYear, setCarProdYear] = useState<number>(0)
    const [carImage, setCarImage] = useState<File>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const addCar = () => {
        const formData = new FormData()
        formData.append('carModel', carModel)
        formData.append('manufacturer', manufacturer)
        if (carProdYear) {
            formData.append('carProdYear', `${carProdYear}`)
        }
        formData.append('file', carImage)

        retroCarAuctionClient.addCar(formData)
            .then(response => response.json())
    }

    const handleImageLoad = () => {
        fileInputRef.current.click()
    }

    return (
        <div className="add-car-container">
            <div className="add-car__item">
                <span>Car Model</span>
                <input value={carModel} onChange={(e) => setCarModel(e.target.value)} />
            </div>
            <div className="add-car__item">
                <span>Manufacturer</span>
                <input value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
            </div>
            <div className="add-car__item">
                <span>Car Production Year</span>
                <input type="number" value={carProdYear} onChange={(e) => setCarProdYear(+e.target.value)} />
            </div>
            <div className="add-car__item">
                <span>Car Image</span>
                <div className="add-car__file-input">
                    <input type="file" ref={fileInputRef} onChange={(e) => setCarImage(e.target.files[0])} />
                    <div onClick={handleImageLoad}>Select File</div>
                    <div>{carImage && carImage.name}</div>
                </div>
            </div>
            <button className="add-car__add-button" onClick={addCar}>Add Car</button>
        </div>
    )
}
