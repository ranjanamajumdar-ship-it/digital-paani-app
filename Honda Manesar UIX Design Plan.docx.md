# **Honda Manesar STP — UI/UX Design Plan**

## **Operator-Facing Screens: Issues, To Do, Tasks, Equipment History**

**Site:** Honda Manesar STP, 600 KLD MBR-based  
**Version:** V2 (Discrepancy corrections applied)  
**Audience:** UI/UX Designer \+ Product Engineering Team  
**Platform:** Capacitor app on Android (mobile web wrapped as native)  
**Language Default:** Hindi (हिंदी) at target sites — LLM-powered translation (see Section 6\)  
**Companion document:** Honda\_Manesar\_Diagnostic\_Trees.md

 

 

## **1\. The Operator We Are Designing For**

 

| Attribute | Detail |
| :---- | :---- |
| **Name (persona)** | Ramesh (composite) |
| **Age** | 22–45 |
| **Education** | ITI diploma or on-the-job learning |
| **Language** | Hindi primary; limited English literacy |
| **Device** | Android smartphone, ₹8,000–₹12,000 range; screen \~5.5" |
| **Apps comfortable with** | WhatsApp, YouTube — taps, swipes, scrolls |
| **Shift** | 8–12 hour shifts, often night shift, sometimes 2 jobs (16h+) |
| **Motivation** | Job security, avoiding blame, doing the job without hassle |
| **Pain point today** | Gets alerts on WhatsApp that he doesn't know what to do with; has to call someone every time |
| **What success looks like** | He gets a WhatsApp message, taps it, lands exactly on the issue, does what it says, marks it done |

   
**What we must never make him do:**

* Read a paragraph to understand what's wrong

* Navigate more than 2 taps to start addressing an alert

* Enter data on a tiny form with 10 fields at once

* See English error messages he can't read

* Wonder what to do next

 

 

## **2\. Design Principles**

### **P1: One Primary Action Per Screen**

Every screen has exactly one thing the operator should do. Secondary actions exist but are visually subordinate.

 

### **P2: Traffic Light Always Wins**

Red \= stop / danger / overdue. Amber \= warning / due soon. Green \= good / done. Use icons \+ color together — never color alone.

 

### **P3: Hindi First, Always**

Every operator-facing string is in Hindi (LLM-translated, see Section 6). Technical abbreviations operators know from panels (TMP, VFD, DO, pH, MBR, NRV) stay in English. First occurrence: "TMP (Membrane का दबाव)" — then just "TMP" thereafter.

 

### **P4: Big Enough to Tap in Gloves**

Minimum tap target: 48dp. Primary action buttons: 56dp height, full width.

 

### **P5: Icons \+ Text, Always Together**

Never an icon alone. Never text alone where an icon would add meaning.

 

### **P6: Tell Them What to Do, Not Just What's Wrong**

An alert card doesn't say "MBR Turbidity High." It says "MBR का पानी गंदा है — जांच शुरू करें।"

 

### **P7: Auto-Save Everything**

Every answer, task step, and note auto-saved as entered. No "Submit" for individual steps. "Submit" only on truly final actions.

 

### **P8: Offline First for Task Completion**

Complete tasks even if network drops. Sync silently when connectivity returns. Never show a network error when completing a task.

 

### **P9: Photo Evidence Made Simple**

Camera launches in one tap. Auto-tags timestamp, operator ID, task ID, GPS. No metadata entry by operator.

 

### **P10: No Dead Ends**

Every screen has a clear path forward. "Supervisor को बताएं" is always available as a last resort.

 

### **P11: Loud for Critical, Quiet for Routine**

Critical alerts: full-screen push notification, haptic vibration, sound. Cannot be swiped away without acknowledging. Routine reminders: badge \+ soft sound.

 

### **P12: Protect the Operator from Blame**

The system records what the operator did and when. Frame UX around helping them do their job well, not catching mistakes.

 

 

## **3\. Navigation Architecture**

### **Bottom Tab Bar (4 tabs — fixed, always visible)**

 

| Tab | Icon | Hindi Label | Badge |
| :---- | :---- | :---- | :---- |
| Home | 🏠 | घर | Issue count (colored by worst severity) |
| Issues | ⚠️ | समस्याएं | Active issue count |
| To Do | ✅ | काम | Overdue task count (red) |
| Plant | 🏭 | प्लांट | — |

   
**Tab behavior:**

* Badge: red circle with number for overdue/critical; amber for pending

* Tapping an active tab scrolls the list back to top

* No fifth tab. Gamification, profile, and settings are accessible from the Home menu (☰) — not a primary tab

 

**Rationale for this structure:**

* **Home** \= "Am I okay and what's happening on my shift?" — shift briefing, handover, health at a glance

* **Issues** \= "What's wrong?" — alerts and active problems, browseable separately from the to-do list

* **To Do** \= "What do I need to do right now?" — today's work, ordered by urgency

* **Plant** \= "What's the state of the plant?" — equipment and sensors

 

 

## **4\. Six Task Types (Operator-Facing)**

Every task the operator sees belongs to exactly one of these types. This is the MECE classification used for badges, screen labels, and routing.

 

| Type | Hindi Badge | What it is | Triggered by |
| :---- | :---- | :---- | :---- |
| **Fixed / Routine** | 🟢 नियमित | Recurring checklist on fixed schedule | Schedule |
| **Preventive Check** | ⚫ Inspection | Guided inspection; abnormal findings auto-create Issues | Schedule or Supervisor |
| **Data Entry** | 🔵 डेटा | Lab results, manual readings, chemical logs | Schedule |
| **Dynamic Inspection** | 🟣 जांच | Alert-driven investigation \+ remediation; branching diagnostic flow | Issue (alert-triggered) |
| **Recommendation** | 🟡 सुझाव | Follow-up on system-generated intelligence action | Recommendation engine |
| **Corrective Action** | 🔴 सुधार | Compliance-linked fix; mandatory audit trail | Issue (compliance/quality) |

   
**Internal step model:** Within a Dynamic Inspection task, the operator progresses through three phases — **Diagnostic** (investigate), **Remediation** (fix), **Monitoring** (observe after fix). These are step labels within the task flow, not separate task types. Verification is a Supervisor-level step at the Issue level (see Section 5, Supervisor Verification screen).

 

 

## **5\. Screen Specifications**

### **SCREEN: Home (घर)**

