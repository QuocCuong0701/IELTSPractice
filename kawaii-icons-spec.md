# Kawaii Icons — Generation & Integration Spec

> **Project:** Kawaii English (app-english) — IELTS learning app  
> **Purpose:** Replace generic Lucide React icons with custom Kawaii-style PNG icons  
> **Output format:** PNG (primary, resized to 200×200px)  
> **Total icons:** 21 (existing, already generated)  
> **Status:** ✅ Icons generated — pending integration into app UI

---

## 1. Format Decision: PNG replaces SVG

| Aspect | Decision |
|--------|----------|
| **Primary format** | PNG (200×200px, resized from original 2048×2048px) |
| **Original source** | AI-generated at 2048×2048px, then downscaled |
| **Why not SVG** | The AI generation tool only outputs PNG raster format |
| **Sidecar exports** | mascot.png → 192×192px & 512×512px for PWA manifest |
| **UI integration** | Use `<Image>` from `next/image` for automatic optimization |
| **Utility icons** | Keep Lucide React for small UI icons (checks, arrows, etc.) |

### 1.1 Resizing Strategy

- **Source:** Original 2048×2048px PNGs in `public/icons/`
- **Target:** 200×200px PNGs → overwrite the same files
- **Why 200px:** Crisp on Retina/HiDPI (2× at 100×100 logical px), small enough for fast loading (~10-20KB each vs 2-3MB)
- **Lossy compression:** Use PNG quantize/optipng or convert to WebP as an optimization option

### 1.2 File Naming Convention

```
public/icons/
  icon-dashboard.png      # Module: Dashboard
  icon-vocabulary.png     # Module: Vocabulary
  icon-grammar.png        # Module: Grammar
  icon-reading.png        # Module: Reading
  icon-listening.png      # Module: Listening
  icon-speaking.png       # Module: Speaking
  icon-writing.png        # Module: Writing
  icon-quiz.png           # Module: Quiz
  icon-mock-test.png      # Module: Mock Test
  icon-progress.png       # Module: Progress
  icon-streak.png         # Status: Streak flame
  icon-star.png           # Status: Star
  icon-trophy.png         # Status: Trophy
  icon-medal.png          # Status: Medal
  icon-reward.png         # Status: Gift box / reward
  icon-sparkle.png        # Decorative: Sparkle
  icon-heart.png          # Decorative: Heart
  icon-flower.png         # Decorative: Flower
  icon-arrow.png          # Decorative: Arrow (navigation cards)
  icon-checkmark.png      # Decorative: Checkmark
  mascot.png              # App mascot (kitten with book)

  # PWA manifest icons (exported from mascot.png)
  icon-192.png            # 192×192px PWA icon
  icon-512.png            # 512×512px PWA icon
```

---

## 2. Integration Plan

### 2.1 Replacement Scope

| Area | Replace with PNG? | Details |
|------|-------------------|---------|
| **Sidebar NavBar** (10 icons) | ✅ Yes | Module icons in `NavBar.tsx` |
| **BottomNav** (10 icons) | ✅ Yes | Same module icons in `BottomNav.tsx` |
| **Dashboard module cards** (7 icons) | ✅ Yes | Module icons in `page.tsx` dashboard |
| **Sidebar logo** | ✅ Yes | Replace "E" letter with `mascot.png` |
| **Status badges** (streak, trophy) | ✅ Yes | In `page.tsx` dashboard header |
| **Stats cards** (word count, quiz count) | ✅ Yes | In `page.tsx` quick stats section |
| **PWA manifest icons** | ✅ Yes | `icon-192.png` + `icon-512.png` from mascot |
| **Exercise utility icons** (check, X, arrow, lightbulb, clock, etc.) | ❌ No | Keep Lucide React — too many tiny icons, not worth customizing |
| **Module page headers** (e.g. `reading/page.tsx`) | 💡 Optional | Can replace module-specific icons later |

### 2.2 Approach for Each File

#### NavBar.tsx
- Replace Lucide `Home`, `BookOpen`, `BookText`, `Sparkles`, `Mic`, `Headphones`, `PenTool`, `ClipboardList`, `FileCheck`, `BarChart3` with `<Image>` tags using corresponding PNGs
- Replace the "E" letter logo div with `<Image src="/icons/mascot.png" />`

