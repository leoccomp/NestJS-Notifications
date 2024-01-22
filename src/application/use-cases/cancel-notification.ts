import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'
import { type CancelNotificationResponse, type CancelNotificationRequest } from './ICancelNotification'
import { NotificationNotFound } from './errors/notification-not-found'

@Injectable()
export class CancelNotification {
  constructor (private readonly notificationRepository: NotificationRepository) {}

  async execute (request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationRepository.findById(notificationId)

    if (notification == null) {
      throw new NotificationNotFound()
    }

    notification.cancel()

    await this.notificationRepository.save(notification)
  }
}