**Purpose:** "What's happening on my shift? Am I okay?"

 

           
    ┌─────────────────────────────────────────────┐      
    │  Honda Manesar STP              \[☰ Menu\]    │      
    │  बुधवार, 16 April  ·  Morning Shift         │      
    │  Ramesh Kumar · चेक-इन: 6:02 AM            │      
    ├─────────────────────────────────────────────┤      
    │  \[Shift Handover Banner — if just started\]  │      
    │  ┌──────────────────────────────────────────┐│      
    │  │ 🔄 Shift Handover — Deepak (रात) से     ││      
    │  │ "Blower 2 की आवाज़ थोड़ी अजीब थी।         ││      
    │  │  MBR cleaning kal nahi hui."            ││      
    │  │            \[✓ समझ गया — शुरू करें\]       ││      
    │  └──────────────────────────────────────────┘│      
    ├─────────────────────────────────────────────┤      
    │            PLANT HEALTH ORB (large)         │      
    │            ●  (Red / Amber / Green)         │      
    │       "1 गंभीर समस्या है"                    │      
    ├─────────────────────────────────────────────┤      
    │  ⚠️ समस्याएं        ✅ आज का काम             │      
    │  \[3 Critical\]       \[4/9 हो गए\]             │      
    │  \[1 High\]           \[2 Overdue\]             │      
    │  \> देखें             \> देखें                 │      
    ├─────────────────────────────────────────────┤      
    │  ⚡ अभी करें (due / overdue in next 2h)     │      
    │  ┌─────────────────┐  ┌─────────────────┐  │      
    │  │ SV30 लें        │  │ Manual Data      │  │      
    │  │ Overdue 1h 20m  │  │ Enter करें       │  │      
    │  └─────────────────┘  └─────────────────┘  │      
    ├─────────────────────────────────────────────┤      
    │  📊 Live Readings (collapsed)               │      
    │  EQT 72%  ·  TMP \-0.38  ·  DO 2.4  ·  NTU 3.2 │      
    │  \> सब Sensors देखें                        │      
    └─────────────────────────────────────────────┘      
         

 

**Shift Handover Banner:**

* Shown only at shift start until operator acknowledges it

* Shows outgoing operator's name, shift end time, and their handover note (text or transcribed voice)

* Tapping "समझ गया" logs acknowledgment as an Event; banner dismisses

* If no handover note was left: "Deepak (रात) ने कोई handover note नहीं छोड़ी।"

 

 

### **SCREEN: Issues List (समस्याएं)**

**Purpose:** "What's wrong, in order of urgency?"

 

           
    ┌─────────────────────────────────────────────┐      
    │  ← समस्याएं                    \[Filter ▼\]  │      
    │  \[सब\] \[Open\] \[मेरी\] \[आज बंद हुई\]            │      
    ├─────────────────────────────────────────────┤      
    │  🔴 Critical — 1                            │      
    │ ┌───────────────────────────────────────────┐│      
    │ │ 🔴 \[MBR Icon\] MBR-1 Membrane चोक हो गई  ││      
    │ │  2 घंटे से open · Verification pending   ││      
    │ │  "Maintenance Cleaning complete — pending ││      
    │ │   Supervisor verification"               ││      
    │ │                    \[देखें →\]             ││      
    │ └───────────────────────────────────────────┘│      
    ├─────────────────────────────────────────────┤      
    │  🟠 High — 2                                │      
    │ ┌───────────────────────────────────────────┐│      
    │ │ 🟠 \[DO Icon\] DO कम है — Aeration Tank    ││      
    │ │  45 मिनट से open है                      ││      
    │ │  "Blower check करें"                     ││      
    │ │                    \[जांच शुरू करें →\]    ││      
    │ └───────────────────────────────────────────┘│      
    ├─────────────────────────────────────────────┤      
    │                                             │      
    │  \[+ नई समस्या Report करें\]  ← always visible│      
    │  (Sensor ने नहीं पकड़ी? खुद report करें)   │      
    └─────────────────────────────────────────────┘      
         

 

**"नई समस्या Report करें" button:**

* Always visible at the bottom of the Issues list — persistent, not buried

* Purpose: close the Type 1 error gap; capture issues the system didn't detect

* Tapping opens a short form: Equipment (searchable list), What did you notice? (text or voice), Photo (optional)

* Creates an Issue with source \= "Operator Reported (Manual)" — distinct from system-generated issues in the data model

* This is the most strategically important button on this screen

 

**Issue card CTAs by state:**

* No diagnostic started: "जांच शुरू करें →"

* Diagnostic in progress: "जारी रखें →"

* Remediation task pending: "काम देखें →"

* Work completed, awaiting verification: "Verification pending" (grey, informational — operator has done their part)

* Supervisor verified: "✓ बंद हो गई"

 

**Optional — Alert usefulness rating:**  
When an issue is closed, an optional 👍/👎 prompt appears: "क्या यह alert काम का था?" — single tap, dismissible. This is not a required step; it is an inline micro-action. Implementation note: this is low-friction data collection for alert quality tuning (see Data Collection Use Cases document, V/E \= 5.0). Design it as opt-in at first; track response rate to decide whether to make it mandatory later.

 

 

### **SCREEN: Issue Detail (समस्या की जानकारी)**

           
    ┌─────────────────────────────────────────────┐      
    │  ← समस्याएं                                │      
    │  🔴 CRITICAL  ·  2h 15m से open है         │      
    ├─────────────────────────────────────────────┤      
    │  \[MBR Icon — large\]                         │      
    │  MBR-1 Membrane चोक हो गई है               │      
    │  MBR-1 Tank · Secondary Treatment           │      
    ├─────────────────────────────────────────────┤      
    │  📌 अभी यह करें:                            │      
    │  ┌──────────────────────────────────────────┐│      
    │  │ 🟣 Dynamic Inspection Task              ││      
    │  │ "MBR-1 Turbidity जांच"                  ││      
    │  │ Step 2 of 6 · चल रही है                 ││      
    │  │            \[जारी रखें →\]                ││      
    │  └──────────────────────────────────────────┘│      
    ├─────────────────────────────────────────────┤      
    │  Live Readings                              │      
    │  TMP: \-0.62 kg/cm² 🔴   Flux: 12.3 LMH 🔴  │      
    │  Turbidity: 7.8 NTU 🔴                     │      
    ├─────────────────────────────────────────────┤      
    │  Timeline (newest first):                   │      
    │  ● 14:32 · जांच task शुरू हुई              │      
    │  ● 14:15 · Issue बनी (Alert fired)         │      
    │  ● 14:15 · TMP \-0.62 kg/cm² detected       │      
    ├─────────────────────────────────────────────┤      
    │  \[MBR-1 Tank देखें →\] (→ Equipment Detail) │      
    │  \[⬆️ Supervisor को बताएं\]                   │      
    └─────────────────────────────────────────────┘      
         

 

