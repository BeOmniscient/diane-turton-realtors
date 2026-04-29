# GoHighLevel System Build — Diane Turton, Realtors
### Omniscient Real Estate Growth OS · Confidential

---

## Overview

This document outlines the complete GoHighLevel (GHL) funnel and automation system built for Diane Turton, Realtors. Every workflow is designed to operate automatically from the moment a lead enters the system — with zero manual intervention required until an agent needs to take a qualified appointment.

---

## Account Structure

```
GHL Agency Account: Omniscient / Diane Turton
│
├── Sub-Account: DTR — Spring Lake (Pilot Office 1)
├── Sub-Account: DTR — Manasquan (Pilot Office 2)
└── Sub-Accounts: [12 additional offices — Full Rollout]
    Each sub-account contains:
    ├── 3 Funnels (Buyer / Seller / Rental)
    ├── 3 Pipelines (Buyer / Seller / Rental)
    ├── Workflows (Lead Capture, Nurture, Appointment, Re-engagement)
    ├── Calendars (Per Agent + Office Availability)
    └── Templates (SMS, Email, Voicemail Drop)
```

---

## FUNNELS

### Funnel 1 — Buyer Lead Funnel

**URL slug:** `/buy-jersey-shore` (customized per office)

**Page 1 — Landing Page:**
- Headline: "Find Your Dream Home on the Jersey Shore"
- Sub-headline: "Search exclusive listings with Diane Turton's local experts"
- Background: High-quality coastal lifestyle imagery
- Above-fold CTA: "Search Available Homes" → triggers opt-in form

**Opt-in Form Fields:**
- First Name (required)
- Last Name (required)
- Email (required)
- Phone (required)
- Desired area (dropdown: Spring Lake, Manasquan, Bay Head, Other)
- Budget range (dropdown: Under $500K / $500K–$1M / $1M–$2M / $2M+)
- Timeline (dropdown: ASAP / 1–3 months / 3–6 months / Exploring)
- Pre-approved? (yes/no toggle)

**On submit → Page 2 — Thank You / Calendar:**
- "Your personal search is being prepared — Book a 15-minute call with a local expert"
- Embedded GHL calendar for immediate appointment booking
- If no booking: "We'll text you within the next few minutes"

**Automation triggered on form submit:**
- Tag: `buyer-lead`, `source: [funnel]`, `office: [spring-lake]`
- Pipeline stage: "New Lead — Buyer"
- SMS sent: within 8 seconds (see Workflow 1 below)
- Email sent: within 60 seconds
- Agent assigned: round-robin within office
- AI voice call initiated: if no response within 15 minutes

---

### Funnel 2 — Seller Lead Funnel

**URL slug:** `/sell-my-home`

**Page 1 — Landing Page:**
- Headline: "What Is Your Jersey Shore Home Worth Right Now?"
- Sub-headline: "Get a free, no-obligation market analysis from Diane Turton's top listing specialists"
- CTA: "Get My Home Value" → opt-in form

**Opt-in Form Fields:**
- First Name, Last Name, Email, Phone (required)
- Property address (required)
- Bedrooms / Bathrooms (dropdowns)
- Approximate year built
- Timeline to sell (dropdown: 0–3 months / 3–6 months / 6–12 months / Not sure)
- Reason for selling (optional dropdown)

**On submit → Page 2:**
- "Your market analysis is being prepared — it'll be emailed within 24 hours"
- CTA to book a listing consultation (GHL calendar)
- Social proof: agent photo + "X homes sold in your area this year"

**Automation triggered:**
- Tag: `seller-lead`, `source: [funnel]`
- Pipeline stage: "New Lead — Seller"
- SMS + Email sequence initiated (Seller Nurture)
- Listing specialist assigned (senior agent round-robin)
- CMA report generation task created for assigned agent

---

### Funnel 3 — Rental Lead Funnel

**URL slug:** `/jersey-shore-rentals`

**Page 1 — Landing Page:**
- Headline: "Find Your Perfect Jersey Shore Rental"
- Sub-headline: "Seasonal, annual, and vacation rentals — exclusively managed by Diane Turton"
- CTA: "View Available Rentals" → form

**Form Fields:**
- Name, Email, Phone
- Rental type (seasonal / annual / vacation)
- Number of bedrooms
- Price range
- Desired move-in date
- Specific towns of interest

**Automation triggered:**
- Tag: `rental-lead`
- Pipeline: Rental Pipeline
- SMS sent within 8 seconds
- Rental specialist assigned

---

## WORKFLOWS

### Workflow 1 — New Lead Capture (Universal)

**Trigger:** Contact created with any new-lead tag

**Sequence:**

