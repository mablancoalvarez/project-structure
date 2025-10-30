import type { ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { PostContextProvider } from '@/context/PostContextProvider'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <PostContextProvider>{children}</PostContextProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
