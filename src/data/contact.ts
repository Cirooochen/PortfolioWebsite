export const contactEmail = 'cirochen0406@gmail.com'

export type DrinkId = 'coffee' | 'tea' | 'matcha' | 'water'

export interface DrinkOption {
  id: DrinkId
  label: string
  /** Shown once the drink is picked */
  reply: string
  /** Pre-filled email subject */
  subject: string
}

export const drinkOptions: DrinkOption[] = [
  { id: 'coffee', label: 'Coffee', reply: 'Great, I love an Americano.', subject: "Let's grab an Americano" },
  { id: 'tea', label: 'Tea', reply: 'Nice, I fancy an Oolong tea.', subject: 'Oolong tea and a chat?' },
  { id: 'matcha', label: 'Matcha', reply: 'Ooh, an iced matcha latte for me.', subject: "Let's get matcha" },
  { id: 'water', label: 'Water', reply: 'Simple and honest. Sparkling water it is.', subject: 'Sparkling water and a chat' },
]

/** Opens Gmail's compose window with the recipient and subject filled in. */
export function gmailComposeUrl(subject: string) {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: contactEmail, su: subject })
  return `https://mail.google.com/mail/?${params}`
}