```
[0:00] TRIGGER: New contact created / lead tag added
         │
         ├─► SMS #1 (within 8 seconds)
         │   "Hi [FirstName]! This is [AgentName] with Diane Turton Realtors — 
         │    I just received your inquiry and wanted to reach out personally. 
         │    Are you available for a quick call in the next few minutes? 
         │    Reply YES or call me at [AgentPhone]."
         │
         ├─► Email #1 (within 60 seconds)
         │   Subject: "Your Jersey Shore search — next steps"
         │   Body: Personalized intro, property search link, agent photo + bio
         │
         ├─► Internal Task: "New lead assigned — call within 15 min" → Agent
         │
[00:15]  ─► IF no response to SMS #1:
         │   AI Voice Call initiated via Retell
         │   (see AI Voice Prompts for script)
         │
[01:00]  ─► IF no connect after AI call:
         │   Voicemail drop: "[FirstName], this is [AgentName] from Diane Turton —
         │    I'm trying to reach you about your inquiry. Please call or text 
         │    [number] at your convenience. Looking forward to helping you!"
         │
[DAY 1]  ─► SMS #2 (if no response)
         │   "Hi [FirstName] — still here and happy to help whenever you're ready. 
         │    Here are a few listings that match what you're looking for: [link]"
         │
[DAY 2]  ─► Email #2: Featured listings in their desired area
         │
[DAY 3]  ─► SMS #3: "Quick question — are you still looking to [buy/sell] in the 
         │    [area]? Just want to make sure I'm sending you the right properties."
         │
[DAY 7]  ─► Email #3: Market insight article + personal note from agent
         │
[DAY 10] ─► SMS #4: "I found a new listing that just came on — thought of you 
         │    right away. Want me to send the details?"
         │
[IF REPLY AT ANY POINT] → Move to "Active Conversation" stage
[IF NO REPLY BY DAY 10] → Move to 90-Day Nurture Workflow
```

---

### Workflow 2 — Seller Nurture Workflow

**Trigger:** Contact tagged `seller-lead` OR pipeline stage = "New Lead — Seller"

**Sequence:**

```
[0:00]   SMS: "Hi [FirstName]! [AgentName] with Diane Turton here. I'm pulling 
          together the comparable sales in your area right now. 
          I'll have your home value estimate ready shortly — 
          can I call you to walk through it?"

[Day 1]  Email: Full CMA email (template with comps, market stats, 
          estimated value range, agent analysis)

[Day 2]  SMS: "Did you get a chance to review your home value analysis? 
          Happy to walk you through it and answer any questions."

[Day 4]  Email: "Why Spring Lake / [Town] sellers are choosing Diane Turton" 
          — recent sales, avg days on market, price-to-list ratio

[Day 7]  SMS: "No pressure at all — I just want to make sure you have 
          everything you need. What's your biggest question about selling right now?"

[Day 10] Email: "Your selling timeline — what you need to know" 
          (educational content for each timeline bucket)

[Day 14] Phone task created for agent: "Follow-up call — seller nurture Day 14"

[Day 21] SMS: "Market update for [area] — [X homes] sold in the last 30 days, 
          avg price: $[X]. Inventory is [up/down]. 
          Good time to be a seller. Want to chat strategy?"

[Day 30] Email: "Your listing potential — case study from a comparable home in [area]"

[Day 45] SMS: "Still happy to help whenever the timing is right. 
          If anything changes with your situation, I'm just a text away."

[Day 60] Email: Market update newsletter (auto-populated from MLS feed)

[Day 90] Agent task: "Re-evaluate seller lead — call or archive"
```

---

### Workflow 3 — Buyer 90-Day Nurture Workflow

**Trigger:** No response after Day 10 initial outreach OR lead scored "Warm/Cool"

**Goal:** Stay top of mind until buyer is ready to transact

**Sequence (abbreviated):**

| Day | Channel | Content |
|-----|---------|---------|
| 14 | Email | "New listings in [desired area] — hand-picked for you" |
| 17 | SMS | "Quick check-in — is [area] still top of your list?" |
| 21 | Email | "[Town] market update — what buyers need to know this month" |
| 28 | SMS | "Interest rates update + what it means for your buying power" |
| 35 | Email | "Behind the scenes: How the best Jersey Shore homes get found before Zillow" |
| 42 | SMS | "Still here — any change in your timeline?" |
| 49 | Email | New listings + open house calendar |
| 60 | SMS | "6 weeks until summer — is now the time to get serious about your search?" |
| 75 | Email | "How to win in a competitive coastal market" (guide) |
| 90 | Task | Agent review: "Nurture lead — call, keep, or archive?" |

---

### Workflow 4 — Appointment Confirmation & Follow-Up

**Trigger:** Appointment booked in GHL calendar

**Sequence:**

