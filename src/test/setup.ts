import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => cleanup())

Object.defineProperty(window, 'scrollTo', { value: () => undefined, writable: true })
Object.defineProperty(HTMLElement.prototype, 'scrollBy', { value: () => undefined, writable: true })
