import { useState } from 'react'
import { Copy, Check, CaretDown, CaretUp } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface HashOutputProps {
  hashes: {
    sha256: string
    sha512: string
    pbkdf2: string
  } | null
}

export function HashOutput({ hashes }: HashOutputProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const handleCopyHash = async (hash: string, type: string) => {
    try {
      await navigator.clipboard.writeText(hash)
      setCopiedHash(type)
      toast.success(`${type} hash copied to clipboard`)
      setTimeout(() => setCopiedHash(null), 2000)
    } catch (err) {
      toast.error('Failed to copy hash')
    }
  }

  if (!hashes) return null

  return (
    <div className="space-y-4">
      <Separator />
      <div>
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between hover:bg-muted/50"
        >
          <span className="font-semibold">Password Hashes</span>
          {isExpanded ? <CaretUp /> : <CaretDown />}
        </Button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 pt-4">
                <HashItem
                  label="SHA-256"
                  hash={hashes.sha256}
                  copied={copiedHash === 'SHA-256'}
                  onCopy={() => handleCopyHash(hashes.sha256, 'SHA-256')}
                />
                <HashItem
                  label="SHA-512"
                  hash={hashes.sha512}
                  copied={copiedHash === 'SHA-512'}
                  onCopy={() => handleCopyHash(hashes.sha512, 'SHA-512')}
                />
                <HashItem
                  label="PBKDF2"
                  hash={hashes.pbkdf2}
                  copied={copiedHash === 'PBKDF2'}
                  onCopy={() => handleCopyHash(hashes.pbkdf2, 'PBKDF2')}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function HashItem({
  label,
  hash,
  copied,
  onCopy
}: {
  label: string
  hash: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <div className="bg-muted/30 border border-border rounded-md px-3 py-2 pr-12">
          <div className="font-[family-name:var(--font-mono)] text-xs text-foreground/80 break-all">
            {hash}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCopy}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-accent/20"
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
                <Check className="text-accent" size={16} />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Copy size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  )
}
