import { type Notification } from '@application/entities/Notification/notification'
import { type NotificationRepository } from '@application/repositories/notification-repository'

export class InMemoryNotificationRepository implements NotificationRepository {
  async findManyByRecipientId (recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(notification => notification.recipientId === recipientId)
  }

  async countManyByRecipientId (recipientId: string): Promise<number> {
    return this.notifications.filter(notification => notification.recipientId === recipientId).length
  }

  async findById (notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find((item) => item.id === notificationId)

    if (notification == null) {
      return null
    }

    return notification
  }

  async save (notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex((item) => item.id === notification.id)

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification
    }
  }

  public notifications: Notification[] = []
  async create (notification: Notification): Promise<void> {
    this.notifications.push(notification)
  }
}
