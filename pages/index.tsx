import { Text, Input } from '@geist-ui/react'
import {useState} from 'react'
import Fuse from 'fuse.js'
import { Search } from '@geist-ui/react-icons'

import { Layout, Jobs } from 'components'
import { Job } from 'type'
import {useJobsStore} from 'store'

export default function Home() {
	const { jobs, setJobs } = useJobsStore()
	const [searchMessage, setSearchMessage] = useState<string>('')

	const setJobsVisiblity = (e: React.ChangeEvent) => {
		const searchTerm = (e.target as HTMLInputElement).value 
		// if searchTerm is empty, set all films to be visible
		setSearchMessage('')
		if (searchTerm.length == 0) {
			const resetJobVisibility = jobs.map((job) => {
				return {...job, isVisible: true}
			})

			setJobs(resetJobVisibility)
		} else {
			const fuse = new Fuse(jobs, {
				threshold: 0.2,  //https://fusejs.io/api/options.html#threshold
				keys: [`title`]
			})

			const filteredFilmsTitles = fuse.search(searchTerm)
				.map( ({ item }) =>  item.title)

			if (filteredFilmsTitles.length == 0 ) {
				setSearchMessage('😢 No Search found')
			}

			const updatedJobsVisibility = jobs.map((film) => {
				const isVisible = filteredFilmsTitles.includes(film.title)
				return {...film, isVisible}
			})

			setJobs(updatedJobsVisibility)
		}
	}
	return (
		<Layout>
			<Input onChange={(e) => setJobsVisiblity(e)}
				placeholder='Search'
				width='100%' icon={ <Search/>} />
				{ searchMessage.length > 0 ? searchMessage : ''}
			<Jobs />
		</Layout>
	)
}
