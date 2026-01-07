export interface PasswordCriteria {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
  customSymbols?: string
}

export interface PasswordPreset {
  id: string
  name: string
  description: string
  criteria: Partial<PasswordCriteria>
}

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
export const DEFAULT_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

export const SYMBOL_PRESETS = {
  conservative: '!@#$%&*',
  standard: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  maximum: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`\'"\\ ',
  alphanumeric: '',
} as const

export const PASSWORD_PRESETS: PasswordPreset[] = [
  {
    id: 'conservative',
    name: 'Conservative',
    description: 'Safe for most systems - basic symbols only',
    criteria: {
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      customSymbols: SYMBOL_PRESETS.conservative,
    },
  },
  {
    id: 'standard',
    name: 'Standard Security',
    description: 'Balanced security - commonly accepted symbols',
    criteria: {
      length: 20,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      customSymbols: SYMBOL_PRESETS.standard,
    },
  },
  {
    id: 'maximum',
    name: 'Maximum Security',
    description: 'Highest entropy - all printable symbols',
    criteria: {
      length: 24,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      customSymbols: SYMBOL_PRESETS.maximum,
    },
  },
  {
    id: 'alphanumeric',
    name: 'Alphanumeric Only',
    description: 'No symbols - compatible with restrictive systems',
    criteria: {
      length: 24,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: false,
      customSymbols: SYMBOL_PRESETS.alphanumeric,
    },
  },
  {
    id: 'pin',
    name: 'PIN Code',
    description: 'Numbers only - for PIN requirements',
    criteria: {
      length: 6,
      includeUppercase: false,
      includeLowercase: false,
      includeNumbers: true,
      includeSymbols: false,
      customSymbols: SYMBOL_PRESETS.alphanumeric,
    },
  },
  {
    id: 'passphrase',
    name: 'Long Passphrase',
    description: 'Extended length for maximum security',
    criteria: {
      length: 32,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      customSymbols: SYMBOL_PRESETS.standard,
    },
  },
]

export function generatePassword(criteria: PasswordCriteria): string {
  let charset = ''
  const requiredChars: string[] = []

  if (criteria.includeUppercase) {
    charset += UPPERCASE
    requiredChars.push(UPPERCASE[getSecureRandomInt(UPPERCASE.length)])
  }
  if (criteria.includeLowercase) {
    charset += LOWERCASE
    requiredChars.push(LOWERCASE[getSecureRandomInt(LOWERCASE.length)])
  }
  if (criteria.includeNumbers) {
    charset += NUMBERS
    requiredChars.push(NUMBERS[getSecureRandomInt(NUMBERS.length)])
  }
  if (criteria.includeSymbols) {
    const symbolSet = criteria.customSymbols || DEFAULT_SYMBOLS
    charset += symbolSet
    requiredChars.push(symbolSet[getSecureRandomInt(symbolSet.length)])
  }

  if (charset.length === 0) {
    throw new Error('At least one character type must be selected')
  }

  const passwordLength = Math.max(criteria.length, requiredChars.length)
  const password: string[] = [...requiredChars]

  for (let i = requiredChars.length; i < passwordLength; i++) {
    password.push(charset[getSecureRandomInt(charset.length)])
  }

  return shuffleArray(password).join('')
}

function getSecureRandomInt(max: number): number {
  const randomBuffer = new Uint32Array(1)
  crypto.getRandomValues(randomBuffer)
  return randomBuffer[0] % max
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1)
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function calculateEntropy(criteria: PasswordCriteria): number {
  let charsetSize = 0

  if (criteria.includeUppercase) charsetSize += 26
  if (criteria.includeLowercase) charsetSize += 26
  if (criteria.includeNumbers) charsetSize += 10
  if (criteria.includeSymbols) {
    const symbolSet = criteria.customSymbols || DEFAULT_SYMBOLS
    charsetSize += symbolSet.length
  }

  if (charsetSize === 0) return 0

  return Math.log2(Math.pow(charsetSize, criteria.length))
}

export function getStrengthLevel(entropy: number): {
  level: 'weak' | 'fair' | 'good' | 'strong' | 'excellent'
  color: string
  percentage: number
} {
  if (entropy < 40) {
    return { level: 'weak', color: 'oklch(0.60 0.22 25)', percentage: 20 }
  } else if (entropy < 60) {
    return { level: 'fair', color: 'oklch(0.75 0.15 60)', percentage: 40 }
  } else if (entropy < 80) {
    return { level: 'good', color: 'oklch(0.70 0.15 120)', percentage: 60 }
  } else if (entropy < 100) {
    return { level: 'strong', color: 'oklch(0.65 0.18 150)', percentage: 80 }
  } else {
    return { level: 'excellent', color: 'oklch(0.75 0.15 195)', percentage: 100 }
  }
}

async function arrayBufferToHex(buffer: ArrayBuffer): Promise<string> {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function hashPassword(password: string): Promise<{
  sha256: string
  sha512: string
  pbkdf2: string
}> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  const sha256Buffer = await crypto.subtle.digest('SHA-256', data)
  const sha256 = await arrayBufferToHex(sha256Buffer)

  const sha512Buffer = await crypto.subtle.digest('SHA-512', data)
  const sha512 = await arrayBufferToHex(sha512Buffer)

  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    data,
    'PBKDF2',
    false,
    ['deriveBits']
  )

  const pbkdf2Buffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  )

  const saltHex = Array.from(salt)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
  const pbkdf2Hex = await arrayBufferToHex(pbkdf2Buffer)
  const pbkdf2 = `pbkdf2_sha256$100000$${saltHex}$${pbkdf2Hex}`

  return { sha256, sha512, pbkdf2 }
}