```
[Booking moment]
   ├─► Confirmation SMS: 
   │   "You're all set, [FirstName]! Your appointment with [AgentName] from 
   │    Diane Turton is confirmed for [Day], [Date] at [Time].
   │    [Property Address if applicable]
   │    Reply CONFIRM to confirm or RESCHEDULE to change."
   │
   ├─► Confirmation Email (detailed):
   │   - Date, time, agent name + photo
   │   - Office address or property address
   │   - What to expect
   │   - Agent mobile number
   │   - Calendar invite attachment (.ics)

[24 hours before]
   ├─► Reminder SMS: 
   │   "Reminder: You have an appointment tomorrow at [Time] with [AgentName] — 
   │    Diane Turton, Realtors. Looking forward to seeing you! 
   │    Reply CONFIRM or call [number] to reschedule."
   │
   ├─► Reminder Email: Full details + Google Maps link

[2 hours before]
   └─► SMS: "Heading out soon? Your showing/appointment is in 2 hours — 
            see you at [address]! — [AgentName]"

[1 hour after appointment — agent task]
   └─► Task: "Post-appointment follow-up — log outcome in CRM"

[Day after appointment]
   ├─► If outcome = "Showed / No offer":
   │   SMS: "Thank you for your time yesterday, [FirstName]! 
   │    Did anything stand out to you? Happy to pull more options 
   │    based on your feedback."
   │
   └─► If outcome = "No show":
       SMS: "Hi [FirstName] — we missed you today! 
        No worries at all. Would you like to reschedule? 
        Here's a link to find a time that works: [booking link]"
```

---

### Workflow 5 — Post-Close Referral & Review Workflow

**Trigger:** Deal stage moved to "Closed"

```
[Day 1 after close]
   ├─► Congratulations SMS from agent
   └─► Congratulations Email (personal, warm tone)

[Day 7]
   └─► Email: "Settling in? Here are some local resources you'll love"
       (local services, utilities, restaurants, home improvement contacts)

[Day 30]
   └─► SMS: "Hope everything's going well in the new place! 
        If you know anyone looking to buy or sell on the Shore, 
        I'd love to help them the same way I helped you."

[Day 45]
   └─► Email: Google Review request with direct link

[Day 90]
   └─► Email: "Your home's value update — 90 days in, here's where things stand"

[6 months]
   └─► SMS: "Happy 6 months in your new home! Still love it?"

[12 months]
   └─► Email: "Happy 1 year! Your home's current market value + 
        annual market report for [area]"
```

---

## SMS Template Library

### Initial Buyer Outreach
> "Hi [FirstName]! [AgentName] from Diane Turton Realtors here. I just received your request about homes in [Area]. I'd love to help — are you available for a quick 5-minute call today? Or reply here and I'll answer any questions!"

### Initial Seller Outreach
> "Hi [FirstName]! [AgentName] with Diane Turton here. I'm working on your home value analysis for [Address] right now. I'll have it ready shortly — can we schedule a quick call to walk through it together?"

### Hot Lead Immediate Response
> "[FirstName] — [AgentName] from Diane Turton. I literally just saw your inquiry come through. You free for a quick call right now? I don't want you to miss this one."

### After-Hours Inquiry
> "Hi [FirstName]! You reached out after hours — I have everything noted and will call you first thing at [time] tomorrow. In the meantime, here's a search you might like: [link] — [AgentName], Diane Turton Realtors"

### Appointment Reschedule
> "[FirstName] — we missed you today! Totally fine, life happens. Here's a link to pick a new time that works for you: [booking link] — looking forward to connecting!"

---

## Email Template Subjects

| Template | Subject Line |
|----------|-------------|
| Buyer Welcome | "Your Jersey Shore home search starts here, [FirstName]" |
| Seller Welcome | "Your home value analysis — prepared by [AgentName]" |
| New Listings | "[X] new listings in [Area] — just for you" |
| Market Update | "[Town] real estate market — [Month] update" |
| Appointment Confirm | "Confirmed: Your appointment with [AgentName] on [Date]" |
| Post-Close | "Congratulations, [FirstName] — welcome home!" |
| Review Request | "[FirstName], would you share your experience?" |
| Annual Value | "Your home's value today — one year later" |

---

## Pipeline Configuration

### Buyer Pipeline Stages
1. New Lead
2. Contacted (SMS/Call Made)
3. Qualified (Budget + Timeline Confirmed)
4. Appointment Set
5. Showing Completed
6. Active Search
7. Offer Made
8. Under Contract
9. Closed — Won
10. Lost / Inactive

### Seller Pipeline Stages
1. New Lead
2. CMA Requested
3. Listing Consultation Scheduled
4. Listing Consultation Completed
5. Listing Agreement Signed
6. Active Listing
7. Offer Received
8. Under Contract
9. Closed — Won
10. Lost / Inactive

### Rental Pipeline Stages
1. New Inquiry
2. Contacted
3. Qualified
4. Showing Scheduled
5. Application Submitted
6. Lease Signed
7. Closed

---

*Prepared by Omniscient — Real Estate Growth Intelligence*  
*Confidential. Built exclusively for Diane Turton, Realtors.*
