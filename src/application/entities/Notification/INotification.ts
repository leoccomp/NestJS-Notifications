import { type Content } from './notification-content'

export interface INotification {
  recipientId: string
  content: Content
  category: string
  readAt?: Date | null
  canceledAt?: Date | null
  createdAt: Date
}
