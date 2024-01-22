/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type Notification as RawNotification } from '@prisma/client'
import { Notification } from '@application/entities/Notification/notification'
import { Content } from '@application/entities/Notification/notification-content'

export class PrismaNotificationMapper {
  static toPrisma (notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt
    }
  }

  static toDomain (raw: RawNotification): Notification {
    return new Notification({
      category: raw.category,
      content: new Content(raw.content),
      recipientId: raw.recipientId,
      readAt: raw.readAt,
      createdAt: raw.createdAt
    }, raw.id)
  }
}
