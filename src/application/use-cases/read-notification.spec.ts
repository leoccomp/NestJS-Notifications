import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository'
import { NotificationNotFound } from './errors/notification-not-found'
import { makeNotification } from '@test/factories/notification-factory'
import { ReadNotification } from './read-notification'

describe('read notifications', () => {
  it('should be able to read notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    await readNotification.execute({
      notificationId: notification.id
    })

    expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
  })

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    void expect(async () => {
      await readNotification.execute({
        notificationId: 'fake-notification-id'
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
