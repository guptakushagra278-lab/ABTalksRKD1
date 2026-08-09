# AI USE LOG — ABTALKS REDESIGN

## AI Tool Used
**Google AI Studio**

## Purpose of AI Usage
AI was used as a development assistant to implement, refine, debug, and polish the ABTalks 60-Day Coding Challenge platform.

## Development Tasks Assisted by AI

### 1. Initial UI Implementation
AI was used to implement the core mobile-first ABTalks experience, including:

- Landing page
- Login page
- Student Dashboard
- Challenge Day page
- Bottom navigation
- Challenge progress
- Streak and Build Vault components
- Submission interface

### 2. Login Experience
AI was used to implement and refine the login experience with:

- Username
- Email
- Password
- Removal of Google login
- Username display throughout the student experience

### 3. Dashboard Improvements
AI assisted with:

- Current challenge day
- Student streak
- Challenge progress
- Build Vault
- Momentum gauge
- Student achievements/progress information
- Synchronization of challenge-day information

### 4. Challenge Day Experience
AI was used to build the complete challenge-day experience, including:

- Today's task
- Problem description
- What needs to be built
- Build guidance
- Challenge objectives
- Stretch goal
- GitHub repository submission
- GitHub commit submission
- LinkedIn post submission
- Live deployment URL
- Submission confirmation

### 5. Hindi Language Support
A language toggle was added specifically to the Challenge Day problem description.

Features implemented:

- English as the default language
- Hindi translation option
- English ↔ Hindi switching
- Only the problem description changes language
- Submission interface and navigation remain in English

### 6. Theme System
AI was used to implement the Light/Dark theme switcher.

Dark Mode retains the ABTalks neon developer aesthetic.

Light Mode uses the selected blue palette:

- `#E3F2FD`
- `#90CAF9`
- `#2196F3`
- `#0D47A1`

The theme preference is persisted so it remains consistent while navigating through the application.

A theme toggle was also added to the Dashboard.

### 7. Interaction Design
AI assisted with adding:

- Button hover scaling
- Backlit hover effects
- Smooth page transitions
- Reduced-motion consideration
- Responsive mobile behavior

The target viewport was primarily **390px mobile width**.

### 8. Challenge Progress & Build Vault
AI was used to fix and implement challenge-progress behavior.

The Build Vault now:

- Starts at 0 for a new user
- Increases after a successful challenge submission
- Counts unique completed days
- Does not count the same challenge twice
- Maintains progress separately for different users
- Persists existing users' progress

### 9. Challenge Completion Popup
AI was used to debug the completion popup so that it displays the **day that was actually completed**, rather than the next challenge day.

For example:

```text
Day 1 submitted
→ DAY 1 COMPLETED
```

The popup was also simplified so that only the **View Progress** button remains.

### 10. Challenge-Day Synchronization
AI was used to ensure that the displayed challenge day is synchronized with the Dashboard's current challenge day rather than relying on an independently hardcoded value.

---

## Human Design & Product Decisions

AI was used primarily as an implementation and debugging assistant.

The following product/design decisions were directed by the designer:

- Mobile-first approach
- 60-day challenge structure
- Login requirements
- Dashboard information hierarchy
- Challenge Day content structure
- Build Vault behavior
- English/Hindi description toggle
- Light/Dark theme concept
- Selected color palettes
- Button interaction behavior
- Page transition behavior
- Challenge completion popup behavior
- Which navigation options should be present
- Which elements should remain unchanged during iterative updates

## AI Contribution

AI primarily contributed to:

**Implementation → Debugging → Refactoring → Interaction behavior → Responsive adjustments → UI polish**

All generated code was reviewed and iteratively refined based on the intended product experience.

## Development Approach

The project was developed iteratively. Instead of rebuilding the application after every change, targeted prompts were used to modify specific parts of the existing implementation while explicitly preserving previously completed functionality.

This approach was used to reduce regressions and maintain consistency across the application.

## Validation

The implementation was repeatedly checked against:

- 390px mobile viewport
- Navigation between routes
- Theme switching
- Challenge submission
- Challenge completion
- Build Vault updates
- New-user state
- Existing-user state
- English/Hindi switching
- Responsive behavior
- UI consistency