import { Injectable } from '@nestjs/common'
import { Content } from '../entities/Notification/notification-content'
import { NotificationRepository } from '../repositories/notification-repository'
import { Notification } from './../entities/Notification/notification'
import { type SendNotificationResponse, type SendNotificationRequest } from './ISendNotification'

@Injectable()
export class SendNotification {
  constructor (private readonly notificationRepository: NotificationRepository) {}

  async execute (request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category
    })

    await this.notificationRepository.create(notification)

    return {
      notification
    }
  }
}
