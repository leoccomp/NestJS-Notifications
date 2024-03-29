import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifications.controller'
import { DatabaseModule } from '../database/database.module'
import { SendNotification } from 'src/application/use-cases/send-notification'
import { CancelNotification } from '@application/use-cases/cancel-notification'
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications'
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications'
import { ReadNotification } from '@application/use-cases/read-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification
  ]
})

export class HttpModule {}
