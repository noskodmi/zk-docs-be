import * as express from 'express'
import cors from 'cors'
import type { RequestHandler } from 'express'
import getConfig from '../config'
import { apiErrorHandler } from '../utils/apiErrorHandler'
import { PDFController } from './PDFController'
export const ApiRouter = express
  .Router({ mergeParams: true })
  .use(cors())
  .use(express.json() as RequestHandler)

  // Health check
  .get('/ping', (req, res, next) => {
    return res.send(`pong (${getConfig().APP_ENV})`)
  })

  .post('/firstSign', PDFController.firstSign)
  .post('/secondSign', PDFController.secondSign)
 
  // Handle API Errors
  .use(apiErrorHandler)

export default ApiRouter
