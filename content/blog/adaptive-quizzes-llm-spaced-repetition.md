---
title: "Quizzes That Never Repeat: Where AI Belongs in an Adaptive Learning App (and Where It Doesn't)"
excerpt: "Physio School builds a fresh quiz for every attempt, adapts to each student and brings mistakes back on a schedule. The surprising part: the AI doesn't pick the questions."
tags: ["EdTech", "LLM", "Spaced Repetition", "React Native", "NestJS", "Firebase"]
---

**Physio School** is an adaptive quiz platform for physiotherapy students, running on iPhone, Android and the web from one shared codebase. Every quiz is assembled fresh, a student never sees the same question twice, difficulty follows their ability, and questions they get wrong come back on a spaced schedule. Each attempt ends with a plain-language debrief.

The original brief asked for "the AI to pick each quiz's questions." We ended up doing the opposite — and the product is better for it.

## The architecture in one paragraph

A **NestJS** API sits between every client and the database. The **Expo / React Native** mobile app and the **Next.js** web app (which also hosts the admin panel) share one typed API client and one package of domain types, Zod schemas and the scoring and adaptive engine. **Firestore** stores the data, but the client apps never talk to it directly: Firestore rules deny all direct client access, and the API uses the Firebase Admin SDK. The client SDKs are only used to sign in.

Why so strict? In a quiz app, **the answer key is the crown jewels**. Here it never leaves the server: hints, reveals and grading are all server round-trips, and submissions are graded against the server's own copy of the quiz. The client only says which option was chosen.

## How a quiz is built (no model involved)

Building a quiz for one student is five deterministic steps:

1. **Load the rules.** Question count, difficulty mix, penalties and revision intervals come from settings the team edits in the admin panel — no deploy needed.
2. **Fill the revision slots first.** Questions the student got wrong that are due today — after 1, 3, 7 or 21 days — go in first. That's the spaced repetition.
3. **Set a difficulty target.** The baseline easy/medium/hard mix is bent toward the student's current ability.
4. **Draw from the pool.** Everything the student has already seen is subtracted, then a weighted draw favours weak topics, under-served questions and items that separate strong learners from weak ones.
5. **Shuffle.** Question and option order are shuffled with a seed derived from the quiz ID — different for every quiz, identical if the same quiz is resumed.

## Why the AI doesn't pick the questions

- **Correctness.** "Never repeat a question for this student" is a set operation over thousands of rows. Code guarantees it; a language model can only be asked nicely.
- **Cost.** Selection runs on every single quiz. In code it's free; with a model it would be the biggest line on the AI bill.
- **Speed.** A quiz starts in milliseconds instead of seconds.

## Where the AI earns its place

The model does the work that genuinely needs language and judgement:

- **Drafting** questions, hints and explanations from study material the team pastes in;
- **Writing each student's debrief** after an attempt, in plain language;
- **Recommending** what to study next;
- **Answering student doubts** — from approved content only.

And there's one gate that can't be switched off: **every AI-drafted question waits for a human reviewer** before any student sees it. That rule is enforced in the API, not just the UI.

AI spend is tracked against a budget in the admin panel, and the AI layer is optional: without an API key, the platform still runs normally — minus the written debrief and the drafting tool.

## What I'd tell anyone building AI into education

1. **Let code do what must be correct.** Selection, scoring, "never repeat" — deterministic, tested, cheap.
2. **Let the model do what needs language.** Drafting, explaining, giving feedback.
3. **Put a human between the model and the learner** for anything that becomes teaching material.
4. **Protect the answer key in the architecture**, not with obfuscation.
5. **Make the AI optional.** If the product still works when the model is switched off, you've drawn the boundary in the right place.

The most useful AI decision on this project was deciding where *not* to use it.
