import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/sonner'
import { Lock, Sparkle, Warning, ShieldCheck } from '@phosphor-icons/react'
import { toast } from 'sonner'
import {
  generatePassword,
  calculateEntropy,
  getStrengthLevel,
  hashPassword,
  DEFAULT_SYMBOLS,
  type PasswordCriteria
} from '@/lib/crypto'
import { PasswordDisplay } from '@/components/PasswordDisplay'
import { StrengthMeter } from '@/components/StrengthMeter'
import { HashOutput } from '@/components/HashOutput'
import { CharacterToggles } from '@/components/CharacterToggles'
import { SymbolCustomizer } from '@/components/SymbolCustomizer'

function App() {
  const [criteria, setCriteria] = useState<PasswordCriteria>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    customSymbols: DEFAULT_SYMBOLS
  })

  const [password, setPassword] = useState('')
  const [hashes, setHashes] = useState<{
    sha256: string
    sha512: string
    pbkdf2: string
  } | null>(null)

  const entropy = calculateEntropy(criteria)
  const strength = getStrengthLevel(entropy)

  const enabledCount = [
    criteria.includeUppercase,
    criteria.includeLowercase,
    criteria.includeNumbers,
    criteria.includeSymbols
  ].filter(Boolean).length

  const canDisableToggle = enabledCount > 1

  const handleGenerate = async () => {
    try {
      const newPassword = generatePassword(criteria)
      setPassword(newPassword)
      
      const newHashes = await hashPassword(newPassword)
      setHashes(newHashes)
    } catch (err) {
      toast.error('Failed to generate password')
    }
  }

  useEffect(() => {
    const generateInitial = async () => {
      try {
        const newPassword = generatePassword(criteria)
        setPassword(newPassword)
        
        const newHashes = await hashPassword(newPassword)
        setHashes(newHashes)
      } catch (err) {
        toast.error('Failed to generate password')
      }
    }
    generateInitial()
  }, [])

  const handleAttemptDisableLast = () => {
    toast.error('At least one character type must be selected')
  }

  const toggles = [
    {
      id: 'uppercase',
      label: 'Uppercase Letters (A-Z)',
      enabled: criteria.includeUppercase,
      onChange: (enabled: boolean) => setCriteria({ ...criteria, includeUppercase: enabled })
    },
    {
      id: 'lowercase',
      label: 'Lowercase Letters (a-z)',
      enabled: criteria.includeLowercase,
      onChange: (enabled: boolean) => setCriteria({ ...criteria, includeLowercase: enabled })
    },
    {
      id: 'numbers',
      label: 'Numbers (0-9)',
      enabled: criteria.includeNumbers,
      onChange: (enabled: boolean) => setCriteria({ ...criteria, includeNumbers: enabled })
    },
    {
      id: 'symbols',
      label: 'Special Symbols (!@#$...)',
      enabled: criteria.includeSymbols,
      onChange: (enabled: boolean) => setCriteria({ ...criteria, includeSymbols: enabled })
    }
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Lock weight="fill" className="text-accent" size={32} />
            <h1 className="font-bold text-3xl md:text-4xl tracking-tight">
              SecurePass Generator
            </h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Generate cryptographically secure passwords with zero data storage. All operations happen locally in your browser.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck weight="fill" className="text-accent" size={16} />
            <span>No data is ever stored or transmitted</span>
          </div>
        </div>

        <Card className="p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Generated Password</Label>
            </div>
            <PasswordDisplay password={password} onCopy={() => {}} />
          </div>

          {password && (
            <StrengthMeter
              entropy={entropy}
              level={strength.level}
              color={strength.color}
              percentage={strength.percentage}
            />
          )}

          {criteria.length < 12 && (
            <Alert className="bg-destructive/10 border-destructive/20">
              <Warning weight="fill" className="text-destructive" />
              <AlertDescription className="text-sm">
                Passwords shorter than 12 characters are vulnerable to brute-force attacks. Consider using a longer password.
              </AlertDescription>
            </Alert>
          )}

          <Separator />

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">
                  Password Length: {criteria.length}
                </Label>
              </div>
              <Slider
                value={[criteria.length]}
                onValueChange={(value) => setCriteria({ ...criteria, length: value[0] })}
                min={8}
                max={128}
                step={1}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>8</span>
                <span>128</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Character Types</Label>
              <SymbolCustomizer
                customSymbols={criteria.customSymbols || DEFAULT_SYMBOLS}
                onSymbolsChange={(symbols) => {
                  setCriteria({ ...criteria, customSymbols: symbols })
                }}
                disabled={!criteria.includeSymbols}
              />
            </div>
            <CharacterToggles
              toggles={toggles}
              canDisable={canDisableToggle}
              onAttemptDisableLast={handleAttemptDisableLast}
            />
          </div>

          <Button
            onClick={handleGenerate}
            className="w-full font-semibold gap-2"
            size="lg"
          >
            <Sparkle weight="fill" />
            Generate New Password
          </Button>

          <HashOutput hashes={hashes} />
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Uses Web Crypto API for cryptographically secure random generation
        </p>
      </div>
      <Toaster />
    </div>
  )
}

export default App