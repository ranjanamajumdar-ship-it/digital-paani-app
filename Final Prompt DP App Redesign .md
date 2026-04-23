**Design a mobile-first UI (390px width) for an industrial water treatment SCADA system.**

Visual Style:  
\- Minimal, industrial, clean  
\- Light grey grid background  
\- Soft isometric plant visuals (tanks, pipes, pumps)  
\- Subtle gradients (not flat)  
\- Rounded cards (12–16px radius)  
\- Soft shadows

Color System:  
\- Red \= critical issue  
\- Amber \= warning / verifying / sensor maintenance  
\- Blue \= in-progress  
\- Green \= resolved / healthy  
\- Grey \= inactive / equipment under maintenance

Typography:  
\- Clean sans-serif  
\- Medium weight headings  
\- Compact spacing

Interaction Model:  
\- Card-based system  
\- Issue \= interactive decision card (NOT a screen)  
\- Bottom sheets for summaries  
\- One-handed usability

🚨 Alarm Bar (CRITICAL):  
\- Fixed at top of EVERY screen  
\- Always visible (cannot scroll away)  
\- Shows:  
  \- "2 Critical | 1 High"  
  \- Bell icon (pulsing if active)  
\- Tap:  
  → Opens diagnostic preview  
  → Counts as acknowledgement

📱 Bottom Navigation (FIXED):  
\- 4 tabs:  
  1\. My Shift (home)  
  2\. Tasks  
  3\. Plant (SCADA)  
  4\. Report Issue (primary action)  
\- Always visible

Issue Behavior:  
\- Step-by-step decision flow  
\- Show ONE step at a time  
\- 🤖 system \= passive context  
\- 👁️ operator \= decisions  
\- 📏 manual input \= inline

Language:  
\- Hindi-first (use Hinglish if needed)

**FLOW CONTEXT** 

This system includes:

\- My Shift (home)  
\- Tasks screen  
\- Plant SCADA screen  
\- Report Issue flow

Core UI units:  
\- Issue Card (interactive)  
\- Task Card  
\- Equipment Card  
\- Summary Card

Alarm Bar is always present.

The Issue:  
"SV30 Low — Low Biomass Risk"

It follows a step-by-step troubleshooting flow with:  
\- Operator inputs  
\- System insights  
\- Escalation logic  
\- Task creation

Maintain consistency across all screens.

**2\. SCREEN — MY SHIFT (HOME)**

Design the My Shift screen (default landing).

Top:  
\- Persistent Alarm Bar

Content Sections:

1\. Active Issues  
\- Show Issue Card preview (collapsed)

2\. Today’s Tasks  
\- List of Task Cards (2–3 visible)

3\. Auto-resolved Issues  
\- Small dismissible cards

4\. Quick Actions:  
\- "Fill Logbook"

Bottom:  
\- Bottom Navigation visible

Design:  
\- Vertical scroll  
\- Clean grouping  
\- Priority-driven layout

**3\. SCREEN — PLANT (SCADA)**

Design SCADA Plant screen.

Top:  
\- Alarm Bar

Main Area:  
\- SCADA diagram with equipment nodes

Show equipment states:

1\. 🔴 Critical:  
\- Red glow \+ pulse  
\- Alert badge

2\. 🟡 Warning:  
\- Amber highlight

3\. 🟢 Healthy:  
\- Green stable

4\. ⚙️ Maintenance:  
\- Grey \+ hatched pattern  
\- Label: "Under Maintenance"

Bottom:  
\- Collapsed Summary Card

Bottom Nav visible

Interaction:  
\- Tap red node → highlight \+ Issue Card preview

**4\. COMPONENT — SUMMARY CARD**

**Design expandable Summary Card (bottom sheet).**

Tabs:  
\- Issues  
\- Tasks  
\- Overdue  
\- Auto-resolved

Default:  
\- Issues tab active

Content:  
\- Issue Card preview

Behavior:  
\- Swipe up to expand  
\- Tap Issue → expands Issue Card inline

**5\. ISSUE CARD — COLLAPSED**

Design collapsed Issue Card.

Content:  
\- "High Alert"  
\- Equipment: SBR-TANK-001  
\- Title:  
  "Aeration Tank में जीवाणु कम हो रहे हैं"  