**When work is completed and awaiting Supervisor verification:**

           
    │  📌 स्थिति:                                 │      
    │  ┌──────────────────────────────────────────┐│      
    │  │ ✅ Maintenance Cleaning हो गई             ││      
    │  │ Ramesh · 14:32 से 22:45                 ││      
    │  │ ⏳ Supervisor Verification का इंतज़ार है  ││      
    │  └──────────────────────────────────────────┘│      
         

 

 

### **SCREEN: Diagnostic Flow (जांच — Dynamic Inspection Task, Diagnostic Phase)**

**This is the Diagnostic phase within a Dynamic Inspection task.**

 

           
    ┌─────────────────────────────────────────────┐      
    │  ← वापस    Step 2 / 6    \[X बंद करें\]       │      
    │  🟣 Dynamic Inspection · Diagnostic Phase  │      
    │  MBR-1 Membrane जांच                       │      
    ├─────────────────────────────────────────────┤      
    │  ──────────── ●●○○○○ ───────────────        │      
    ├─────────────────────────────────────────────┤      
    │  \[Equipment illustration — MBR Tank\]        │      
    │                                             │      
    │  MBR टैंक में ऊपर झाग दिख रहा है?           │      
    │                                             │      
    │  Panel में / Tank के पास जाकर देखें          │      
    ├─────────────────────────────────────────────┤      
    │  ┌──────────────┐    ┌──────────────────┐  │      
    │  │   हाँ 👍     │    │     नहीं 👎       │  │      
    │  └──────────────┘    └──────────────────┘  │      
    │                                             │      
    │  📏 Instrument है? Reading enter करें       │      
    └─────────────────────────────────────────────┘      
         

 

**Auto-check screen (system reading a sensor — decisive branch):**

 

           
    ┌─────────────────────────────────────────────┐      
    │  ── ●●○○○○ ─────────────────               │      
    │                                             │      
    │  MBR Blower की स्थिति                       │      
    │  बंद है 🔴                                  │      
    │                                             │      
    │  \[━━━━━━━━░░  आगे बढ़ें — 5s\]               │      
    │  🚩 यह सही नहीं है                          │      
    └─────────────────────────────────────────────┘      
         

 

**Question types:**

 

| Type | UI |
| :---- | :---- |
| Yes / No | Two full-width buttons: हाँ / नहीं |
| Multiple choice | Vertical list of tap-targets with icons |
| Numeric measurement | Large number input \+ unit; skip option |
| System auto-check (decisive) | Value display \+ 5s timer \+ escape hatch |
| System auto-check (context only) | Value display \+ 5s timer, no escape hatch |

 

 

### **SCREEN: Diagnostic Summary \+ Root Cause (जांच पूरी हुई)**

           
    ┌─────────────────────────────────────────────┐      
    │  ✓ Diagnostic Phase पूरी हुई                │      
    ├─────────────────────────────────────────────┤      
    │  यह पाया गया:                               │      
    │  "MBR Blower बंद था — Restart किया।          │      
    │   TMP 30 मिनट में normal होना चाहिए।"        │      
    ├─────────────────────────────────────────────┤      
    │  कारण क्या था? (Root Cause)                 │      
    │  ┌──────────────────────────────────────────┐│      
    │  │ ○ Membrane Fouling                       ││      
    │  │ ○ Blower / Aeration issue                ││      
    │  │ ○ High MLSS / SV30                       ││      
    │  │ ○ VFD / Speed issue                      ││      
    │  │ ○ पता नहीं / Unknown                     ││      
    │  └──────────────────────────────────────────┘│      
    │  (System pre-selects most likely based on   │      
    │   diagnostic answers. Operator can change.) │      
    ├─────────────────────────────────────────────┤      
    │  अब यह करें:                                │      
    │  ┌──────────────────────────────────────────┐│      
    │  │ 🔴 Remediation Phase शुरू करें           ││      
    │  │ "Membrane Maintenance Cleaning"          ││      
    │  │              \[शुरू करें →\]               ││      
    │  └──────────────────────────────────────────┘│      
    └─────────────────────────────────────────────┘      
         

 

**Root cause selection:**

* System pre-selects the most likely cause based on the diagnostic path taken

* Operator confirms or changes — one tap

* This is logged as an Event on the Issue timeline and on Equipment History

* Data feeds alert quality tuning and future diagnostic tree refinement

* "पता नहीं" is always an option — no operator should feel pressured to guess

 

 

### **SCREEN: To Do List (आज का काम)**

           
    ┌─────────────────────────────────────────────┐      
    │  आज का काम          बुधवार, 16 April        │      
    │  4 / 9 हो गए    ████░░░░░░ 44%             │      
    ├─────────────────────────────────────────────┤      
    │  🔴 OVERDUE — 2 काम                         │      
    │ ┌───────────────────────────────────────────┐│      
    │ │ ⏰ SV30 जाँच · Overdue 1h 20m            ││      
    │ │ Aeration Tank · 🔵 Data Entry            ││      
    │ │                    \[शुरू करें →\]         ││      
    │ └───────────────────────────────────────────┘│      
    │ ┌───────────────────────────────────────────┐│      
    │ │ ⏰ Manual Readings · Overdue 50m          ││      
    │ │ All Tanks · 🔵 Data Entry                ││      
    │ │                    \[शुरू करें →\]         ││      
    │ └───────────────────────────────────────────┘│      
    ├─────────────────────────────────────────────┤      
    │  🟡 अभी करें — 3 काम (due within 2h)        │      
    │ ┌───────────────────────────────────────────┐│      
    │ │ 🟣 MBR-1 Membrane जांच                   ││      
    │ │ Issue से जुड़ा · 🟣 Dynamic Inspection   ││      
    │ │                    \[शुरू करें →\]         ││      
    │ └───────────────────────────────────────────┘│      
    │  \[+ 2 more...\]                              │      
    ├─────────────────────────────────────────────┤      
    │  🟢 बाद में — 4 काम                          │      
    │  \[collapsed — tap to expand\]                │      
    └─────────────────────────────────────────────┘      
         

 

**Task type badges (MECE set):**

* 🟢 नियमित — Fixed / Routine

* ⚫ Inspection — Preventive Check

* 🔵 Data Entry — डेटा

* 🟣 Dynamic Inspection — जांच (Issue-linked)

* 🟡 Recommendation — सुझाव

* 🔴 Corrective Action — सुधार

 

 