#### BottomNav.tsx
- Same replacements as NavBar.tsx for the 10 module links

#### Dashboard page.tsx
- Replace Lucide icons in the `modules` array and stats cards with PNGs
- Replace badge icons (Flame → icon-streak.png, Trophy → icon-trophy.png)

#### PWA manifest.json
- Already references `/icon-192.png` and `/icon-512.png` — just ensure these files exist

### 2.3 Component: KawaiiIcon (Optional)

Consider creating a reusable wrapper component:

```tsx
// src/components/ui/KawaiiIcon.tsx
import Image from 'next/image'

interface KawaiiIconProps {
  name: string        // e.g. 'vocabulary', 'streak', 'mascot'
  size?: number       // default 24
  className?: string
}

export default function KawaiiIcon({ name, size = 24, className }: KawaiiIconProps) {
  return (
    <Image
      src={`/icons/icon-${name}.png`}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  )
}
```

This keeps the usage clean: `<KawaiiIcon name="vocabulary" size={24} />`

### 2.4 PWA Icon Generation

- Source: `mascot.png` (2048×2048px)
- Export: resize to 192×192px → `public/icon-192.png`
- Export: resize to 512×512px → `public/icon-512.png`
- The manifest.json already references these paths

---

## 3. Remaining Lucide Icons (Not Replaced)

The following Lucide icons will remain in the app for exercise UIs and utility purposes:

| Icon | Where Used |
|------|-----------|
| `ChevronLeft`, `ChevronRight` | Navigation in module pages |
| `Check` | Exercise answer validation |
| `X` | Incorrect answer indicator |
| `ArrowRight` | Card links, exercise steps |
| `Lightbulb` | Hints in grammar exercises |
| `Volume2` | Audio/speaking exercises |
| `Clock` | Timer, duration indicators |
| `RefreshCw`, `RotateCcw` | Reset/replay actions |
| `Play`, `Square` | Audio recording controls |
| `Loader2` | Loading states |
| `Eye` | Show answers |
| `Shuffle` | Shuffle flashcards |
| `Link2` | Matching exercises |
| `AlertTriangle` | Warnings/errors |
| `Sun`, `Moon` | Theme toggle |
| `Home` | ← will be replaced with PNG |
| `FileText` | Writing module |
| `PenTool` | ← will be replaced with PNG |
| `Sparkles` | ← will be replaced with PNG |
| `ClipboardList` | ← will be replaced with PNG |
| `BarChart3` | ← will be replaced with PNG |
| `BookOpen`, `BookText` | ← will be replaced with PNG |
| `Headphones` | ← will be replaced with PNG |
| `Mic` | ← will be replaced with PNG |
| `Flame` | ← will be replaced with PNG |
| `Star` | ← will be replaced with PNG |
| `Trophy` | ← will be replaced with PNG |
| `Award` | Progress page |
| `Target` | Mock test |
| `FileCheck` | ← will be replaced with PNG |

---

## 4. Integration Order

1. **Resize** PNGs from 2048×2048 → 200×200px (using ImageMagick or sharp)
2. **Export** PWA icons: mascot.png → 192×192 + 512×512
3. **Create** `KawaiiIcon` component (optional but recommended)
4. **Update** `NavBar.tsx` — sidebar icons + mascot logo
5. **Update** `BottomNav.tsx` — bottom nav icons
6. **Update** `page.tsx` — dashboard module cards + stats + badges
7. **Update** `page.tsx` sidebar — logo mascot
8. **Verify** `manifest.json` icon paths

---

## 5. Design System (Unchanged from Original)

