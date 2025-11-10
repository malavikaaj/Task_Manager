// Minimal React/JSX and module stubs to satisfy TypeScript in environments
// where node modules are not installed. These are lightweight declarations
// to reduce editor diagnostics and are not a replacement for actual typings.

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
  interface IntrinsicAttributes {
    key?: any
  }
  interface ElementChildrenAttribute {
    children: {}
  }
}

declare module 'react' {
  export const StrictMode: any
  export const Fragment: any
  export function useState<T>(initial: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void]
  export function useEffect(effect: (...args: any[]) => any, deps?: any[]): void
  export function useMemo<T>(factory: () => T, deps?: any[]): T
  const ReactDefault: any
  export default ReactDefault
}

declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}

declare module 'react-dom/client' {
  export function createRoot(container: any): { render(node: any): void }
}

declare module 'vite' {
  export function defineConfig(config: any): any
}

declare module '@vitejs/plugin-react' {
  const react: any
  export default react
}