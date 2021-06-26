import { Pagination, Modal, Row, Badge, Link, Button, Fieldset, Grid, Tag, Text } from "@geist-ui/react";
import { Clock  } from '@geist-ui/react-icons'
import {useEffect, useState} from "react";
export default function Jobs () {
	const [jobs, setJobs] = useState([])
	const [modal, setModal] = useState(false)
	const [description, setDescription] = useState('')
	const [company, setCompany] = useState('')
	const [title, setTitle] = useState('')
	const [link, setLink] = useState('')

	async function fetchJobs() {
		const res = await fetch('https://kndwin-jobs.up.railway.app/jobs') 
		const data = await res.json()
		console.log({ data })
		const totalJobs = data.map((job: any) => {
			const stack = ['node', 'react', 'javascript', 'typescript', 'python', 'c++', 'bash'
				, 'c#', '.net', 'vue', 'php', 'aws'
			]
			const stackFromJob = stack.filter(tech => job.descriptionHTML.toLowerCase().includes(tech))
			return ({ ...job, stack: stackFromJob })
		})
		setJobs(totalJobs)
	}
	useEffect(() => {
		try {
			fetchJobs()
		} catch (err) {
			console.error(err)
		}
	}, [])

	function openModal(html: string, company: string, title: string, link: string) {
		setDescription(html)
		setCompany(company)
		setTitle(title)
		setLink(link)
		setModal(true)
	}

	function closeModal () {
		setModal(false)
		setDescription('')
	}

	return (
		<Grid.Container style={{ marginTop: '1em'}} gap={2} justify='flex-start'>
			{ jobs.map( ({ source, title, company, stack, link, timePosted, descriptionHTML}) => (
				<Grid xs={24} sm={12} key={`${company}: ${title}`}>
					<Fieldset style={{ width: '100%', height: 'fit-content'}}>
						<Fieldset.Title style={{ fontSize: '1em'}}>{title}</Fieldset.Title>
						<Fieldset.Subtitle>
							<Row>
								{company}
							</Row>
							<Row justify='start' style={{ alignItems: 'center'}}>
								<Clock size={16} />
								<Text  style={{ margin: '0.5em'}}>
									{ timePosted }
								</Text>
							</Row>
						</Fieldset.Subtitle>
						{stack.map((tech: string) => (
							<Badge key={tech} style={{ margin: '1em 1em 0 0'}}>
								{tech}
							</Badge>
						))}
						<Fieldset.Footer>
							<Fieldset.Footer.Status>
								Source: {source}
							</Fieldset.Footer.Status>
							<Fieldset.Footer.Actions>
								<Button auto size="mini" 
									onClick={() => openModal(descriptionHTML, company, title, link)} >
									Show more
								</Button>
							</Fieldset.Footer.Actions>
						</Fieldset.Footer>
					</Fieldset>
				</Grid>
			))}

			<Modal width='80%' open={modal} onClose={closeModal}>
				<Modal.Title>{title}</Modal.Title>
				<Modal.Subtitle>{company}</Modal.Subtitle>
        <Modal.Content>
					<div dangerouslySetInnerHTML={{ __html: description }} />
        </Modal.Content>
				<Modal.Action type='error' onClick={() => setModal(false)}>
					Cancel
				</Modal.Action>
				<Modal.Action>
					<Link href={link}>
						Go to site
					</Link>
				</Modal.Action>
      </Modal>
		</Grid.Container>
	)
}
