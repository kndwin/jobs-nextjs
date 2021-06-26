import { Text, Input } from '@geist-ui/react'
import { Search } from '@geist-ui/react-icons'
import { Layout } from 'components'
import Jobs from 'components/Jobs'

export default function Home() {
  return (
		<Layout>
			<Input width='100%' icon={ <Search/>} />
			<Jobs />
		</Layout>
  )
}
