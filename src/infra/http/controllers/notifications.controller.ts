/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { SendNotification } from '@application/use-cases/send-notification'
import { CancelNotification } from '@application/use-cases/cancel-notification'
import { ReadNotification } from '@application/use-cases/read-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'
import { type Notification } from '@application/entities/Notification/notification'

@Controller('notifications')
export class NotificationsController {
  constructor (
    private readonly sendNotification: SendNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly countRecipientNotifications: CountRecipientNotification,
    private readonly getRecipientNotifications: GetRecipientNotifications
  ) {}

  @Patch(':id/cancel')
  async cancel (@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient (@Param('recipientId') recipientId: string): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId
    })

    return { count }
  }

  @Get('get/from/:recipientId')
  async getFromRecipient (@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId
    })

    return {
      notifications: notifications.map((notification: Notification) => {
        return {
          id: notification.id,
          content: notification.content.value,
          category: notification.category,
          recipientId: notification.recipientId
        }
      })
    }
  }

  @Patch(':id/read')
  async readFromRecipient (@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unreadFromRecipient (@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create (@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return {
      notification: {
        id: notification.id,
        content: notification.content,
        category: notification.category,
        recipientId: notification.recipientId
      }
    }
  }
}
