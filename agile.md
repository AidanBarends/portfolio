---
title: Agile e-Portfolio
description: Agile e-portfolio for PRP370 (Project Presentation 3), built around my Driver role on the GoldenWay project.
---

<p class="prompt">~/aidan/agile $ cat goldenway.md</p>

# Agile e-Portfolio: GoldenWay

GoldenWay is a web app our team (Group 26) built for Golden Arrow commuters to buy and load Gold Card trips online, with tools for five staff roles. I was a **developer on the Driver role**, and in July I **set up our first Trello product backlog**. This page shows the five Agile artefacts, my evidence for each, and what I learned.
{: .lead}

| Item | Detail |
|---|---|
| **Team** | Group 26: Joshua Adams (Team Lead), Matthew Barron, Aidan Barends, Joshua Bird, Raul Everts |
| **My role** | Developer, Driver role (starting runs, delay reporting, run timelines, on-time tracking) |
| **Also** | Structured the original Trello board and product backlog (July 2026) |
| **My branch** | `AB-230255639` in the [GoldenWay repository](https://github.com/aidan-g-barends/GoldenWayApp) |
| **Trello** | [Board v1 (I set it up)](https://trello.com/b/fMkfGDiw/goldenway-board) and [Board v2 (run by our Team Lead)](https://trello.com/b/xyZiSfZl/goldenway-board-updated) |

<div class="jump">
  <a href="#charter"><b>01</b><span>Team Charter</span></a>
  <a href="#stories"><b>02</b><span>User Stories &amp; Tasks</span></a>
  <a href="#product-backlog"><b>03</b><span>Product Backlog</span></a>
  <a href="#sprint-backlog"><b>04</b><span>Sprint Backlog</span></a>
  <a href="#logbook"><b>05</b><span>Agile Logbook</span></a>
</div>

Each section has an **Evidence** panel (blue) and a **Reflection** panel (green). Team artefacts are marked as team work, and only the work linked to my name is claimed as mine.

---

<p class="eyebrow">01 / Agile Team Charter</p>

## Agile Team Charter {#charter}

An Agile team charter is a living, co-created agreement that sets out a team's purpose, values, working agreements and boundaries (CPUT, 2026). Ours started as version 1.0 in May 2026 and was updated to version 2.0 on 20 October 2026 after the team changed (Group 26, 2026).

<div class="evidence" markdown="1">

### The charter and what it covers

**Document:** [Agile Team Charter v2.0 (PDF)](assets/docs/Agile_Team_Charter_v2.0.pdf) <span class="tag team">Team artefact</span>

| Charter element | What our charter says |
|---|---|
| Purpose | Stop commuters losing time in ticket queues by letting them load Gold Card trips online |
| Vision | "No one misses their bus": cashless, convenient transit payments for Cape Town commuters and students |
| Roles | Work split by app role on 11 August. **Mine: Developer, Driver** (starting runs, delay reporting, run timelines, on-time tracking) |
| Values | Ubuntu, respect, transparency, accountability, ethical capability, continuous improvement |
| Working agreements | Stand-ups on class days, one-week sprints, planning on Tuesday, retro at the end of the week |
| Code rules | One branch per member named with initials and student number, no direct pushes to `main`, every merge goes through a pull request |
| Database rules | Business rules live in database functions; **every table has row-level security (RLS)** |
| Decisions | Role owners decide inside their role; cross-role decisions by consensus at planning; Team Lead breaks ties |
| Conflict | Speak to the person first, then raise it at stand-up, then the Team Lead, then the lecturer |
| Boundaries | Simulated payments only, no full card numbers, no NFC hardware, feature freeze from 20 October |
| Definition of Done | Works on the real database, lint and tests pass, PR reviewed and merged, checked on mobile, Trello card and logbook updated |

**History on Trello:** on [Board v1](https://trello.com/b/fMkfGDiw/goldenway-board), the charter was planned in a team meeting (card due 29 April 2026) and version 1.0 was due on 4 May 2026, with sections split between members.

### Where the charter shows up in my own work

| Charter rule | My evidence |
|---|---|
| Own branch, named by convention | My branch `AB-230255639` was merged into `main` through pull requests on 17 Sep, 24 Sep and 1 Oct 2026 |
| Every table has RLS; ethical capability | I found and fixed a security hole in the driver's `vehicle_runs` table ([commit 488e060](https://github.com/aidan-g-barends/GoldenWayApp/commit/488e060), 16 Sep 2026). See the reflection below. |
| Ubuntu: help before moving on | I helped a teammate harden the inspector table and screens ([commit d5d9029](https://github.com/aidan-g-barends/GoldenWayApp/commit/d5d9029), 18 Sep 2026) |

</div>

<div class="reflection" markdown="1">

### What the charter meant in practice

Two of the charter's rules ended up shaping my actual code on the Driver role.

The first was **"every table has row-level security."** While working on driver runs, I found that the security rule on our `vehicle_runs` table only checked that a run belonged to the logged-in user. It never checked that the user was actually a driver. That meant a clerk, agent or inspector could create a fake run and mark it delayed, which would send a false service alert to commuters. I confirmed it on the live project with a clerk demo account, fixed it so only drivers (or admins) can create runs, and checked it was blocked. This is what the charter's ethical capability value looks like in practice: having RLS on a table is not enough, you have to test whether the rule actually protects users.

The second was **one owner per role and per shared file**. It kept us out of each other's code, but it also explains the hardest part of my work: getting the driver side to communicate with the admin and commuter sides. A delay report from a driver is only useful if the admin and the commuter see it, and those screens belonged to other people. I had to agree on how data passed between roles instead of just changing their code.

The charter also showed me where I fell short. It says every member keeps an Agile Logbook, and I did not. Section 05 deals with that honestly.

**What I take forward:** I will read a team charter as a set of rules I can check my work against, not as paperwork. On my next team I want us to agree on how roles hand data to each other at the start, because that is where my work slowed down.

</div>

---

<p class="eyebrow">02 / User Stories and Tasks</p>

## User Stories and Tasks {#stories}

A user story describes a feature from the user's point of view in the form *As a [user], I want [feature], so that [benefit]* (Cohn, 2004). Each story is then broken into tasks a developer can finish and test.

<div class="evidence" markdown="1">

### My Driver stories and the tasks behind them

The three Driver stories below come from the team's multirole product backlog, added after we split the app by role on 11 August ([backlog card](https://trello.com/c/h903LTtg/1-product-backlog-multirole-staff-roles)). The tasks are linked to my commits. I wrote the acceptance criteria for this page from how each feature was built and tested, so they are a **reconstruction**, not text copied from the original cards.

#### DR-1 &nbsp; Start a run and report delays <span class="tag must">Must</span> <span class="tag done">Done</span>

> As a **driver**, I want to **start my run and report delays**, so that **commuters know where their bus is**.

**Acceptance criteria**

- Only a user with the Driver role can start a run or report its status
- A driver cannot open a second run while one is still open, and gets a clear message instead of an error
- A delay report with a note shows up as a service alert that admin and commuters can see
- The run timeline shows each status change in order

| Task | Evidence |
|---|---|
| Delay note composer and run timeline on the Runs screen | [bc4b9e6](https://github.com/aidan-g-barends/GoldenWayApp/commit/bc4b9e6) |
| Restrict runs to the Driver role in RLS, cap note length and delay minutes, friendly double-tap message | [488e060](https://github.com/aidan-g-barends/GoldenWayApp/commit/488e060) |
| Admin alerts screen so driver delay reports reach admin, closing the driver to commuter alerts loop | [7878984](https://github.com/aidan-g-barends/GoldenWayApp/commit/7878984) |

#### DR-2 &nbsp; Pre-trip note and on-time tracking <span class="tag should">Should</span> <span class="tag done">Done</span>

> As a **driver**, I want to **add a pre-trip note and track whether my run is on time**, so that **delays are recorded accurately**.

**Acceptance criteria**

- Starting a run accepts an optional pre-trip note (bus condition, odometer)
- Completing a run keeps the delay that was reported, so the on-time figure stays accurate
- The staff home screen shows a dashboard strip with the driver's figures

| Task | Evidence |
|---|---|
| Add the pre-trip note to `start_run` and fix completed runs wiping their delay | [66efd9b](https://github.com/aidan-g-barends/GoldenWayApp/commit/66efd9b) |
| Dashboard strip on the staff landing screen | [f8855ce](https://github.com/aidan-g-barends/GoldenWayApp/commit/f8855ce) |

#### DR-3 &nbsp; Choose the run direction <span class="tag could">Could</span> <span class="tag done">Done</span>

> As a **driver**, I want to **choose the direction of my run**, so that **the timeline matches the way I am driving the route**.

**Acceptance criteria**

- The driver picks a direction before starting a run
- The screen shows a loading state while the run is being saved

| Task | Evidence |
|---|---|
| Direction picker, loading state and composer fixes | [98147cb](https://github.com/aidan-g-barends/GoldenWayApp/commit/98147cb) |

<div class="shot" markdown="1">
![Driver Runs screen in GoldenWay](assets/img/agile/driver-runs.png)
*The Driver Runs screen: start run, pre-trip note, delay reporting and the run timeline.*
</div>

The repository's history starts on 16 September 2026 with a combined import of the app, so the tables above only link commits recorded under my name.
{: .note}

</div>

<div class="reflection" markdown="1">

### What I learned about stories and tasks

The part of a user story I underestimated was the **"so that"**. DR-1 says *so that commuters know where their bus is*. My first reading was "build a button that starts a run." But the story is not finished when the driver presses the button. It is finished when a commuter can see the result. That is why my tasks spread beyond the Driver screen into the database rules and an admin alerts screen, and it is why connecting the driver side to admin and commuters was the hardest part of my work.

Breaking the stories into tasks helped in two ways. Each task became a commit I could test on its own, and the priorities told me what to do first. DR-1 was a Must, so I made it secure before I added the Could-level direction picker.

Writing acceptance criteria for this page showed me what was missing during the project: we did not have clear "done" checks for each story before I started coding. If I had written *only a driver can create a run* up front, I would have tested for the security hole on day one instead of finding it later.

**What I take forward:** write acceptance criteria before coding, and include the users on the other end of the story (here, admin and commuters) in the criteria, not just the user named in it.

</div>

---

<p class="eyebrow">03 / Product Backlog</p>

## Product Backlog {#product-backlog}

The product backlog is the ordered list of everything the product needs. It is owned by the team and changes as the team learns. A sprint backlog is the small slice of it chosen for one sprint (Schwaber and Sutherland, 2020).

<div class="evidence" markdown="1">

### Version 1: the backlog I set up (July 2026)

In July I was responsible for structuring our Trello board. These cards on [Board v1](https://trello.com/b/fMkfGDiw/goldenway-board) are assigned to me:

| Trello card | Date | Status |
|---|---|---|
| [Team Meeting: Trello Board Layout](https://trello.com/c/3hL0apr3/46-team-meeting-trello-board-layout) | 14 Jul 2026 | Completed |
| [Task: Create Product Backlog on Trello](https://trello.com/c/MmumlezL/45-task-create-product-backlog-on-trello) | 24 Jul 2026 | Completed |
| 19 roadmap cards in the *Product backlog* list (below) | Created July 2026 | Planned |

The backlog was ordered with MoSCoW priorities and planned as 19 feature blocks:

| # | Backlog block | # | Backlog block |
|---|---|---|---|
| 1 | Project setup and planning | 11 | Ticket purchase: frontend |
| 2 | Auth: design and database | 12 | Digital ticket / QR code: backend |
| 3 | Auth: backend | 13 | Digital ticket / QR code: frontend |
| 4 | Auth: frontend | 14 | Top-up and ride history: backend |
| 5 | Profile and card management | 15 | Top-up and ride history: frontend |
| 6 | Routes and fares: backend | 16 | Notifications |
| 7 | Routes and fares: frontend | 17 | Testing pass and bug fixes |
| 8 | Wallet and ride balance: backend | 18 | Stretch: tap-to-pay, auto top-up, ratings |
| 9 | Wallet and ride balance: frontend | 19 | Final QA, documentation, submission |
| 10 | Ticket purchase: backend | | |

<div class="shot" markdown="1">
![Trello Board v1 with the product backlog list](assets/img/agile/trello-board-v1.png)
*Board v1: the product backlog list with the 19 roadmap cards I set up.*
</div>

### Version 2: the multirole backlog (August 2026 onward)

On 11 August the team made GoldenWay a multirole app. Our Team Lead took over the Trello board and moved the work to [Board v2](https://trello.com/b/xyZiSfZl/goldenway-board-updated), where a [multirole backlog card](https://trello.com/c/h903LTtg/1-product-backlog-multirole-staff-roles) added stories for each staff role. <span class="tag team">Team artefact, managed by the Team Lead</span>

The Driver slice of that backlog, which I owned:

| ID | Story (short) | Priority | Status |
|---|---|---|---|
| DR-1 | Start a run and report delays | <span class="tag must">Must</span> | Done |
| DR-2 | Pre-trip note and on-time tracking | <span class="tag should">Should</span> | Done |
| DR-3 | Choose the run direction | <span class="tag could">Could</span> | Done |

<div class="shot" markdown="1">
![Trello Board v2 managed by the Team Lead](assets/img/agile/trello-board-v2.png)
*Board v2: the updated board after the multirole decision.*
</div>

</div>

<div class="reflection" markdown="1">

### What I learned about managing a backlog

Setting up the first backlog taught me how much planning goes into a product before any code is written. Laying out 19 blocks forced me to think about order: auth before profiles, wallets before ticket purchases, testing near the end.

Looking back, version 1 had two weaknesses. First, I named the cards *Sprint 1* to *Sprint 19* but kept them in the *Product backlog* list. That mixed up two different things. A product backlog is a prioritised list of **what** the product needs. A sprint is a **time box** in which the team picks some of those items. Naming backlog items as sprints made it look as if we had already decided when each would be done. Second, the plan assumed a commuter-only app and 19 sprints. In reality we had about ten one-week sprints, a change of Team Lead in July and a switch to five roles in August.

The backlog had to change, and it did. When the Team Lead took over the board and rebuilt it around roles, I saw that a product backlog is not a plan you defend. It is a list you keep reordering as you learn. That is the point of Agile responding to change rather than following a plan (Beck et al., 2001).

**What I take forward:** keep the product backlog as user stories with priorities, keep sprints as a separate time box, and expect the backlog to be rewritten when the product changes.

</div>

---

<p class="eyebrow">04 / Sprint Backlog</p>

## Sprint Backlog {#sprint-backlog}

**Product backlog vs sprint backlog.** The product backlog (section 03) is everything the product could need, in priority order. The sprint backlog is the few items the team commits to for one sprint, plus the tasks to deliver them. Our sprints were one week long, planned on Tuesday and closed with a retrospective at the end of the week (Team Charter, section 5.2).
{: .note}

<div class="evidence" markdown="1">

### My main delivery sprint: week of 15 to 18 September 2026

**Team sprint goal:** demonstrate the integrated app (frontend and backend working against the live database) at the 17 September demo (Charter, Goal 1).

**My sprint goal:** get the Driver role working securely end to end, from the driver's screen to admin and commuters.

| Item | Task | Owner | Date | Status | Evidence |
|---|---|---|---|---|---|
| DR-2 | Pre-trip note on start run, on-time fix | Me | 16 Sep | <span class="tag done">Done</span> | [66efd9b](https://github.com/aidan-g-barends/GoldenWayApp/commit/66efd9b) |
| DR-1 | Delay note composer and run timeline | Me | 16 Sep | <span class="tag done">Done</span> | [bc4b9e6](https://github.com/aidan-g-barends/GoldenWayApp/commit/bc4b9e6) |
| DR-2 | Dashboard strip on staff landing | Me | 16 Sep | <span class="tag done">Done</span> | [f8855ce](https://github.com/aidan-g-barends/GoldenWayApp/commit/f8855ce) |
| DR-1 | Fix RLS privilege escalation on runs, input limits | Me | 16 Sep | <span class="tag done">Done</span> | [488e060](https://github.com/aidan-g-barends/GoldenWayApp/commit/488e060) |
| DR-3 | Direction picker and loading state | Me | 16 Sep | <span class="tag done">Done</span> | [98147cb](https://github.com/aidan-g-barends/GoldenWayApp/commit/98147cb) |
| Bug | Staff login sent to the wrong home screen | Me | 16 Sep | <span class="tag done">Done</span> | [38f43d0](https://github.com/aidan-g-barends/GoldenWayApp/commit/38f43d0) |
| Staff | Staff profile edit and account deactivation | Me | 17 Sep | <span class="tag done">Done</span> | [6b0ec07](https://github.com/aidan-g-barends/GoldenWayApp/commit/6b0ec07) |
| Help | Inspector table hardening and inspection history (helping a teammate) | Me, for the Inspector owner | 18 Sep | <span class="tag done">Done</span> | [d5d9029](https://github.com/aidan-g-barends/GoldenWayApp/commit/d5d9029) |
| DR-1 | Admin alerts screen (driver to commuter alerts loop) | Me | 18 Sep | <span class="tag done">Done</span> | [7878984](https://github.com/aidan-g-barends/GoldenWayApp/commit/7878984) |

**Outcome:** my branch `AB-230255639` was merged into `main` through pull requests on 17 September (the demo day). Later merges followed on 24 September and 1 October, ahead of deployment and the 20 October feature freeze.

<div class="shot" markdown="1">
![Admin alerts screen showing a driver delay](assets/img/agile/admin-alerts.png)
*The admin alerts screen that receives driver delay reports.*
</div>

</div>

<div class="reflection" markdown="1">

### What I learned about planning a sprint

This sprint did not go to plan. My driver work took longer than expected, and during the same week I had to help a teammate set up his inspector table. The sprint table shows it: three of the nine items (the login bug, the staff profile and the inspector help) were not Driver stories at all. Most of my commits landed between 16 and 18 September, right around the 17 September demo.

Two lessons came out of that. First, a sprint backlog has to leave room for things you cannot see coming. Helping a teammate was the right call under our Ubuntu value, but because nobody planned for it, it squeezed my own work towards the deadline. Second, cross-role work is where estimates go wrong. Making a driver's delay reach the admin and the commuter was the hardest part, because it touched other people's parts of the system.

What worked was the time box itself. A one-week sprint with a fixed demo date forced me to decide what "done" meant for the Driver role, and to finish it instead of polishing one screen forever.

**What I take forward:** break cross-role tasks out as their own sprint items, estimate them higher, keep some capacity free for helping others, and spread commits through the sprint instead of finishing near the deadline.

</div>

---

<p class="eyebrow">05 / Agile Logbook</p>

## Agile Logbook {#logbook}

An Agile logbook records stand-ups, sprint plans and retrospectives so a team can track progress and blockers over time.

**Honesty note.** Our charter asked each member to keep a logbook, and **I did not keep one during the project.** The record below is a **reconstruction written on 26 October 2026** from dated evidence only: Trello card dates, Git commits and merges, and milestones in our charter. Each entry shows its source. I have not invented stand-ups or meetings.
{: .note}

<div class="evidence" markdown="1">

### Reconstructed progress record

<details markdown="1" open>
<summary><code>29 Apr to 4 May</code> Trello set up and charter v1.0</summary>

- **Done (team):** meeting to set up Trello and plan the charter; charter v1.0 due 4 May with sections split between members.
- **Source:** Trello cards *Team Meeting: Trello Setup and Charter Planning*, *Agile Team Charter*, *Task Allocation: Charter Section Ownership*.
</details>

<details markdown="1" open>
<summary><code>13 to 17 Jul</code> Board layout and pitch week</summary>

- **Done (me):** assigned to the *Trello Board Layout* team meeting card (14 Jul); assigned to *Presentation Day* (16 Jul).
- **Team:** previous Team Lead left for an internship; Joshua Adams took over as lead. Pitch presented 17 Jul.
- **Source:** Trello cards; Charter section 2 and milestones.
</details>

<details markdown="1" open>
<summary><code>20 to 24 Jul</code> Product backlog built after lecturer feedback</summary>

- **Done (me):** updated the business presentation submission (22 Jul); created the product backlog on Trello with 19 roadmap cards (completed by 24 Jul).
- **Team:** backlog reworked after lecturer feedback.
- **Source:** Trello cards *Update Business Presentation Submission*, *Task: Create Product Backlog on Trello*; Charter milestones.
</details>

<details markdown="1" open>
<summary><code>27 Jul to 14 Aug</code> Prototype, React set-up and the multirole decision</summary>

- **Team:** Figma prototype presented (29 Jul); React project set up (4 Aug); multirole roles agreed and database schema designed (11 Aug).
- **Me:** assigned the Driver role. After this point the Team Lead took over the Trello board (Board v2).
- **Source:** Charter sections 3 and 7.2; Trello Board v1 *Sprint 1* card last moved 5 Aug.
</details>

<details markdown="1" open>
<summary><code>16 Sep</code> Driver lane build day</summary>

- **Done:** pre-trip note and on-time fix; delay composer and run timeline; dashboard strip; direction picker; staff login routing fix.
- **Blocker found:** the `vehicle_runs` security rule let any staff member create a fake run and fire a false alert to commuters. Confirmed on the live project with a clerk demo account, fixed and re-checked the same day.
- **Source:** commits 66efd9b, bc4b9e6, f8855ce, 488e060, 98147cb, 38f43d0 and the notes in migration `0012a_driver_hardening.sql`.
</details>

<details markdown="1" open>
<summary><code>17 Sep</code> Integration demo</summary>

- **Done:** staff profile edit and account deactivation; my branch merged into `main` through pull requests on demo day.
- **Source:** commit 6b0ec07; merge commits for pull requests #1 and #2.
</details>

<details markdown="1" open>
<summary><code>18 Sep</code> Helping on Inspector, closing the alerts loop</summary>

- **Done:** helped a teammate harden the inspector table and build inspection history; built the admin alerts screen so driver delays reach admin.
- **Problem:** my driver work was taking longer than planned, and the inspector help came on top of it.
- **Source:** commits d5d9029, 7878984.
</details>

<details markdown="1" open>
<summary><code>24 Sep to 1 Oct</code> Merges before deployment</summary>

- **Done:** further merges of my work through pull request #8 (24 Sep) and pull request #12 (1 Oct) ahead of deployment preparation.
- **Source:** merge commits in the repository.
</details>

<details markdown="1" open>
<summary><code>19 to 20 Oct</code> Feature freeze and charter v2.0</summary>

- **Team:** code review fixes, feature freeze declared, charter updated to v2.0.
- **Source:** Charter revision history and milestones.
</details>

### Retrospective: my sprint in September

| Went well | To improve | Action |
|---|---|---|
| All three Driver stories done and merged by demo day; security hole found and fixed before release | Driver work took longer than planned; most commits landed close to the demo | Split cross-role tasks into their own items and estimate them higher |
| Helped a teammate finish the inspector table | Unplanned help was not in the sprint plan | Keep spare capacity in every sprint |
| Commits record what changed | Some commit messages, like "pudate", say nothing | Write clear commit messages and a daily logbook entry |

</div>

<div class="reflection" markdown="1">

### What I learned from (not) keeping a logbook

Rebuilding this logbook after the project taught me more about logbooks than keeping one would have. Git and Trello let me prove **what** I did and **when**: every commit has a date and every card has a history. But they could not tell me **why** I made a decision, what blocked me on a given day, or how long a problem took. That information only exists if someone writes it down at the time, and I didn't.

My own commit history makes the point. A message like *"fix RLS privilege escalation on vehicle runs"* explains itself months later. A message like *"pudate"* on 18 September tells me nothing, and I had to open the files to see that it was the inspector work. A daily logbook line would have recorded that I was helping a teammate, which is exactly the kind of blocker a stand-up is meant to surface so the team can adjust.

This connects back to the charter. Its transparency value says blockers come up at stand-up and the board shows the real state of the work. When I don't log progress, my team and lecturer only see my output, not the problems behind it, and they cannot help early. In a workplace, that is the difference between a manager knowing a task is at risk on Tuesday and finding out on Friday.

**What I take forward:** a short daily entry (done, next, blocked) takes two minutes and saves hours of reconstruction. I will keep one on my next project, and write commit messages that make sense to someone else.

</div>

---

<p class="eyebrow">06 / Connect</p>

## How it fits together

The five artefacts tell one story. The **charter** set the rules (role ownership, RLS on every table, a logbook each). The **product backlog** I set up in July was replaced by a role-based one when the product changed. My **user stories** came from that backlog, and their tasks became my **sprint backlog** for the week of the September demo. The **logbook** shows where that sprint ran over, and why I now want to log progress as it happens.

The biggest lesson across all five: in a team project, the hard work sits between roles. What took the most effort was making a driver's report reach admin and commuters, keeping that path secure, and helping a teammate along the way. Agile tools such as stories, sprints, boards and logbooks matter most at exactly those points, because they keep everyone's work visible to everyone else.

---

## References {#references}

Beck, K. et al. (2001) *Manifesto for Agile Software Development*. Available at: [https://agilemanifesto.org/](https://agilemanifesto.org/) (Accessed: 26 October 2026).

Cape Peninsula University of Technology (CPUT) (2026) *PRP370S Assessment 2: Portfolio of Evidence Brief*. Cape Town: CPUT.

Cohn, M. (2004) *User Stories Applied: For Agile Software Development*. Boston: Addison-Wesley.

Group 26 (2026) *Agile Team Charter, Version 2.0*. Unpublished team document, Cape Peninsula University of Technology.

Schwaber, K. and Sutherland, J. (2020) *The Scrum Guide*. Available at: [https://scrumguides.org/scrum-guide.html](https://scrumguides.org/scrum-guide.html) (Accessed: 26 October 2026).
