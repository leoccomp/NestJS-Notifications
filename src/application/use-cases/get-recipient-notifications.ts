import { Injectable } from '@nestjs/common'
import { NotificationRepository } from '../repositories/notification-repository'
import { type GetRecipientNotificationsResponse, type GetRecipientNotificationsRequest } from './IGetRecipientNotifications'
import { NotificationNotFound } from './errors/notification-not-found'

@Injectable()
export class GetRecipientNotifications {
  constructor (private readonly notificationRepository: NotificationRepository) {}

  async execute (request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request

    const notifications = await this.notificationRepository.findManyByRecipientId(recipientId)

    if (notifications == null) {
      throw new NotificationNotFound()
    }

    return { notifications }
  }
}