### **SCREEN: Task Detail — Fixed / Routine (नियमित काम)**

Example: Equipment visual inspection, SV30 measurement, chemical preparation

 

           
    ┌─────────────────────────────────────────────┐      
    │  ← वापस                    \[Help ?\]         │      
    │  🟢 नियमित काम                              │      
    │  SV30 जाँचें — Aeration Tank               │      
    │  Due: 08:00  ·  Overdue 1h 20m             │      
    ├─────────────────────────────────────────────┤      
    │  Step 3 / 4 — अभी करें:                    │      
    │  SV30 Reading मापें और enter करें           │      
    │                                             │      
    │  पिछली reading: 32%  (yesterday 08:00)     │      
    │  ┌──────────────────────────────────────────┐│      
    │  │            \[  3 2  \]  %                  ││      
    │  └──────────────────────────────────────────┘│      
    │  Range: 25–40% normal                       │      
    │                                             │      
    │  \[आगे बढ़ें →\]                               │      
    │  📷 Photo (optional)  📝 Note (optional)   │      
    ├─────────────────────────────────────────────┤      
    │  ✓ 1\. Sample लें              ✓ 2\. 30 min wait│      
    │  ● 3\. Reading लें             ○ 4\. Enter करें│      
    ├─────────────────────────────────────────────┤      
    │  \[✓ काम पूरा हुआ\]  (active when steps done) │      
    └─────────────────────────────────────────────┘      
         

 

If value entered is out of range: "⚠️ यह value range से बाहर है — एक Issue बन जाएगा" → auto-triggers relevant diagnostic tree.

 

 

### **SCREEN: Task Detail — Data Entry (डेटा दर्ज करना)**

**Philosophy:** One parameter group at a time. Not a 10-field form.

 

           
    ┌─────────────────────────────────────────────┐      
    │  ← वापस        3 / 6 groups done           │      
    │  🔵 डेटा दर्ज करें                           │      
    │  Manual Readings — 09:15 का काम            │      
    ├─────────────────────────────────────────────┤      
    │  Aeration Tank                              │      
    │  ─────────────────────────────────────────  │      
    │  pH   पिछली: 7.2  (yesterday)              │      
    │  ┌──────────────────────────────────────┐   │      
    │  │            \[  7  .  4  \]             │   │      
    │  └──────────────────────────────────────┘   │      
    │  Range: 6.0 – 8.0  🟢                      │      
    │                                             │      
    │  DO   पिछली: 2.8  (yesterday)              │      
    │  ┌──────────────────────────────────────┐   │      
    │  │            \[     \]                   │   │      
    │  └──────────────────────────────────────┘   │      
    │  mg/L  ·  Range: 1.0 – 4.0                 │      
    ├─────────────────────────────────────────────┤      
    │  \[← Equalization done\]  \[Aeration done →\]  │      
    └─────────────────────────────────────────────┘      
         

 

Out-of-range handling: real-time red border \+ Hindi message as operator types. On submit: auto-triggers Issue creation for any out-of-range values.

 

 

### **SCREEN: Task Detail — Preventive Check (Inspection)**

Example: Monthly pump PM, weekly blower inspection

 

           
    ┌─────────────────────────────────────────────┐      
    │  ← वापस                Step 2 / 7          │      
    │  ⚫ Inspection                              │      
    │  Reactor Feed Pump — Monthly PM             │      
    ├─────────────────────────────────────────────┤      
    │  ⚠️ पहले Pump को Maintenance Mode में डालें  │      
    │  ┌──────────────────────────────────────────┐│      
    │  │ Pump-1: 🟢 चल रहा है                    ││      
    │  │  \[🏚️ Maintenance Mode में डालें\]         ││      
    │  └──────────────────────────────────────────┘│      
    │  (Checklist steps unlock after this)        │      
    ├─────────────────────────────────────────────┤      
    │  🔒 1\. Impeller और casing clean करें        │      
    │  🔒 2\. Bearing lubrication check करें       │      
    │  🔒 3\. Shaft seal check करें               │      
    │  🔒 4\. NRV test करें                       │      
    │  🔒 5\. Trial run (2 min) करें              │      
    └─────────────────────────────────────────────┘      
         

 

After all steps \+ photos done:

           
    │  PM हो गई ✓                                │      
    │  Pump वापस चालू करना है?                    │      
    │  \[✓ हाँ — चालू करें \+ Maintenance Mode हटाएं\]│      
    │  \[Maintenance Mode रखें — और काम बाकी है\]   │      
         

 

 

### **SCREEN: Task Detail — Dynamic Inspection (जांच — full flow)**

A Dynamic Inspection task has three sequential phases shown in the header:

 

           
      \[Diagnostic Phase ●●●○\] → \[Remediation Phase ○○\] → \[Monitoring Phase ○\]      
         

 

The **Diagnostic Phase** uses the Diagnostic Flow screen (Section 5 above).

 

After diagnosis, it transitions to **Remediation Phase**:

 

           
    ┌─────────────────────────────────────────────┐      
    │  ← वापस                   Step 3 of 11     │      
    │  🟣 Dynamic Inspection · Remediation Phase │      
    │  Membrane Maintenance Cleaning — MBR-1     │      
    │  Estimated: 8 घंटे · Started: 09:30        │      
    ├─────────────────────────────────────────────┤      
    │  ─────── ●●●○○○○○○○○ ────────              │      
    │                                             │      
    │  Step 3:                                   │      
    │  Citric Acid को Membrane में डालें          │      
    │  Concentration: 2000 ppm                   │      
    │                                             │      
    │  कितना डाला? (kg)                           │      
    │  ┌────────────────────────────────────┐     │      
    │  │          \[  1  .  2  \]  kg         │     │      
    │  └────────────────────────────────────┘     │      
    │  ⚠️ सावधानी: Chemical आँखों में न जाए       │      
    │                                             │      
    │  📷 Photo लें — Required                   │      
    │  \[Camera खोलें 📷\]                         │      
    ├─────────────────────────────────────────────┤      
    │  \[✓ Step 3 पूरा हुआ →\]  (active after photo)│      
    └─────────────────────────────────────────────┘      
         

 