### 5.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `kawaii-pink` | `#FFB5C2` | Vocabulary, decorative, primary accent |
| `kawaii-pink-dark` | `#FF8FA3` | Darker variant, shadows |
| `kawaii-lavender` | `#C3AED6` | Grammar, secondary accent |
| `kawaii-lavender-dark` | `#A88DC4` | Darker variant, shadows |
| `kawaii-mint` | `#B5EAD7` | Reading |
| `kawaii-mint-dark` | `#8EDBBF` | Darker variant |
| `kawaii-peach` | `#FFDAC1` | Listening |
| `kawaii-peach-dark` | `#FFC4A0` | Darker variant |
| `kawaii-yellow` | `#FFF5BA` | Writing |
| `kawaii-yellow-dark` | `#FFEDA3` | Darker variant |
| `kawaii-blue` | `#B3D9FF` | Mock Test |
| `kawaii-blue-dark` | `#8BB8E6` | Darker variant |
| `kawaii-coral` | `#FFB3B3` | Quiz |
| `kawaii-teal` | `#B3E6D9` | Progress |
| `kawaii-rose` | `#FFB3D9` | Speaking |
| `kawaii-amber` | `#FFD9B3` | Dashboard |
| `kawaii-text` | `#4A4063` | Dark text |
| `kawaii-text-light` | `#8B7FAE` | Light text |

### 5.2 Icon List

| # | Name | Subject | Assigned Color | File |
|---|------|---------|---------------|------|
| 1 | **Dashboard** | Kawaii house | `kawaii-amber` | `icon-dashboard.png` |
| 2 | **Vocabulary** | Notebook with tabs | `kawaii-pink` | `icon-vocabulary.png` |
| 3 | **Grammar** | Puzzle pieces | `kawaii-lavender` | `icon-grammar.png` |
| 4 | **Reading** | Open book + glasses | `kawaii-mint` | `icon-reading.png` |
| 5 | **Listening** | Headphones + music notes | `kawaii-peach` | `icon-listening.png` |
| 6 | **Speaking** | Microphone | `kawaii-rose` | `icon-speaking.png` |
| 7 | **Writing** | Pencil + paper | `kawaii-yellow` | `icon-writing.png` |
| 8 | **Quiz** | Checklist + stars | `kawaii-coral` | `icon-quiz.png` |
| 9 | **Mock Test** | Clipboard + clock | `kawaii-blue` | `icon-mock-test.png` |
| 10 | **Progress** | Trophy + charts | `kawaii-teal` | `icon-progress.png` |
| 11 | **Streak** | Flame | `kawaii-coral` | `icon-streak.png` |
| 12 | **Star** | Star | `kawaii-yellow-dark` | `icon-star.png` |
| 13 | **Trophy** | Trophy | `kawaii-amber` | `icon-trophy.png` |
| 14 | **Medal** | Medal | `kawaii-mint-dark` | `icon-medal.png` |
| 15 | **Reward** | Gift box | `kawaii-pink` | `icon-reward.png` |
| 16 | **Sparkle** | Sparkle | `kawaii-yellow-dark` | `icon-sparkle.png` |
| 17 | **Heart** | Heart | `kawaii-pink` | `icon-heart.png` |
| 18 | **Flower** | Flower | `kawaii-rose` | `icon-flower.png` |
| 19 | **Arrow** | Arrow | `kawaii-lavender` | `icon-arrow.png` |
| 20 | **Checkmark** | Checkmark | `kawaii-mint-dark` | `icon-checkmark.png` |
| 21 | **Mascot** | Kawaii kitten | All palette | `mascot.png` |

---

## 6. Acceptance Criteria

- [ ] All PNG files exist in `public/icons/` at 200×200px
- [ ] `icon-192.png` (192×192) and `icon-512.png` (512×512) exist in `public/`
- [ ] PNGs have transparent backgrounds (no white rectangle)
- [ ] Icons render correctly in NavBar sidebar
- [ ] Icons render correctly in BottomNav
- [ ] Icons render correctly on Dashboard module cards
- [ ] Sidebar logo shows mascot instead of "E"
- [ ] Lucide icons still work for exercise UIs (no regression)
- [ ] Light mode + dark mode both look good
- [ ] PWA manifest points to correct icon files

---

## 7. Dark Mode

The PNG icons already have transparent backgrounds and use pastel colors that contrast well with both:
- **Light mode** (`#FFF8F5` background)
- **Dark mode** (`#1a1625` background)

No dark mode variants needed.

---

## 8. Next Steps

1. Resize PNGs (2048×2048 → 200×200)
2. Create PWA icons from mascot.png
3. Create `KawaiiIcon` component
4. Update `NavBar.tsx`, `BottomNav.tsx`, `page.tsx`
5. Test light + dark mode
6. Verify PWA manifest
