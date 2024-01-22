import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { CountRecipientNotification } from './count-recipient-notifications'
import { makeNotification } from '@test/factories/notification-factory'

describe('count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const countRecipientNotifications = new CountRecipientNotification(notificationsRepository)

    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-2' }))

    const { notifications } = await countRecipientNotifications.execute({
      recipientId: 'example-recipient-1'
    })

    expect(notifications).toEqual(2)
  })
})
