import { type Notification } from './../entities/Notification/notification'

export interface SendNotificationRequest {
  recipientId: string
  content: string
  category: string
}

export interface SendNotificationResponse {
  notification: Notification
}
