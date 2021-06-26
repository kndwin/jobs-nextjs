import { Text, Page } from '@geist-ui/react'
import React, { ReactElement } from "react"

import Image from 'next/image'

export interface LayoutProps {
	children: React.ReactNode,
}

export default function Layout({ children }: LayoutProps): ReactElement | null {
	return (
		<Page size='small'>
			<Page.Header style={{
				padding: '2em 0', 
				display: 'flex', 
				justifyContent: 'flex-start',
				alignItems: 'center'
				}}>
				
				<Image src='/Icon.webp' 
					width={50} 
					height={50}
					alt='Icon' 
				/>
				<Text h3 style={{ marginLeft: '1em'}}>
					Software jobs in Sydney
				</Text>
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