\- Subtext: "Low Biomass Risk"

System (🤖):  
\- "7 दिन का SV30 trend" (sparkline)

CTA:  
\- "जांच शुरू करें"

**6\. ISSUE CARD — STEP 1**

Design Issue Card Step 1\.

Top:  
\- Step 1 of 5

Question:  
"Aeration Tank में पानी का रंग कैसा है?"

Options:  
\- भूरा / चाय जैसा  
\- बहुत हल्का / पीला  
\- काला / बदबूदार

Interaction:  
\- Instant transition on tap

**7\. ISSUE CARD — ESCALATION (SEPTIC)**

Design escalation state.

UI:  
\- Red alert card

Text:  
"Septic condition suspected"

System:  
\- "Supervisor notified"

No further steps

**8\. ISSUE CARD — STEP 2**

Design Step 2\.

System (🤖):  
\- Sludge wasting last 3 days

If over-wasting:  
\- Show insight  
\- Action:  
  "Sludge wasting बंद करें"

Auto Task:  
\- "हर 12h SV30 record करें"

Else:  
\- "आगे बढ़ें"

**9\. ISSUE CARD — STEP 3**

Design Step 3\.

Question:  
"Inlet पानी सामान्य है?"

Options:  
\- हाँ  
\- नहीं

If नहीं:  
\- Escalation:  
  "Toxic shock suspected"  
\- Action:  
  "Inlet Bypass खोलें"

**10\. ISSUE CARD — STEP 4**  
 Design Step 4\.

Input:  
"DO क्या है?"  
If DO \< 1:  
\- "Low DO detected"  
\- CTA:  "DT-008 खोलें  
"Else: \- Continue

**11\. ISSUE CARD — STEP 5**

Design Step 5\.

System:  
"SV30 लगातार गिर रहा है"

Action:  
"Sludge Wasting 48 घंटे बंद करें"

Auto Task:  
"हर 8h SV30 record करें"

Outcome:  
\- Improve → Resolved  
\- Else → Escalate

**12\. ISSUE CARD — RESOLVED**

Design resolved state.

UI: \- Green card

Text: "Issue Resolved"  
"SV30 normalized"

**13\. SCREEN — TASKS**

Design Tasks screen.

Top:  
\- Alarm Bar

Tabs:  
\- Today  
\- Overdue  
\- Completed

Content:  
\- Task Cards list

States:

Pending → Grey    
In Progress → Blue    
Completed → Green    
Overdue → Red  

Bottom Nav visible

**14\. TASK CARD (EXPANDED)**

Design expanded Task Card.

Checklist:  
\- Pass / Fail  
\- Camera icon

If Fail: \- Show:   "Create Issue"

CTA: \- Submit

**15\. SCREEN — REPORT ISSUE (FROM NAV)**

**Design Report Issue screen.**

Top:  
\- Alarm Bar

Fields:  
\- Equipment selector  
\- Description  
\- Photo capture (required)  
\- Severity selector

CTA: \- "Submit Issue"

Bottom Nav visible (Report tab active)

Design: \- Fast, minimal friction  
**16\. COMPONENT — EQUIPMENT CARD**

**Design Equipment Card.**

Content:  
\- Equipment name  
\- Status indicator

States:  
\- Critical → Red  
\- Warning → Amber  
\- Healthy → Green  
\- Maintenance → Grey \+ hatched

Sections:  
\- Active Issues  
\- Tasks

Actions:  
\- Report Issue  
\- Maintenance

**17\. SCREEN — SMART LOGBOOK**

Design Smart Logbook screen.

Top:  
\- Alarm Bar

Form:  
\- Parameter list  
\- Previous values

Out-of-range:  
\- Amber highlight

Options:  
\- Add Note  
\- Create Issue

CTA:  
\- Submit  
Bottom Nav visible  
**Now unify all generated screens into a consistent design system with reusable components:**

**\- Issue Card (all states)**  
**\- Task Card (all states)**  
**\- Equipment Card**  
**\- Alarm Bar**  
**\- Bottom Navigation**  
**\- Buttons, inputs, badges**

**Ensure visual consistency and spacing across all screens.**  
