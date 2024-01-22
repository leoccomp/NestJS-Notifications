import { type Notification } from '@application/entities/Notification/notification'

/* eslint-disable @typescript-eslint/no-invalid-void-type */
export interface GetRecipientNotificationsRequest {
  recipientId: string
}

export interface GetRecipientNotificationsResponse {
  notifications: Notification[]
}