After final remediation step, transitions to **Monitoring Phase**:

 

           
    ┌─────────────────────────────────────────────┐      
    │  🟣 Dynamic Inspection · Monitoring Phase  │      
    │  TMP recovery check — 30 मिनट             │      
    ├─────────────────────────────────────────────┤      
    │  अगली जांच: 14 मिनट में (14:22)            │      
    │                                             │      
    │  Watch करें:                               │      
    │  TMP \> −0.40 kg/cm² होनी चाहिए            │      
    │  Current TMP: \-0.52 🔴  (still recovering)  │      
    │                                             │      
    │  क्या TMP recover हो गया?                  │      
    │  ┌──────────────┐   ┌──────────────────┐   │      
    │  │ हाँ ✓        │   │ नहीं, अभी भी low  │   │      
    │  └──────────────┘   └──────────────────┘   │      
    ├─────────────────────────────────────────────┤      
    │  \[⬆️ Supervisor को बताएं\]                   │      
    └─────────────────────────────────────────────┘      
         

 

Monitoring "हाँ" → Issue moves to "Work Completed (Claimed)" and awaits Supervisor Verification (if required for this issue type) or auto-closes (if sensor recovery is sufficient verification).

 

 

### **SCREEN: Supervisor Verification (Issue closure gate)**

**When required:** Issues where the alert type is flagged as requiring supervisor verification (primarily: compliance-relevant parameters — outlet quality, membrane damage suspected, toxic shock, equipment replacement). Routine mechanical issues that self-verify via sensor recovery do not require this step.

 

**Who sees this:** Supervisor only. Appears in Supervisor's notification queue and Issues list as "Verification Needed."

 

           
    ┌─────────────────────────────────────────────┐      
    │  ← Issues                                  │      
    │  🔵 Verification Needed                     │      
    │  MBR-1 Membrane Maintenance Cleaning        │      
    │  Honda Manesar · Ramesh Kumar               │      
    ├─────────────────────────────────────────────┤      
    │  काम का दावा:                               │      
    │  "Maintenance Cleaning complete."           │      
    │  Ramesh Kumar · 22:45 पर complete किया     │      
    ├─────────────────────────────────────────────┤      
    │  Evidence:                                  │      
    │  📷 Citric Acid dosing photo  \[देखें\]       │      
    │  📷 NaOCl dosing photo  \[देखें\]             │      
    │  TMP after cleaning: \-0.38 kg/cm² 🟢       │      
    │  Chemical used: Citric 1.2 kg, NaOCl 0.8 kg│      
    ├─────────────────────────────────────────────┤      
    │  ┌──────────────────────────────────────────┐│      
    │  │  \[✓ Verify — Issue बंद करें\]             ││      
    │  └──────────────────────────────────────────┘│      
    │  ┌──────────────────────────────────────────┐│      
    │  │  \[✗ Reject — Issue फिर खोलें\]            ││      
    │  └──────────────────────────────────────────┘│      
    │  Rejection note (required if rejecting):    │      
    │  ┌──────────────────────────────────────────┐│      
    │  │ \[कारण लिखें या 🎤 voice note\]            ││      
    │  └──────────────────────────────────────────┘│      
    └─────────────────────────────────────────────┘      
         

 

**State transitions on verification:**

* Verify → Issue closes (A-F3). Equipment History: ISSUE\_VERIFIED\_CLOSED. Operator notified: "✓ Supervisor ने verify कर दिया।"

* Reject → Issue re-opens (A-F1). The operator receives notification with a rejection reason. Diagnostic task re-opened at step where the rejection originated.

 

**Auto-verification (no Supervisor needed):**  
When the condition that triggered the Issue self-resolves and the alert type is not flagged as requiring human verification — e.g., TMP returns to normal range after blower restart — the system auto-closes the Issue with status "Condition cleared — sensor verified." No operator action required. The operator is notified. This is logged in the Issue timeline as a system event.

 

 

### **SCREEN: Plant Status (प्लांट की स्थिति)**

**Design scope note:** This screen is a scaffold for the current design exercise. It is intentionally simplified to show stage-level status and provide navigation to Equipment Detail and Equipment History — the screens that matter for the Q1 Close the Loop goal. The target visualization for this tab is the **Living Plant** concept from Object\_Model\_Workflows\_Design\_Concepts.md (Concept 1): a spatial, animated, interactive plant schematic with a time slider, equipment-level state animation, and process flow visualization. That concept will be specified in a dedicated design sprint focused on plant visualization and is explicitly out of scope here.

 

           
    ┌─────────────────────────────────────────────┐      
    │  प्लांट की स्थिति · Honda Manesar STP       │      
    ├─────────────────────────────────────────────┤      
    │  ┌────────────────────────────────────────┐ │      
    │  │ Primary      🟢 Normal                 │ │      
    │  │ CT → EQT → Screen → Anoxic            │ │      
    │  └────────────────────────────────────────┘ │      
    │  ┌────────────────────────────────────────┐ │      
    │  │ Secondary    🔴 1 Issue                │ │      
    │  │ Aeration → MBR-1 🔴  MBR-2 🟢        │ │      
    │  └────────────────────────────────────────┘ │      
    │  ┌────────────────────────────────────────┐ │      
    │  │ Tertiary     🟡 Attention              │ │      
    │  │ TWT → UV → Softener → UF              │ │      
    │  └────────────────────────────────────────┘ │      
    │  ┌────────────────────────────────────────┐ │      
    │  │ Sludge       🟢 Normal                 │ │      
    │  │ SHT → Dewatering                      │ │      
    │  └────────────────────────────────────────┘ │      
    ├─────────────────────────────────────────────┤      
    │  📊 142 kWH today  ·  💧 28.3 m³/hr avg    │      
    └─────────────────────────────────────────────┘      
         

 

Tapping a stage → Equipment list for that stage. Tapping equipment → Equipment Detail.

 

 

### **SCREEN: Equipment Detail (Equipment की जानकारी)**

           
    ┌─────────────────────────────────────────────┐      
    │  ← प्लांट                                  │      
    │  \[Equipment illustration\]                   │      
    │  MBR-1 Permeate Pump                       │      
    │  Secondary Treatment                        │      
    ├─────────────────────────────────────────────┤      
    │  स्थिति: 🟢 चल रहा है                       │      
    │  VFD: 42 Hz · Flow: 18.4 m³/hr             │      
    ├─────────────────────────────────────────────┤      
    │  \[🏚️ Maintenance Mode में डालें\]            │      
    ├─────────────────────────────────────────────┤      
    │  Active Issue:                              │      
    │  🔴 MBR-1 Membrane चोक · 2h open  \[देखें →\]│      
    ├─────────────────────────────────────────────┤      
    │  Equipment History  \[सब देखें →\]            │      
    │  ● 09:28  🏚️ Maintenance Mode में डाला     │      
    │  ● 07:20  ⚡ Pump Trip हुआ                  │      
    └─────────────────────────────────────────────┘      
         

 

 

