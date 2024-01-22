import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'
import { type ReadNotificationResponse, type ReadNotificationRequest } from './IReadNotification'
import { NotificationNotFound } from './errors/notification-not-found'

@Injectable()
export class UnreadNotification {
  constructor (private readonly notificationRepository: NotificationRepository) {}

  async execute (request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationRepository.findById(notificationId)

    if (notification == null) {
      throw new NotificationNotFound()
    }

    notification.unread()

    await this.notificationRepository.save(notification)
  }
}
