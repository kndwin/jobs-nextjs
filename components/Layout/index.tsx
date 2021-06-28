import { signIn, signOut, useSession } from 'next-auth/client'
import { Row, Button, Text, Page } from '@geist-ui/react'
import { Github } from '@geist-ui/react-icons'
import React, { ReactElement } from "react"

import Image from 'next/image'

export interface LayoutProps {
	children: React.ReactNode,
}

export default function Layout({ children }: LayoutProps): ReactElement | null {
  const [ session, loading ] = useSession()
	return (
		<Page size='small'>
			<Page.Header style={{
				padding: '2em 0', 
				display: 'flex', 
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '100%'
				}}>
				
				<Row>
				<Image src='/Icon.webp' 
					width={50} 
					height={50}
					alt='Icon' 
				/>
				<Text h3 style={{ marginLeft: '1em'}}>
					Software jobs in Sydney
				</Text>
				</Row>


				{!session && <>
					<Button 
						auto
						ghost
						size='medium'
						type='secondary'
						icon={<Github/>} 
						onClick={() => signIn('github')}>
						<Text b>
							Sign in
						</Text>
					</Button>
				</>}
				{session && <>
					Signed in as {session.user.email} <br/>
			<Button onClick={() => signOut()}>Sign out</Button>
    </>}
			</Page.Header>
			<Page.Content style={{ paddingTop: '0.5em'}}>
				{children}
			</Page.Content>
			<Page.Footer style={{ 
				display: 'flex', 
				justifyContent: 'center',
				padding: '1.5em 0'
			}}>
			</Page.Footer>
		</Page>
	)
}
