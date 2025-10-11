import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  async setMasiveEmails(content: string, subject: string): Promise<string> {
    // Obtener todos los usuarios y sus emails
    const users = await this.prisma.user.findMany()
    const emails = users.map((user) => user.email)

    if (emails.length === 0) {
      throw new HttpException(
        'No se encontraron usuarios para enviar correos.',
        HttpStatus.NOT_FOUND,
      )
    }

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // O usa otro servicio de email como Outlook, Yahoo, etc.
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS,
      },
    })

    // Configurar el correo a enviar
    const mailOptions = {
      from: process.env.GMAIL,
      to: emails, // Lista de correos (puede ser un array)
      subject: subject, // Asunto del correo
      html: content, // Contenido del correo en HTML
    }

    try {
      // Enviar el correo a todos los usuarios
      await transporter.sendMail(mailOptions)
      return `Correos enviados a ${emails.length} usuarios exitosamente.`
    } catch (error) {
      throw new HttpException('Error enviando correos', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
