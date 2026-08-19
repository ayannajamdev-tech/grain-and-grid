import type { Metadata } from 'next'
import './globals.css'
import { Navbar, Footer, Toast } from '@/components/layout'
export const metadata: Metadata={title:'Grain & Grid — Fine Wooden Products',description:'Premium wooden furniture, educational materials, kitchen essentials and heirloom toys.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Navbar/><main>{children}</main><Footer/><Toast/></body></html>}
