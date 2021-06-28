import { useCallback, useEffect} from "react"

type FetchJobsProps = {
	setJobs: (jobs: any[]) => void
}

export const useFetchJobs = ({ setJobs} : FetchJobsProps) => {

	const fetchJobs = useCallback(async () => {
		const res = await fetch('https://kndwin-jobs.up.railway.app/jobs') 
		const data = await res.json()
		console.log({ data })
		const totalJobs = data.map((job: any) => {
			const stack: string[] = ['node', 'react', 'javascript', 
				'typescript', 'python', 'c++', 'bash', 
			'c#', '.net', 'vue', 'php', 'aws'
			]
			const stackFromJob = stack.filter(tech => job.descriptionHTML.toLowerCase().includes(tech))
			return ({ ...job, stack: stackFromJob })
		})
		setJobs(totalJobs)
	}, [setJobs])

	useEffect(() => {
		fetchJobs
	}, [fetchJobs])

}
