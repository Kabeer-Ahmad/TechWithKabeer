---
title: "On-Device AI Is Finally Practical: What I Learned Building SomnAI with Apple's Foundation Models"
excerpt: "No server, no API bill, no data leaving the phone. Here's how I used Apple's on-device model to build a private dream journal — and where it still needs a fallback."
tags: ["Apple Intelligence", "Foundation Models", "Swift", "On-Device AI", "iOS", "Privacy"]
---

For the last two years, "adding AI" to an app meant the same thing: send the user's text to a cloud model, wait, pay per token. That's fine for a lot of products. It's a terrible fit for a dream journal.

Dreams are about as personal as data gets. When I started building **SomnAI** — an iPhone app where you hold a button each morning, describe your dream out loud, and get a short reflection back — I set one hard rule: **nothing leaves the device**. No account, no server, no analytics on the content.

A year ago that rule would have meant "no AI." With Apple's **Foundation Models** framework, it doesn't.

## What the framework actually gives you

Apple ships a ~3-billion-parameter language model inside the OS on Apple Intelligence devices, and the Foundation Models framework lets any app call it from Swift. The parts that matter in practice:

- **It runs locally.** No network round-trip, works on a plane, and there's no per-request cost.
- **Guided generation.** Instead of asking for JSON and praying, you describe a Swift type and the model is constrained to produce exactly that shape.
- **Tool calling**, so the model can ask your code for data instead of you stuffing everything into the prompt.

That second point is the one that changed how I build.

## Guided generation: stop parsing strings

Here's roughly what a dream reflection looks like in SomnAI:

```swift
import FoundationModels

@Generable
struct DreamReflection {
    @Guide(description: "A short, evocative title for the dream, at most six words")
    var title: String

    @Guide(description: "Two sentences summarising what happened, in the second person")
    var summary: String

    @Guide(description: "Three to five recurring objects, places or feelings in the dream")
    var motifs: [String]

    @Guide(description: "One gentle question the dreamer could reflect on today")
    var followUpQuestion: String
}

let session = LanguageModelSession(
    instructions: "You help people reflect on their dreams. Be warm, never diagnose, never predict the future."
)

let response = try await session.respond(
    to: "Here is my dream: \(transcript)",
    generating: DreamReflection.self
)

let reflection = response.content   // a real DreamReflection, not a string
```

No regex, no `JSONDecoder` failures at 7 a.m., no "the model added a friendly preamble before the JSON." The output is a typed value I can store straight into SwiftData.

## Always check availability — and ship a fallback

The model only exists on Apple Intelligence hardware, with Apple Intelligence switched on, in a supported language. Plenty of real users fail at least one of those. So the very first thing SomnAI does is ask:

```swift
switch SystemLanguageModel.default.availability {
case .available:
    // use the on-device model
case .unavailable(let reason):
    // fall back to the built-in engine and log `reason` locally
}
```

My fallback is a small rule-based engine: keyword and motif extraction, sentiment, and template-written reflections. It's noticeably less poetic, but the app still *works*, and the pattern analysis (recurring motifs, people who keep showing up, how your days shape your nights) runs on structured data either way. **Design the feature so the model is an upgrade, not a dependency.**

## What surprised me

1. **Small model, small prompts.** A 3B model rewards tight, concrete instructions. Long "you are a world-class…" system prompts made outputs worse, not better. Short rules plus a well-described `@Generable` type did most of the work.
2. **Speed is a UX feature.** Because there's no network, I could show "Somna is reflecting…" for a second or two instead of a spinner with a timeout and retry logic.
3. **Privacy becomes a selling point you can prove.** "Your dreams never leave your phone" is a claim users can verify by turning on airplane mode. That's a very different trust conversation from a privacy policy.
4. **Speech is part of the pipeline.** I use Apple's Speech framework and require on-device recognition where the device supports it, so the transcript is private too — not just the reflection.

## When I would *not* use it

On-device isn't a silver bullet. I'd still reach for a cloud model when:

- the task needs broad world knowledge or long, multi-step reasoning;
- you need Android and web parity from the same AI feature;
- you need to process long documents that won't fit a small model's context.

For SomnAI, none of those applied. For a lot of "smart suggestion", summarisation and classification features in everyday apps, they don't either.

## The takeaway

The interesting shift isn't that phones can run language models — it's that the **economics and the privacy story flip**. Zero marginal cost per request and data that never leaves the device make features viable that would never survive a cloud bill or a privacy review.

If you're building an iOS app this year, try one small feature on-device first. Use guided generation, check availability, ship a fallback. You might not go back.
