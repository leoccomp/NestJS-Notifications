import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { makeNotification } from '@test/factories/notification-factory'
import { GetRecipientNotifications } from './get-recipient-notifications'

describe('get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const getRecipientNotifications = new GetRecipientNotifications(notificationsRepository)

    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-1' }))

    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-2' }))

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'example-recipient-1'
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(expect.arrayContaining([
      expect.objectContaining({ recipientId: 'example-recipient-1' }),
      expect.objectContaining({ recipientId: 'example-recipient-1' })
    ]))
  })
})
