import create from 'zustand'
import { Job } from 'types'

type JobsStore = {
	jobs: Job[]
	setJobs: (jobs: Job[]) => void
}

export const useJobsStore = create<JobsStore>(set => ({
	jobs: [],
	setJobs: (jobs) => set({ jobs: jobs})
}))
