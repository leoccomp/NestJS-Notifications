import { Content } from '../notification-content'

describe('notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma nova solicitacao de amizade!')

    expect(content).toBeTruthy()
  })

  it('should be not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('Voce')).toThrow()
  })

  it('should be not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow()
  })
})
