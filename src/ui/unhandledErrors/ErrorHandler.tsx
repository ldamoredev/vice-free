import { Context } from '../context/Context'

export type ErrorHandler = (e: Error, context: Context) => boolean
