import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { CancelNotification } from './cancel-notification'
import { NotificationNotFound } from './errors/notification-not-found'
import { makeNotification } from '@test/factories/notification-factory'

describe('cancel notifications', () => {
  it('should be able to cancel notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
  })

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    void expect(async () => {
      await cancelNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
