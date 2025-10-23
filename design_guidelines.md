# Design Guidelines: Rutendo Chingamuka Portfolio Website

## Design Approach: Reference-Based (LinkedIn + Modern Portfolio Hybrid)

**Rationale:** This professional portfolio requires credibility and polish found in platforms like LinkedIn and Notion, combined with the visual appeal of modern portfolio sites like those built with Framer or Webflow. The design will emphasize trust, professionalism, and approachability for a pharmacy student entering healthcare leadership.

**Key Design Principles:**
- Professional credibility through clean layouts and restrained animations
- Personal warmth through strategic use of photography and color
- Clear hierarchy that guides visitors through accomplishments
- Accessible, trust-building visual language for healthcare context

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Deep Teal: 186 65% 35% (primary brand color - professional, healthcare-associated)
- Navy Blue: 215 60% 25% (secondary, for depth and authority)
- White: 0 0% 100% (clean backgrounds)
- Light Gray: 210 20% 98% (section backgrounds for separation)

**Accent Colors:**
- Teal Highlight: 186 75% 45% (buttons, links, interactive elements)
- Soft Gray: 210 15% 85% (borders, subtle dividers)
- Success Green: 142 70% 45% (form success states)

**Text Colors:**
- Primary Text: 215 25% 15% (headings, important content)
- Secondary Text: 215 15% 40% (body text, descriptions)
- Muted Text: 210 10% 60% (metadata, captions)

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - headings, UI elements
- Secondary: 'Inter' (Google Fonts) - body text (consistent font family for professional coherence)

**Type Scale:**
- Hero Title: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headings: text-3xl md:text-4xl, font-semibold
- Card Titles: text-xl md:text-2xl, font-semibold
- Body Text: text-base md:text-lg, font-normal, leading-relaxed
- Small Text/Meta: text-sm, font-medium

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24 lg:py-32
- Card gaps: gap-6 md:gap-8
- Element margins: mb-4, mb-6, mb-8 for vertical rhythm

**Container Strategy:**
- Max width: max-w-7xl (large sections) or max-w-6xl (content sections)
- Content sections: max-w-4xl for text-heavy areas
- Full-width backgrounds with centered content containers

**Grid Systems:**
- Experience/Skills cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Two-column layouts: grid-cols-1 lg:grid-cols-2
- Consistent gap-8 for card grids

### D. Component Library

**Navigation:**
- Sticky header with backdrop blur (backdrop-blur-md bg-white/90)
- Logo/name left, navigation links right
- Smooth scroll behavior to sections
- Mobile: Hamburger menu with slide-in drawer

**Hero Section:**
- Two-column layout: Profile photo left (rounded-full shadow-xl), content right
- Large profile image (400x400px minimum, circular crop)
- Name as primary heading with gradient text effect (from-teal-600 to-blue-600)
- Title/tagline below in secondary text
- Social icons row (Gmail, WhatsApp, LinkedIn) with hover scale effect
- Subtle "Learn More" scroll indicator with bounce animation

**Card Components:**
- Elevated cards: bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow
- Border accent on left side: border-l-4 border-teal-500
- Header with organization name + date range
- Role/title in bold
- Description/responsibilities in body text
- Padding: p-6 md:p-8

**Skills Display:**
- Two-column grid on desktop, single on mobile
- Skill items as chips: bg-teal-50 text-teal-700 px-4 py-2 rounded-full
- Icon optional before skill name
- Grouped by category if desired

**Contact Form:**
- Clean, modern form design with floating labels
- Input fields: border-2 border-gray-200 focus:border-teal-500
- Large textarea for message (min-h-32)
- Submit button: Primary teal with hover scale effect
- Success/error states with appropriate messaging
- Form connects to EmailJS or similar service sending to rutendochingamuka4@gmail.com

**Social Icons:**
- Icon size: w-12 h-12
- Circular backgrounds: bg-teal-500 hover:bg-teal-600
- White icon color
- Smooth scale on hover: hover:scale-110 transition-transform
- Open in new tabs for external links

### E. Animation Strategy

**Scroll Animations (Using AOS library):**
- Fade-up animations for section headings (data-aos="fade-up")
- Staggered card entries (data-aos="fade-up" with data-aos-delay increments)
- Image zoom-in effects (data-aos="zoom-in")
- Section transitions on scroll (data-aos-duration="800")

**Micro-interactions:**
- Button hover: Slight scale (scale-105) + shadow increase
- Card hover: Shadow elevation increase + subtle lift (transform translateY(-4px))
- Social icon hover: Scale-110 + background color shift
- Form input focus: Border color change + subtle glow effect
- Smooth scroll behavior for anchor navigation

**Loading States:**
- Subtle fade-in for entire page on load
- Profile image with subtle pulse during load

**Performance:**
- Animations trigger only in viewport (intersection observer)
- Disable animations on mobile for performance (prefers-reduced-motion)
- Keep animation duration 300-800ms maximum

## Section-Specific Guidelines

**Home Section:**
- Full viewport height (min-h-screen) with centered content
- Gradient background: from-gray-50 to-white
- Profile photo with subtle border and shadow
- Social icons in horizontal row with spacing-4

**About Section:**
- Light gray background for contrast
- Single column text layout with max-w-3xl
- Professional summary in larger text (text-lg)
- Personal details in structured list or grid format

**Experience Section:**
- White background
- Masonry or grid layout for role cards
- Timeline visual optional (vertical line with dots)
- Most recent experiences first

**Education Section:**
- Teal accent background (bg-teal-50)
- Centered card for university details
- Include university logo if available

**Skills Section:**
- White background
- Skills grouped in visually appealing grid
- Use of skill badges/chips for modern look

**Contact Section:**
- Dark teal background (bg-teal-700) with white text
- Form in card container (bg-white) for contrast
- Contact information alongside form in two-column layout on desktop

## Images

**Profile Photo:**
- Large circular hero image (500x500px recommended)
- High-quality professional headshot
- Subtle shadow and border
- Placement: Left side of hero section on desktop, centered on mobile

**No additional hero images needed** - the profile photo serves as the primary visual anchor.

**Icons:**
- Use Font Awesome or Heroicons via CDN for social icons and skill icons
- Consistent icon style throughout (outlined or solid, not mixed)

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px - 1024px (two columns where appropriate)
- Desktop: > 1024px (full multi-column layouts)

**Mobile Optimizations:**
- Hero becomes single column, profile photo at top
- Navigation collapses to hamburger menu
- Card grids stack to single column
- Reduce padding/spacing by 30-40%
- Touch-friendly button sizes (min 44x44px)