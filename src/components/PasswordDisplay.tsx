import { Copy, Check } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface PasswordDisplayProps {
  password: string
  onCopy: () => void
}

export function PasswordDisplay({ password, onCopy }: PasswordDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      onCopy()
      toast.success('Password copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy password')
    }
  }

  return (
    <div className="relative">
      <div className="bg-muted/50 border border-border rounded-lg px-4 py-4 pr-14 min-h-[60px] flex items-center">
        {password ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-[family-name:var(--font-mono)] text-accent text-lg tracking-wide break-all"
          >
            {password.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02, duration: 0.15 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        ) : (
          <span className="text-muted-foreground text-sm">
            Generate a password to get started
          </span>
        )}
      </div>
      {password && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-accent/20"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Check className="text-accent" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Copy />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      )}
    </div>
  )
}
