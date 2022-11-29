import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class HomesService {
    async getAll(query) {
        const homes = await dbContext.Homes.find(query)
        return homes
    }

    async create(homeData) {
        const newHome = await dbContext.Homes.create(homeData)
        return newHome
    }

    async update(id, homeData) {
        const original = await dbContext.Homes.findById(id)
        if (!original) throw new BadRequest('no home here')
        original.bedrooms = homeData.bedrooms ? homeData.bedrooms : original.bedrooms
        original.bathrooms = homeData.bathrooms ? homeData.bathrooms : original.bathrooms
        original.levels = homeData.levels ?
            homeData.levels : original.levels
        original.description = homeData.description ? homeData.description : original.description
        original.price = homeData.price ? homeData.price : original.price

        await original.save()
        return original
    }

    async remove(id) {
        const home = await dbContext.Homes.findById(id)
        if (!home) throw new BadRequest('no home located')

        await home.remove()
        return `deleted ${home.bedrooms} beds ${home.bathrooms} baths home`
    }
}


export const homesService = new HomesService()