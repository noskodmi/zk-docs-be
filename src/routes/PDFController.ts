import type { Request, Response, NextFunction } from 'express'
import prisma from '../prisma'
import ApiError from './../errors/ApiError'
const signer = require('node-signpdf').default
const fs = require('fs')
const { plainAddPlaceholder } = require('node-signpdf/dist/helpers');

const pdfSignedPath = `./signed.pdf`;
const pdf2SignedPath = `./2signed.pdf`;
const pdfBuffer = fs.readFileSync(`./w3dummy.pdf`);
const pdfSignedBuffer = fs.readFileSync(`./signed.pdf`);
const certBuffer = fs.readFileSync(`./certificate.p12`);

export const PDFController = {
  firstSign: async (req: Request, res: Response, next: NextFunction) => {
    let inputBuffer = plainAddPlaceholder({
      pdfBuffer,
      reason: 'Signed Certificate.',
      contactInfo: 'sign@example.com',
      name: 'Example',
      location: 'Paris',
      signatureLength: certBuffer.length,
    });
  
    const signedPdf = signer.sign(
      inputBuffer,
      certBuffer,
    { asn1StrictParsing : true },
    );
    fs.writeFileSync(pdfSignedPath, signedPdf);
    res.download(pdfSignedPath)
  },
  secondSign: async (req: Request, res: Response, next: NextFunction) => {
    let inputBuffer = plainAddPlaceholder({
      pdfSignedBuffer,
      reason: 'Signed Certificate.',
      contactInfo: 'sign@example.com',
      name: 'Example',
      location: 'Paris',
      signatureLength: certBuffer.length,
    });
  
    const signedPdf = signer.sign(
      inputBuffer,
      certBuffer,
    { asn1StrictParsing : true },
    );
    fs.writeFileSync(pdf2SignedPath, signedPdf);
    res.download(pdf2SignedPath)
  },
}
