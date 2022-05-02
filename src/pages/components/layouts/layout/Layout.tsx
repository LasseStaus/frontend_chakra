import type { FC } from 'react'
import BaseLayout, { BaseLayoutProps } from '../base-layout/Base-layout'

type Props = Omit<BaseLayoutProps, 'session'>

// TODO: case when you are logged in should still show correct menu
const Layout: FC<Props> = (p: Props) => <BaseLayout {...p}>{p.children}</BaseLayout>

export default Layout
