# Planning Guide

A secure password generation and hashing tool that creates cryptographically strong passwords based on user-defined criteria and provides industry-standard hash outputs, with zero data persistence to ensure complete privacy.

**Experience Qualities**:
1. **Trustworthy** - The interface communicates security and privacy through clear messaging that no data is stored, cryptographic transparency, and professional design choices
2. **Efficient** - Users can quickly generate passwords with instant visual feedback, one-click copying, and streamlined controls that don't overwhelm
3. **Empowering** - Users feel in control with clear parameter adjustments, visible entropy indicators, and educational tooltips that demystify password security

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-page tool with multiple interactive features (password generation, hashing, criteria adjustment) but no persistent data storage or complex navigation flows, making it ideal as a light application.

## Essential Features

**Password Generation**
- Functionality: Generates cryptographically random passwords using Web Crypto API based on user-specified length and character set criteria
- Purpose: Creates strong, unpredictable passwords that resist brute-force and dictionary attacks
- Trigger: User adjusts criteria sliders/toggles or clicks "Generate Password" button
- Progression: User sets length (8-128 chars) → toggles character types (uppercase, lowercase, numbers, symbols) → clicks generate → password appears instantly → strength indicator updates → user copies to clipboard
- Success criteria: Generated passwords use true randomness (crypto.getRandomValues), meet specified criteria exactly, and display entropy/strength score

**Password Strength Indicator**
- Functionality: Calculates and displays password entropy in bits and provides visual strength assessment
- Purpose: Educates users on password quality and validates that generated passwords meet security standards
- Trigger: Automatically updates whenever a new password is generated
- Progression: Password generated → entropy calculated (log2 of possible combinations) → strength bar fills with color-coded visual (red/yellow/green) → numerical entropy displayed
- Success criteria: Entropy calculation accurately reflects character space and length, visual indicator provides at-a-glance assessment

**Password Hashing**
- Functionality: Generates multiple hash formats (SHA-256, SHA-512, PBKDF2, bcrypt-style) of the current password
- Purpose: Allows users to see how passwords are transformed for storage, useful for developers testing systems or users verifying hash outputs
- Trigger: User clicks "Show Hashes" or hash section toggle
- Progression: User generates/enters password → clicks hash display → multiple hash algorithms execute → formatted hashes appear in read-only fields → user can copy individual hashes
- Success criteria: Hashes computed using Web Crypto API, multiple algorithms available, results copyable

**One-Click Copy Actions**
- Functionality: Copy buttons for generated password and each hash output that provide instant feedback
- Purpose: Streamlines workflow and reduces transcription errors when using generated passwords
- Trigger: User clicks copy icon next to password or hash
- Progression: User clicks copy button → content copied to clipboard → visual confirmation (toast notification + icon change) → icon reverts after 2 seconds
- Success criteria: Clipboard API works reliably, toast confirms action, no visual glitches

**Criteria Customization**
- Functionality: Interactive controls for password length and character type inclusion (uppercase, lowercase, numbers, special symbols), with advanced customization for which specific symbols to include, plus quick-access presets for common password policies
- Purpose: Allows users to meet specific password policy requirements or personal preferences, including restrictive policies that only allow certain special characters, or quickly apply common security standards
- Trigger: User interacts with slider or toggle switches, clicks "Customize Symbols" button, or selects a preset from the "Load Preset" dialog
- Progression: User clicks "Load Preset" → modal displays preset options (Conservative, Standard Security, Maximum Security, Alphanumeric Only, PIN Code, Long Passphrase) → user selects preset → criteria automatically configured → user can further customize → generate button creates new password meeting criteria
- Success criteria: Presets apply immediately, controls are intuitive, validation prevents impossible states (all toggles off), symbol customization persists across generations, active preset is visually indicated, changes immediately affect generation

