import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'
import { type CountRecipientNotificationsResponse, type CountRecipientNotificationsRequest } from './ICountRecipientNotifications'
import { NotificationNotFound } from './errors/notification-not-found'

@Injectable()
export class CountRecipientNotification {
  constructor (private readonly notificationRepository: NotificationRepository) {}

  async execute (request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request

    const count = await this.notificationRepository.countManyByRecipientId(recipientId)

    if (count == null) {
      throw new NotificationNotFound()
    }

    return { count }
  }
}
