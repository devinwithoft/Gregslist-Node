import { dbContext } from "../db/DbContext.js";

class CarsService {
    async getAll(query) {
        const cars = await dbContext.Cars.find(query).sort('model')
        return cars
    }

    async create(carData) {
        const newCar = await dbContext.Cars.create(carData)
        return newCar
    }

    async remove(carId) {
        const car = await dbContext.Cars.findById(carId)
        if (!car) throw new BadRequest('no car located with this ID')

        await car.remove()
        return `deleted ${car.make} ${car.model}`
    }


    async update(carId, carData) {
        const original = await dbContext.Cars.findById(carId)
        if (!original) throw new BadRequest('no car located with this ID')
        original.price = carData.price !== undefined ? carData.price : original.price
        original.imgUrl = carData.imgUrl ? carData.imgUrl : original.imgUrl
        original.year = carData.year !== undefined ? carData.year : original.year
        original.description = carData.description ? carData.description : original.description
        original.color = carData.color ? carData.color : original.color

        await original.save()
        return original
    }
}

export const carsService = new CarsService()