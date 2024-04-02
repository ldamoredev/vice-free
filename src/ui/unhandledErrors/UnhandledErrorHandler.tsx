import { Context } from '../context/Context'

export type UnhandledErrorHandler = (e: Error, context: Context) => void
