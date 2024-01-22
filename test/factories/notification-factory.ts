import { type INotification } from '@application/entities/Notification/INotification'
import { Notification } from '@application/entities/Notification/notification'
import { Content } from '@application/entities/Notification/notification-content'

type Override = Partial<INotification>

export function makeNotification (override: Override = {}): Notification {
  return new Notification({
    content: new Content('This is a new notification 2'),
    category: 'social',
    recipientId: 'example-recipient-2',
    ...override
  })
}
