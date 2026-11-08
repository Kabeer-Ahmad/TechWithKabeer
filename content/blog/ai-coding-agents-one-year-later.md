---
title: "A Year of Building with AI Coding Agents: What Actually Changed in My Workflow"
excerpt: "Last November I wrote about the move from copilots to agents. A year later, here's what stuck, what didn't, and the rules I now follow when an agent writes code for me."
tags: ["AI Coding", "Agentic AI", "Dev Tools", "Full Stack", "Productivity"]
---

Last November I wrote that autocomplete-style "copilots" were giving way to **agents** — tools that read your codebase, plan, run commands and make multi-file changes on their own. A year later I've shipped client sites, mobile apps and AI pipelines with agents in the loop every day. Here's an honest look at what changed.

## What stuck

**1. Agents do the first draft of almost everything.**
Scaffolding a page, writing a migration, wiring a form to an API, writing the first round of tests — I now describe the outcome and review the result instead of typing it. On a typical client website, that's where the biggest time savings are.

**2. Reading code got more important, not less.**
When an agent writes most of the lines, your job becomes reviewing them. I read diffs more carefully now than I did when I wrote everything myself, because a confident-looking change can still be subtly wrong.

**3. Small tasks beat big prompts.**
"Build the whole dashboard" produces something that looks done and isn't. "Add a sortable table for orders using the existing `Table` component, with tests" produces something I can merge. Scope is the single biggest lever on quality.

**4. Agents are great at the boring parts of quality.**
Adding types, fixing lint errors, writing missing tests, updating docs after a refactor — work that used to slip is now cheap enough to always do.

## What didn't stick

- **Letting an agent run unattended on a big change.** It works for small, well-tested areas. For anything touching auth, payments or data migrations, I stay in the loop.
- **Trusting "it builds" as "it works."** An agent will happily make the type checker happy. Only running the app — clicking through the flow, on a phone-sized screen too — tells you if it actually works.
- **One giant instructions file.** Short, specific project notes (how to run, test and deploy; conventions that matter) helped far more than pages of rules.

## The rules I follow now

1. **Write the acceptance check first.** "Done means: the form submits, the row appears in the table, and the email is sent." Agents are much better when they know what "done" looks like.
2. **Keep changes reviewable.** If a diff is too big to read properly, it's too big to merge. Split it.
3. **Make the agent verify its own work.** Run the tests, run the build, and open the page in a browser before calling anything finished.
4. **Protect secrets and production.** Agents get development credentials and preview environments, not production keys.
5. **Own the architecture.** Agents are excellent at filling in a design; they're much weaker at choosing one. The data model and system boundaries are still my job.

## What this means for developers

The value has shifted from typing speed to **judgement**: knowing what to build, breaking it into the right pieces, spotting the subtle bug in a clean-looking diff, and knowing when something is genuinely done. Those skills were always the important ones; agents just made it obvious.

If you're still on the fence, start small: hand an agent your next well-defined task, review the diff like a pull request from a new teammate, and make it prove the change works. That habit is most of the skill.
