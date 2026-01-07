import { Progress } from '@/components/ui/progress'
import { Shield } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface StrengthMeterProps {
  entropy: number
  level: 'weak' | 'fair' | 'good' | 'strong' | 'excellent'
  color: string
  percentage: number
}

export function StrengthMeter({ entropy, level, color, percentage }: StrengthMeterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield weight="fill" className="text-accent" size={20} />
          <span className="text-sm font-semibold">Password Strength</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {entropy.toFixed(1)} bits
          </span>
          <motion.span
            key={level}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-sm font-semibold capitalize"
            style={{ color }}
          >
            {level}
          </motion.span>
        </div>
      </div>
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}