### **SCREEN: Equipment History Timeline (Equipment का इतिहास)**

           
    ┌─────────────────────────────────────────────┐      
    │  ← Equipment Detail                         │      
    │  MBR-1 Permeate Pump — इतिहास              │      
    ├─────────────────────────────────────────────┤      
    │  16 April 2026                              │      
    │  │  14:15 🔴 TMP Limit पार हुई              │      
    │  │         Issue DT-002 · System            │      
    │  │  09:30 🔧 Maintenance Cleaning शुरू हुई  │      
    │  │         Ramesh Kumar · Issue \#241        │      
    │  │         \[📷 Photo\]                       │      
    │  │  09:28 🏚️ Maintenance Mode में डाला      │      
    │  │         Ramesh Kumar · "सफाई के लिए"     │      
    │  12 April 2026                              │      
    │  │  16:45 ✅ Maintenance Cleaning हुई       │      
    │  │         Deepak Singh · Issue \#238        │      
    │  │  07:20 ⚡ Pump Trip हुआ                  │      
    │  │         System · Standby चालू हुआ        │      
    ├─────────────────────────────────────────────┤      
    │  \[Load पुराने events\]                       │      
    └─────────────────────────────────────────────┘      
         

 

**Event icon set:**  
🏚️ Maintenance mode · ⚡ Trip/electrical · 🔧 Maintenance action · 🧹 Cleaning · ✅ Task completed · 📊 Sensor alert · ⬆️ Escalated · 🔴 Issue triggered · ✓ Issue verified/closed

 

**V1 empty state:** "इस Equipment का कोई इतिहास नहीं है अभी तक। Maintenance Mode में डालने पर पहली entry बनेगी।"

 

 

### **SCREEN: Mark as Maintenance Mode**

           
    ┌─────────────────────────────────────────────┐      
    │  Maintenance Mode                           │      
    │  MBR-1 Permeate Pump                       │      
    ├─────────────────────────────────────────────┤      
    │  कारण चुनें:                                │      
    │  ┌──┐ 🔧 खराब हुआ (Breakdown)              │      
    │  └──┘                                       │      
    │  ┌──┐ 🔩 Scheduled PM                       │      
    │  └──┘                                       │      
    │  ┌──┐ 🧹 सफाई के लिए                        │      
    │  └──┘                                       │      
    │  ┌──┐ 🔍 जांच के लिए                        │      
    │  └──┘                                       │      
    ├─────────────────────────────────────────────┤      
    │  Note (optional): \[🎤 या type करें\]          │      
    │  📷 Photo (optional)                        │      
    ├─────────────────────────────────────────────┤      
    │  \[✓ Maintenance Mode में डालें\]              │      
    │  Equipment History में entry बनेगी           │      
    └─────────────────────────────────────────────┘      
         

 

On confirm: Equipment status → "🏚️ Maintenance में". Equipment History entry created. Alerts for this equipment suppressed. If critical-path equipment (blower, permeate pump, reactor feed pump): Supervisor notified.

 

 

### **SCREEN: Escalation Confirm**

           
    ┌─────────────────────────────────────────────┐      
    │  Supervisor को बताएं?                        │      
    │  Issue: MBR-1 Membrane चोक                 │      
    │  Supervisor: Priya Singh                   │      
    │                                             │      
    │  क्या हुआ? (optional)                       │      
    │  \[Type या 🎤 voice note\]                    │      
    │                                             │      
    │  \[✓ हाँ, बताएं\]  \[✗ खुद try करूँगा\]         │      
    └─────────────────────────────────────────────┘      
         

 

 

## **6\. Hindi Implementation**

### **Approach: LLM-Powered Translation**

Hindi implementation uses an LLM-based translation engine, not a static manually maintained translation file. This decision is being finalized in the Month 1 technical discovery sprint (aligned with Phase 1 doc Section 6). The UIX Plan does not pre-empt that decision — it specifies the *scope* of what needs to be translated, not the mechanism.

 

**Scope of Hindi translation (all operator-facing surfaces):**

* All alert and issue titles, descriptions, and action hints

* All task instructions and step text

* All diagnostic question text and answer options

* All navigation labels, button text, status labels

* All error messages, out-of-range warnings, empty states

* All Equipment History event labels

 

**Technical abbreviations that stay in English** (operators know these from their panels):  
TMP, VFD, DO, pH, MBR, NRV, BOD, COD, TSS, SV30, LMH, KLD, EQT, TWT, SHT, UF

 

**First-occurrence pattern:** "TMP (Membrane का दबाव)" → subsequent: "TMP"

 

**Glossary for LLM prompt consistency:**

 

| Term | Hindi |
| :---- | :---- |
| TMP | TMP (Membrane का दबाव) |
| VFD | VFD (Motor की speed) |
| DO | DO (Oxygen की मात्रा) |
| SV30 | SV30 (Sludge का Test) |
| Flux | Flux (Membrane की speed) |
| NRV | NRV (Check Valve) |
| Maintenance Mode | Maintenance Mode |
| Issue | समस्या |
| Task | काम |
| Escalate | Supervisor को बताना |

   
**Numbers:** Always Arabic (1, 2, 3 — not १, २, ३). Matches instrument displays.

 

**Typography:**

* Font: Noto Sans Devanagari

* Body text minimum: 16sp

* Question text: 20sp

* Button text: 18sp

* Line height: \+20% vs English baseline

 

**Voice input:** Android speech-to-text (hi-IN) on all notes/text fields. Works offline via on-device model (API 26+).

 

 

## **7\. WhatsApp Integration**

### **Role of WhatsApp in This Flow**

WhatsApp is the alert delivery surface. The Capacitor app is the resolution surface. Operators do not need to be looking at the app for an alert to reach them — it arrives in WhatsApp, where they spend most of their time.

 

### **Alert Message Format (WhatsApp → deeplink)**

When an Issue is created, DigitalPaani sends a WhatsApp message to the on-shift operator:

 

           
    🔴 CRITICAL — Honda Manesar STP      
           
    MBR-1 Membrane चोक हो गई है      
    Flux 12.3 LMH (Limit: 15 LMH)      
           
    \[👉 Issue देखें और जांच शुरू करें\]      
         

 

The button / link deeplinks directly into the Issue Detail screen for that specific issue. No navigation required — one tap lands on the right screen.

 

**Message format by severity:**

 