**Preset System**
- Functionality: Pre-configured password policies that set length, character types, and symbol sets for common use cases
- Purpose: Streamlines password generation for users who need to meet specific compliance requirements or security standards
- Trigger: User clicks "Load Preset" button
- Progression: User clicks button → modal opens showing 6 preset options with descriptions → user reviews preset details (length, character types, symbol set) → clicks preset card → criteria applied → modal closes → toast confirms → password regenerates with new criteria
- Success criteria: Presets cover common scenarios (conservative symbols for legacy systems, alphanumeric-only for restrictive policies, maximum security for high-risk accounts, PIN codes), active preset highlighted, instant application

## Edge Case Handling

- **All Character Types Disabled**: If user attempts to disable all character type toggles, prevent the last toggle from being turned off with a subtle shake animation and brief tooltip explaining at least one type is required
- **Very Short Passwords**: Display a warning banner when length is set below 12 characters, explaining that short passwords are vulnerable to brute-force attacks
- **Empty Symbol Set**: Prevent applying empty symbol customization; require at least one character in the custom symbol input field
- **Customize Symbols When Disabled**: Disable the "Customize Symbols" button when the symbols toggle is off to prevent confusion
- **Symbol Set Information**: Display the count of unique symbols in the custom set to help users understand entropy impact
- **Preset Detection**: Highlight the currently active preset in the preset selector modal if criteria exactly match a preset configuration
- **Manual Modifications After Preset**: Allow users to further customize after applying a preset without reverting their changes
- **Clipboard API Unavailable**: Gracefully degrade to a fallback that selects text and shows instructions to manually copy (Ctrl+C / Cmd+C)
- **Hash Computation Errors**: Wrap hash functions in try-catch blocks and display user-friendly error messages if crypto operations fail
- **Empty Password State**: Show placeholder text and disable copy/hash functions until a password is generated

## Design Direction

The design should evoke a sense of technical precision, cryptographic security, and modern sophistication. Think of a professional security tool used by developers and security-conscious users - clean, focused, with subtle references to encryption and mathematical rigor. The interface should feel like a well-engineered instrument: purposeful, uncluttered, and confidence-inspiring.

## Color Selection

A dark, technical aesthetic with vibrant accent colors that communicate security and precision.

