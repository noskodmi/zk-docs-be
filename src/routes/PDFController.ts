import type { Request, Response, NextFunction } from 'express'

import prisma from '../prisma'
import ApiError from './../errors/ApiError'

export const PDFController = {
  firstSign: async (req: Request, res: Response, next: NextFunction) => {

    res.json("first")
  },
  secondSign: async (req: Request, res: Response, next: NextFunction) => {

    res.json("second")
  },
}