| Severity | Prefix | Notification behavior |
| :---- | :---- | :---- |
| Critical | 🔴 CRITICAL | Full-screen app takeover on tap \+ sound |
| High | 🟠 HIGH | Opens Issue Detail normally |
| Medium | 🟡 | Opens Issues List with the issue highlighted |
| Scheduled task reminder | 📋 | Opens To Do List |

 

### **Deeplink URL Scheme**

           
    digitalpaani://issues/{issue\_id}         → Issue Detail      
    digitalpaani://tasks/{task\_id}           → Task Detail      
    digitalpaani://equipment/{equipment\_id}  → Equipment Detail      
         

 

Capacitor handles the deeplink registration. If the app is not installed or not open, the link opens the mobile web app at the same path.

 

### **What WhatsApp Does NOT Handle**

WhatsApp delivers the alert. Everything else — diagnostic flow, task completion, data entry, equipment history — happens in the Capacitor app. Do not attempt to replicate the diagnostic question flow in a WhatsApp chat; the branching logic, auto-checks, and photo capture only work in the native app.

 

The full WhatsApp-as-primary-interface concept (Concept 6 / The Relay, from Object\_Model\_Workflows\_Design\_Concepts.md) is out of scope for this design exercise and will be addressed in a future sprint.

 

 

## **8\. Capacitor / Android Implementation Notes**

### **Target Device**

* Android 8.0+ (API 26), 3–4 GB RAM, 5.5"–6.2" screen, 720×1560+

* Network: 4G but patchy in equipment rooms — design for offline-first

 

### **Capacitor Plugins Required**

 

| Plugin | Purpose |
| :---- | :---- |
| @capacitor/push-notifications | Critical alert takeover |
| @capacitor/app | Deeplink handling from WhatsApp |
| @capacitor/camera | Photo evidence |
| @capacitor/haptics | Vibration on critical alert |
| @capacitor/network | Offline detection → sync queue |
| @capacitor/local-notifications | Task reminders (local) |
| @capacitor/storage | Offline task completion queue |

 

### **Offline Behavior**

* Task completion, diagnostic answers, data entry: stored locally, synced on reconnect

* Offline indicator: subtle bar "📵 Offline — data sync होगा बाद में"

* On reconnect: "✓ Data sync हो गया" toast — 2 seconds

 

### **Critical Alert Full-Screen (Android)**

* setFullScreenIntent for Critical severity

* Cannot dismiss without tapping "देखें" or "बाद में"

* Vibration: long-short-long

 

### **Performance**

* Equipment History: virtual list (render visible items only)

* Pagination: 20 events per load

* Sensor readings on Issue Detail: 30s poll (not WebSocket for V1)

* Images: compress to 800px max on upload; thumbnail in timeline

 

 

## **9\. Architecture Changes Required**

### **Three-Layer Data Model**

The backend must maintain the three-layer separation from Getting Deep Into Tasks.md:

 

           
    Alert (Truth Layer)     → Issue in UI maps to this      
    Work Order (Commitment) → Internal object; not surfaced to operators as "Work Order"        
    Task (Execution)        → Tasks in UI map to this      
         

 

**In the operator UI, the Work Order is invisible.** What the operator experiences is: Issue → Task → (Supervisor Verification, if required) → Issue closes. The Work Order exists in the backend to enforce that completion ≠ verification. The Supervisor Verification screen (Section 5\) is the UI expression of the WO-F3 → WO-F4 → WO-F5 progression.

 

**Issue truth states (operator-visible):**

* open — Alert condition exists, work not started

* in\_progress — Diagnostic or remediation task active

* work\_claimed — Operator has marked work done; awaiting sensor recovery or supervisor verification

* verified\_closed — Verified by sensor or supervisor; Issue is resolved truth

* auto\_closed — Condition cleared on its own; no work was needed

 

### **New Data Entities**

**Issue**

           
    id, site\_id, alert\_id (FK), equipment\_id (FK),      
    title\_hi, title\_en,      
    severity (critical/high/medium/low),      
    source (system\_alert | operator\_reported | service\_visit),      
    truth\_state (open | in\_progress | work\_claimed | verified\_closed | auto\_closed),      
    requires\_supervisor\_verification (boolean — set by alert type config),      
    root\_cause (FK to root cause taxonomy, nullable — set at diagnostic summary),      
    created\_at, closed\_at,      
    linked\_task\_ids\[\]      
         

 

**Task** (updated to use operational context taxonomy)

           
    id, issue\_id (FK, nullable), equipment\_id (FK),      
    task\_type (routine | preventive\_check | data\_entry | dynamic\_inspection | recommendation | corrective\_action),      
    current\_phase (diagnostic | remediation | monitoring — for dynamic\_inspection only),      
    title\_hi, title\_en,      
    assignee\_id (FK), due\_at, sla\_minutes,      
    status (open | completed | canceled),      
    step\_data (JSON — answers, measurements, photos per step),      
    created\_at, completed\_at      
         

 

**DiagnosticTree, DiagnosticStep, OperatorResponse** — unchanged from V1

 

**SupervisorVerification**

           
    id, issue\_id (FK),      
    verifier\_id (FK — supervisor),      
    decision (verified | rejected),      
    rejection\_reason (text, nullable),      
    evidence\_reviewed (boolean),      
    created\_at      
         

 

**EquipmentHistory** — unchanged from V1

 

**Equipment (additions)**

           
    ADD: maintenance\_mode (boolean)      
    ADD: maintenance\_since (timestamp, nullable)      
    ADD: maintenance\_reason (enum: breakdown | scheduled\_pm | cleaning | inspection)      
         

 

### **Workflow Connections (updated)**

 

