import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { PASSWORD_PRESETS, type PasswordCriteria } from '@/lib/crypto'
import { Sparkle, Check } from '@phosphor-icons/react'
import { useState } from 'react'

interface PresetSelectorProps {
  onPresetSelect: (criteria: Partial<PasswordCriteria>) => void
  currentCriteria: PasswordCriteria
}

export function PresetSelector({ onPresetSelect, currentCriteria }: PresetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handlePresetClick = (criteria: Partial<PasswordCriteria>) => {
    onPresetSelect(criteria)
    setIsOpen(false)
  }

  const isPresetActive = (presetCriteria: Partial<PasswordCriteria>) => {
    return (
      currentCriteria.length === presetCriteria.length &&
      currentCriteria.includeUppercase === presetCriteria.includeUppercase &&
      currentCriteria.includeLowercase === presetCriteria.includeLowercase &&
      currentCriteria.includeNumbers === presetCriteria.includeNumbers &&
      currentCriteria.includeSymbols === presetCriteria.includeSymbols &&
      currentCriteria.customSymbols === presetCriteria.customSymbols
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Sparkle weight="fill" size={16} />
          Load Preset
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Password Policy Presets</DialogTitle>
          <DialogDescription>
            Choose a preset that matches your security requirements
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {PASSWORD_PRESETS.map((preset) => {
            const isActive = isPresetActive(preset.criteria)
            return (
              <Card
                key={preset.id}
                className={`p-4 cursor-pointer transition-all hover:border-accent hover:bg-accent/5 ${
                  isActive ? 'border-accent bg-accent/10' : ''
                }`}
                onClick={() => handlePresetClick(preset.criteria)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm">{preset.name}</h3>
                      {isActive && (
                        <Check weight="bold" className="text-accent" size={16} />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {preset.description}
                    </p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs pt-1">
                      <span className="text-muted-foreground">
                        Length: <span className="text-foreground font-medium">{preset.criteria.length}</span>
                      </span>
                      {preset.criteria.includeUppercase && (
                        <span className="text-muted-foreground">
                          <span className="text-foreground font-medium">A-Z</span>
                        </span>
                      )}
                      {preset.criteria.includeLowercase && (
                        <span className="text-muted-foreground">
                          <span className="text-foreground font-medium">a-z</span>
                        </span>
                      )}
                      {preset.criteria.includeNumbers && (
                        <span className="text-muted-foreground">
                          <span className="text-foreground font-medium">0-9</span>
                        </span>
                      )}
                      {preset.criteria.includeSymbols && preset.criteria.customSymbols && (
                        <span className="text-muted-foreground">
                          Symbols: <span className="text-foreground font-medium font-[family-name:var(--font-mono)]">{preset.criteria.customSymbols}</span>
                        </span>
                      )}
                      {!preset.criteria.includeSymbols && (
                        <span className="text-muted-foreground">
                          <span className="text-foreground font-medium">No symbols</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
