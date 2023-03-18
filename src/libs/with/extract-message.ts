/* global chrome */
interface IWithExtractMessage {
    tabId:number
}

interface Message {
  sender: string;
  message: string;
}
const injectedFunction = async () => {
  try {
    const messageBalloons = document.getElementsByClassName('message_balloon')

    const messages: Message[] = Array.from(messageBalloons).flatMap(balloon => {
      const messages = balloon.getElementsByTagName('p')
      const sender = balloon.getAttribute('data-sender') as string

      return Array.from(messages).map(message => ({
        sender: sender.replace('me', '私').replace('partner', '相手　'),
        message: message.innerText.replace(/<br>/g, '\n')
      }))
    })

    await navigator.clipboard.writeText(JSON.stringify(messages))
    alert('クリップボードにコピーしました')
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
