/* eslint-disable @typescript-eslint/unbound-method */
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'
import { PrismaService } from './../prisma.service'
import { type Notification } from '@application/entities/Notification/notification'
import { type NotificationRepository } from '@application/repositories/notification-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor (private readonly prismaService: PrismaService) {}
  async cancel (notificationId: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findManyByRecipientId (recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId }
    })

    return notifications.map(PrismaNotificationMapper.toDomain)
  }

  async countManyByRecipientId (recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId }
    })

    return count
  }

  async findById (notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId }
    })

    if (notification == null) {
      return null
    }

    return PrismaNotificationMapper.toDomain(notification)
  }

  async save (notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.update({
      where: {
        id: raw.id
      },
      data: {
        ...raw,
        createdAt: raw.createdAt ?? new Date()
      }
    })
  }

  async create (notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt ?? new Date()
      }
    })
  }
}