| Trigger | Action | Priority |
| :---- | :---- | :---- |
| Alert fires | Auto-create Issue (source \= system\_alert) | Critical |
| Issue created | Auto-generate Dynamic Inspection Task | Critical |
| Diagnostic phase complete | Generate Remediation steps within same task OR create new task if multi-day | Critical |
| Remediation phase complete \+ sensor recovery OR supervisor verification | Close Issue (verified\_closed) | Critical |
| Condition clears with no tasks started | Auto-close Issue (auto\_closed). Notify operator. | Critical |
| Condition clears with tasks in progress AND requires\_supervisor\_verification \= false | Mark Issue work\_claimed; sensor recovery \= verification; close | High |
| Condition clears with tasks in progress AND requires\_supervisor\_verification \= true | Mark Issue work\_claimed; notify Supervisor for verification | High |
| Operator sets Maintenance Mode | Create EquipmentHistory MAINTENANCE\_MODE\_SET; suppress alerts | Critical |
| Operator clears Maintenance Mode | Create EquipmentHistory MAINTENANCE\_MODE\_CLEARED; re-enable alerts | Critical |
| PLC DI pump trip signal | Create EquipmentHistory PUMP\_TRIP\_DETECTED | High |
| PLC DI pump run signal returns | Create EquipmentHistory PUMP\_RESTARTED | High |
| Manual data entry: out-of-range | Auto-create Issue \+ Dynamic Inspection Task | High |
| Root cause selected (diagnostic summary) | Log to Issue \+ Equipment History | High |
| Operator submits "Report Issue" (manual) | Create Issue (source \= operator\_reported) \+ Dynamic Inspection Task | High |
| Supervisor verifies | Close Issue; create EquipmentHistory ISSUE\_VERIFIED\_CLOSED | Critical |
| Supervisor rejects | Re-open Issue; notify operator with rejection note | Critical |
| WhatsApp alert sent | Create delivery event on Issue timeline; include deeplink URL | High |
| Shift start | Generate shift handover summary for incoming operator | Medium |
| Operator acknowledges handover | Log acknowledgment as Event | Medium |

 

### **New API Endpoints (updated)**

           
    POST   /api/issues                              Create issue (system or operator-reported)      
    GET    /api/issues?site\_id=\&status=\&severity=   List with filters      
    GET    /api/issues/:id                          Issue detail \+ timeline \+ tasks      
    PATCH  /api/issues/:id/root-cause               Set root cause (at diagnostic summary)      
    POST   /api/issues/:id/escalate                 Escalate to supervisor      
    POST   /api/issues/:id/verify                   Supervisor verification (verify or reject)      
           
    GET    /api/diagnostic-trees/:alert\_type        Tree definition      
    POST   /api/diagnostic-responses               Record answer \+ return next step      
           
    PUT    /api/equipment/:id/maintenance-mode      Toggle (creates EquipmentHistory)      
    GET    /api/equipment/:id/history               Paginated history      
    POST   /api/equipment/:id/history               Manual entry      
           
    GET    /api/tasks/today?site\_id=                Today's tasks (scheduled \+ issue-driven)      
    PATCH  /api/tasks/:id/complete                  Mark complete \+ trigger downstream      
    PATCH  /api/tasks/:id/phase                     Advance task phase (diagnostic → remediation → monitoring)      
           
    GET    /api/shifts/handover?site\_id=            Current shift handover summary      
    POST   /api/shifts/handover/acknowledge         Log acknowledgment      
         

 

 

## **10\. Component Inventory**

 

| Component | Used On | Key Props |
| :---- | :---- | :---- |
| ShiftHandoverBanner | Home | outgoing\_operator, handover\_note, on\_acknowledge |
| PlantHealthOrb | Home | status (red/amber/green), summary\_hi |
| IssueCard | Issues List | severity, title\_hi, equipment\_icon, time\_open, state, cta\_label |
| ReportIssueButton | Issues List | always\_visible, on\_tap → ReportIssueSheet |
| ReportIssueSheet | Issues List | equipment\_list, on\_submit |
| AlertRatingPrompt | Issues List (on close) | issue\_id, on\_rate (optional micro-action) |
| IssueDetailHeader | Issue Detail | severity, title\_hi, equipment\_name, time\_open, truth\_state |
| SupervisorVerificationBanner | Issue Detail | state \= work\_claimed, requires\_verification |
| DiagnosticQuestion | Diagnostic Flow | question\_hi, question\_type, options, on\_answer |
| AutoCheckDisplay | Diagnostic Flow | label\_hi, value, unit, status, is\_decisive, on\_flag\_faulty |
| DiagnosticProgress | Diagnostic Flow | current\_step, total\_steps, current\_phase |
| DiagnosticSummary | After last diagnostic step | diagnosis\_hi, root\_cause\_options\[\], pre\_selected, on\_confirm |
| RootCauseSelector | Diagnostic Summary | options\[\], pre\_selected (system suggestion), on\_select |
| TaskCard | To Do List | task\_type, task\_type\_badge, title\_hi, due\_time, overdue\_minutes |
| TaskStepChecklist | Routine / PM Task | steps\[\], current\_step, on\_complete |
| DataEntryForm | Data Entry Task | parameter\_groups\[\], on\_submit, previous\_values |
| DataEntryField | Data Entry Form | label\_hi, unit, range\_min, range\_max, previous\_value, on\_out\_of\_range |
| DynamicInspectionPhaseHeader | Dynamic Inspection | current\_phase (diagnostic/remediation/monitoring) |
| RemediationStep | Dynamic Inspection, Remediation Phase | step\_number, instruction\_hi, photo\_required, safety\_warning\_hi, chemical\_quantity\_input |
| MonitoringCheck | Dynamic Inspection, Monitoring Phase | next\_check\_at, threshold\_hi, current\_value, unit, on\_answer |
| SupervisorVerification | Supervisor-facing | issue\_id, evidence\[\], sensor\_readings, on\_verify, on\_reject |
| EquipmentStatusBadge | Equipment Detail | status (running/stopped/maintenance/tripped) |
| MaintenanceModeButton | Equipment Detail | equipment\_name, current\_mode, on\_tap → MarkMaintenanceSheet |
| MarkMaintenanceSheet | Equipment Detail (bottom sheet) | equipment\_name, reasons\[\], on\_confirm |
| EquipmentHistoryTimeline | Equipment Detail | events\[\], loading, on\_load\_more |
| HistoryEventRow | Equipment History | event\_type, label\_hi, timestamp, initiated\_by, photo\_url |
| SensorReadingRow | Issue Detail, Equipment Detail | label\_hi, value, unit, status |
| EscalationSheet | Any Issue or Task | issue\_title\_hi, supervisor\_name, on\_confirm |
| CriticalAlertTakeover | Push notification → fullscreen | issue\_title\_hi, equipment\_name, deeplink\_url |
| OutOfRangeWarning | Data Entry Form | value, range\_min, range\_max, parameter\_label\_hi |

 

 

*Document Version: 2.0 — Honda Manesar STP, April 2026*  
*Changes from V1: Three-layer architecture note \+ Supervisor Verification screen; task taxonomy unified to Phase 1 MECE set (6 operational context types); tab navigation updated (Home with shift briefing, Issues tab retained); Plant screen scoped as placeholder; WhatsApp deeplink integration specified; auto-resolution simplified; Hindi updated to reference LLM approach; "Report Issue" button added to Issues screen; root cause selection added to Diagnostic Summary; alert rating noted as optional.*  
*Companion document: Honda\_Manesar\_Diagnostic\_Trees.md*