import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog'
import { Gear, ArrowCounterClockwise, Info } from '@phosphor-icons/react'
import { DEFAULT_SYMBOLS } from '@/lib/crypto'
import { motion } from 'framer-motion'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface SymbolCustomizerProps {
  customSymbols: string
  onSymbolsChange: (symbols: string) => void
  disabled?: boolean
}

export function SymbolCustomizer({ customSymbols, onSymbolsChange, disabled }: SymbolCustomizerProps) {
  const [tempSymbols, setTempSymbols] = useState(customSymbols)
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    if (tempSymbols.trim().length > 0) {
      onSymbolsChange(tempSymbols)
      setIsOpen(false)
    }
  }

  const handleReset = () => {
    setTempSymbols(DEFAULT_SYMBOLS)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setTempSymbols(customSymbols)
    }
  }

  const uniqueCount = new Set(tempSymbols).size

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-xs h-7"
          disabled={disabled}
        >
          <Gear weight="fill" size={14} />
          Customize Symbols
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Special Symbols</DialogTitle>
          <DialogDescription>
            Define which special characters can be used in your passwords
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Alert className="bg-accent/10 border-accent/20">
            <Info weight="fill" className="text-accent" />
            <AlertDescription className="text-xs">
              Each unique character adds to password entropy. Current set: <span className="font-semibold">{uniqueCount} unique symbols</span>
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label htmlFor="symbols-input" className="text-sm font-semibold">
              Allowed Symbols
            </Label>
            <Input
              id="symbols-input"
              value={tempSymbols}
              onChange={(e) => setTempSymbols(e.target.value)}
              placeholder="Enter symbols..."
              className="font-[family-name:var(--font-mono)] text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Enter any characters you want to include. Duplicates will be automatically handled.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Default Set</Label>
            <div className="bg-muted/30 border border-border rounded-md px-3 py-2">
              <div className="font-[family-name:var(--font-mono)] text-xs break-all text-foreground/80">
                {DEFAULT_SYMBOLS}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="w-full gap-2"
          >
            <ArrowCounterClockwise size={16} />
            Reset to Default
          </Button>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={tempSymbols.trim().length === 0}
          >
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
