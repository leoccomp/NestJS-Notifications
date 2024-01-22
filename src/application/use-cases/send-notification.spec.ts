import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { SendNotification } from './send-notification'

describe('send notifications', () => {
  it('should be able to send notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const sendNotification = new SendNotification(notificationsRepository)

    const { notification } = await sendNotification.execute({
      content: 'This is a new notification',
      category: 'social',
      recipientId: 'example-recipient'
    })

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0]).toEqual(notification)
  })
})
