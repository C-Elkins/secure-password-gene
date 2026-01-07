import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { motion } from 'framer-motion'

interface CharacterToggle {
  id: string
  label: string
  enabled: boolean
  onChange: (enabled: boolean) => void
}

interface CharacterTogglesProps {
  toggles: CharacterToggle[]
  canDisable: boolean
  onAttemptDisableLast: () => void
}

export function CharacterToggles({ toggles, canDisable, onAttemptDisableLast }: CharacterTogglesProps) {
  return (
    <div className="space-y-3">
      {toggles.map((toggle) => {
        const isLastEnabled = !canDisable && toggle.enabled
        
        return (
          <motion.div
            key={toggle.id}
            animate={isLastEnabled ? { x: [0, -3, 3, -3, 3, 0] } : {}}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between"
          >
            <Label htmlFor={toggle.id} className="text-sm cursor-pointer">
              {toggle.label}
            </Label>
            <Switch
              id={toggle.id}
              checked={toggle.enabled}
              onCheckedChange={(checked) => {
                if (!checked && !canDisable) {
                  onAttemptDisableLast()
                } else {
                  toggle.onChange(checked)
                }
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
