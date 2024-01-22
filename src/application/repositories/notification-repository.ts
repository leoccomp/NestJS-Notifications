import { type Notification } from '../entities/Notification/notification'

export abstract class NotificationRepository {
  abstract create (notification: Notification): Promise<void>
  abstract cancel (notificationId: Notification): Promise<void>
  abstract findById (notificationId: string): Promise<Notification | null>
  abstract save (notification: Notification): Promise<void>
  abstract countManyByRecipientId (recipientId: string): Promise<number>
  abstract findManyByRecipientId (recipientId: string): Promise<Notification[]>
}