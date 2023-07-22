import prisma from './prisma'
import logger from './utils/logger'
import { loadConfig } from './config'

const dependenciesPromises: Promise<any>[] = [
  loadConfig()
]

Promise.all(dependenciesPromises)
  .then(async () => {
    const server = await import('./server')

    logger.info('Starting server...')
    await server.start()

    const shutdownHandler = async () => {
      logger.info('Shutting down server...')
      await server.shutdown()
      logger.info('Server was successfully shutdown')


      prisma.$disconnect();
      logger.info('Prisma disconnected')
    }
    process.on('SIGTERM', shutdownHandler)
    process.on('SIGINT', shutdownHandler)
  })
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })
