/* global chrome */
interface IWithExtractMessage {
    tabId:number
}

interface Message {
  sender: string;
  message: string;
}
const injectedFunction = () => {
  try {
    const messageBalloons = document.getElementsByClassName('message_balloon')

    const messages:Message[] = Array.from(messageBalloons).flatMap(balloon => {
      const messages = balloon.getElementsByTagName('p')
      const sender = balloon.getAttribute('data-sender') as string

      return Array.from(messages).map(message => ({
        sender,
        message: message.innerText.replace(/<br>/g, '\n')
      }))
    })

    console.log(messages)
    const aaa = JSON.stringify(messages)
    const scrapbox = 'https://scrapbox.io/ampersand/temporarilyMemo?body='
    window.open(scrapbox + aaa, '_blank')
  } catch (e) {
    console.log('failed', e)
  }
}

export const extractMessage = async ({ tabId }: IWithExtractMessage) => {
  await chrome.scripting.executeScript({
    target: { tabId },
    func: injectedFunction,
    args: []
  })
}
