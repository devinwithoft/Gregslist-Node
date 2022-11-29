import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class JobsService {
    async getAll(query) {
        const jobs = await dbContext.Jobs.find(query)
        return jobs
    }

    async create(jobData) {
        const newJob = await dbContext.Jobs.create(jobData)
        return newJob
    }

    async remove(id) {
        const job = await dbContext.Jobs.findById(id)
        if (!job) throw new BadRequest('no job found to delete')
        await job.remove()
        return `deleted ${job.jobTitle} job`
    }

    async update(id, jobData) {
        const original = await dbContext.Jobs.findById(id)
        if (!original) throw new BadRequest('this job does not exist')

        original.jobTitle = jobData.jobTitle ? jobData.jobTitle : original.jobTitle
        original.company = jobData.company ? jobData.company : original.company
        original.hours = jobData.hours ? jobData.hours : original.hours
        original.rate = jobData.rate ? jobData.rate : original.rate
        original.description = jobData.description ? jobData.description : original.description

        await original.save()
        return original
    }
}

export const jobsService = new JobsService()