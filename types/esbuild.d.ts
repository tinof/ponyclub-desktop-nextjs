declare module 'esbuild' {
  export interface Plugin {
    name?: string
    setup?: (...args: unknown[]) => void
    [key: string]: unknown
  }
  export interface PluginBuild {
    onResolve?: (...args: unknown[]) => void
    onLoad?: (...args: unknown[]) => void
    [key: string]: unknown
  }
}
