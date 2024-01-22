import { type Replace } from 'src/helpers/Replace'
import { type INotification } from './INotification'
import { type Content } from './notification-content'
import { randomUUID } from 'crypto'

type DateInfo = Date | null | undefined

export class Notification {
  private readonly data: INotification
  private readonly _id: string

  constructor (data: Replace<INotification, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.data = {
      ...data,
      createdAt: data.createdAt ?? new Date()
    }
  }

  public get id (): string {
    return this._id
  }

  public set recipientId (recipientId: string) {
    this.data.recipientId = recipientId
  }

  public get recipientId (): string {
    return this.data.recipientId
  }

  public set content (content: Content) {
    this.data.content = content
  }

  public get content (): Content {
    return this.data.content
  }

  public set category (category: string) {
    this.data.category = category
  }

  public get category (): string {
    return this.data.category
  }

  public read (): void {
    this.data.readAt = new Date()
  }

  public unread (): void {
    this.data.readAt = null
  }

  public get readAt (): DateInfo {
    return this.data.readAt
  }

  public cancel (): void {
    this.data.canceledAt = new Date()
  }

  public get canceledAt (): DateInfo {
    return this.data.canceledAt
  }

  public get createdAt (): DateInfo {
    return this.data.createdAt
  }
}