- **Primary Color**: Deep midnight blue `oklch(0.25 0.08 250)` - communicates security, trust, and technical depth; used for primary actions and key interactive elements
- **Secondary Colors**: Dark slate background `oklch(0.18 0.01 250)` for main background, slightly lighter slate `oklch(0.22 0.01 250)` for cards, conveying a professional, focused workspace
- **Accent Color**: Electric cyan `oklch(0.75 0.15 195)` - high-tech and attention-grabbing, used for generated passwords, copy success states, and strength indicators at maximum levels
- **Foreground/Background Pairings**: 
  - Background (Dark Slate #1F2128 / oklch(0.18 0.01 250)): Light gray text (#E8E9ED / oklch(0.92 0.01 250)) - Ratio 13.2:1 ✓
  - Card (Medium Slate #2A2D35 / oklch(0.22 0.01 250)): Light gray text (#E8E9ED / oklch(0.92 0.01 250)) - Ratio 11.4:1 ✓
  - Primary (Midnight Blue / oklch(0.25 0.08 250)): White text (#FFFFFF / oklch(1 0 0)) - Ratio 9.8:1 ✓
  - Accent (Electric Cyan / oklch(0.75 0.15 195)): Dark slate (#1F2128 / oklch(0.18 0.01 250)) - Ratio 8.4:1 ✓

## Font Selection

Typography should convey technical precision while maintaining excellent readability - a combination of a clean geometric sans-serif for UI elements and a monospace font for generated passwords and hashes to emphasize their cryptographic nature.

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold / 32px / tight letter spacing (-0.02em) - distinctive geometric forms suggest precision
  - H2 (Section Headers): Space Grotesk Semibold / 20px / normal letter spacing - consistent hierarchy
  - Body (Controls & Labels): Space Grotesk Regular / 15px / relaxed line height (1.6)
  - Code (Passwords & Hashes): JetBrains Mono Regular / 14px / monospace letter spacing - technical authenticity
  - Small (Help Text): Space Grotesk Regular / 13px / muted color - subtle guidance

## Animations

Animations should feel precise and purposeful, like mechanical components of a secure system engaging. Use quick, snappy transitions for interactions and smooth, confident motion for state changes.

- **Generation Animation**: Password characters fade in with a subtle stagger (each character 20ms after previous) to suggest algorithmic processing
- **Strength Bar**: Fills smoothly with easing (0.4s cubic-bezier) when entropy changes, creating satisfying visual feedback
- **Copy Success**: Button scales slightly (1.05x) with a spring effect and icon crossfades from copy to checkmark
- **Toggle Interactions**: Switches slide with physics-based spring animation, feeling tactile and responsive
- **Warning States**: Gentle shake animation (3px horizontal oscillation, 3 cycles over 0.3s) for validation errors
- **Hover States**: Subtle 150ms transitions on buttons and interactive elements to feel responsive without distraction

## Component Selection

- **Components**: 
  - Card: Main container for password generation and hash display sections, elevated with subtle shadow
  - Slider: For password length control (Radix Slider) with custom styling showing tick marks at key intervals
  - Switch: For character type toggles (Radix Switch) with custom styling in accent color when active
  - Button: Primary generation button (Shadcn Button variant="default") and icon-only copy buttons (variant="ghost")
  - Dialog: Modal for symbol customization and preset selection (Radix Dialog) with preset cards and input fields
  - Separator: Dividing sections visually (Radix Separator)
  - Tooltip: Educational hover information for entropy and hash types (Radix Tooltip)
  - Toast: Copy confirmations, preset application success, and warnings (Sonner)
  - Progress: Strength indicator bar (Radix Progress) with custom gradient fill based on entropy level
  
- **Customizations**: 
  - Custom PasswordDisplay component: monospace text with copy button, gradient background when populated
  - Custom StrengthMeter component: combines progress bar with numerical entropy display and color-coded feedback
  - Custom HashOutput component: collapsible section with multiple read-only input fields and individual copy buttons
  - Custom SymbolCustomizer component: dialog-based interface for defining custom symbol sets with reset to defaults, unique symbol count display, and validation
  - Custom PresetSelector component: dialog with clickable preset cards showing policy details (Conservative, Standard, Maximum, Alphanumeric, PIN, Passphrase), active preset highlighted with checkmark
  
- **States**: 
  - Buttons: default (primary blue), hover (brighter blue + subtle lift), active (slightly darker + scale down), disabled (muted gray + reduced opacity)
  - Switches: off (muted gray), on (electric cyan with smooth slide animation), disabled (reduced opacity)
  - Slider: inactive track (dark), active track (gradient from primary to accent), thumb (cyan with shadow + scale on hover)
  - Copy buttons: default (ghost), hover (light background), success (checkmark icon + cyan color for 2s)
  
- **Icon Selection**: 
  - Password/Key (lock icon): Main app icon representing security
  - Copy (squares/clipboard icon): Universal copy action
  - Check (checkmark): Confirmation of successful copy
  - Shuffle/Refresh: Regenerate password action
  - Info (circle-i): Tooltip triggers for educational content and symbol set information
  - Eye/Shield: Password strength and security indicators
  - Gear (settings icon): Symbol customization trigger
  - Reset/Counter-clockwise arrow: Reset to default symbols
  
- **Spacing**: 
  - Container padding: px-6 py-8 on cards
  - Section gaps: gap-6 between major sections
  - Control groups: gap-4 for related controls (toggles, labels)
  - Inline elements: gap-2 for icon-text pairs
  - Vertical rhythm: space-y-4 for form elements, space-y-6 for sections
  
- **Mobile**: 
  - Stack controls vertically with full-width buttons below 768px
  - Reduce card padding to px-4 py-6 on mobile
  - Font sizes scale down slightly (H1: 28px, Body: 14px)
  - Password display wraps with word-break for long strings
  - Bottom sheet pattern for hash display instead of inline expansion on narrow screens
  - Touch-friendly target sizes (min 44px) for all interactive elements
  - Single column layout for all content, maintaining clear visual hierarchy
