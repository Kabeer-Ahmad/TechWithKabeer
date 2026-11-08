---
title: "Websites for Small Businesses in 2026: What Actually Brings in Customers"
excerpt: "After building sites for a coffee chain, body shop, crochet brand, mechanic, cleaning company and more, here's what moves the needle — and what's just decoration."
tags: ["Web Development", "Small Business", "SEO", "Next.js", "Supabase", "Freelancing"]
---

Over the last couple of years I've built websites for a wide mix of businesses: a coffee chain's point-of-sale system, a car body shop in Rochdale, a handmade crochet brand in Pakistan, a mobile mechanic in Ohio, a cleaning and maintenance company, a UK security firm, a luxury fashion and interiors brand, and a digital marketing agency.

Very different customers. Surprisingly similar lessons.

## 1. The contact path is the product

For most small businesses, the website has one job: **turn a visitor into a call, a message, a booking or an order**. Everything else supports that.

So the first thing I design isn't the hero section. It's the path to contact:

- a clear call-to-action visible without scrolling, on every page;
- a short form (name, phone, what you need) that actually emails the owner — I usually wire it to Nodemailer or a transactional email service;
- tap-to-call and WhatsApp buttons on mobile, because that's how many local customers prefer to reach out.

A beautiful site that hides the phone number is a brochure, not a business tool.

## 2. Local SEO is mostly structure, not tricks

For local trades like the body shop and the mechanic, search is where customers start. What matters there isn't keyword stuffing; it's structure:

- **one page per service** ("dent repair", "scratch repair", "accident damage") with genuinely useful content;
- **area pages** for the towns they actually serve;
- clean metadata, a sitemap, fast pages and proper headings;
- a **blog** the owner can update without me — a simple rich-text editor in an admin panel goes a long way.

## 3. Give owners an admin panel they'll actually use

Almost every client eventually asks: "Can I change this myself?" For stores like Little Knots and Bea Foster, I build a small admin panel on **Supabase**: products, categories, orders, blog posts. Owners can update their own catalogue and content, and I don't become a bottleneck for every typo.

Supabase gives me auth, a Postgres database, file storage and row-level security in one place, which is exactly the right size for a small business.

## 4. Payments: keep it simple and trusted

When a site sells online, I reach for a trusted provider — **Stripe** where it's available — rather than anything custom. For local businesses where most customers pay on delivery or by bank transfer, a clear order form with order tracking often beats a full checkout. Match the payment flow to how the business's customers already like to pay.

## 5. Add one "wow" feature only if it sells

Some of my favourite features are small and specific:

- the **AI paint visualiser** on the car body shop site, which suggests a colour and shows your car in it;
- a **3D hero** for the mechanic and the marketing agency, to stand out in a sea of identical templates.

These earn their place when they keep visitors on the page and make the business memorable. A 3D scene on a site where people just want a phone number is a liability — performance always comes first.

## 6. Speed and mobile are non-negotiable

Most visitors arrive on a phone, often on mobile data. Every site I ship is checked on a phone-sized screen, uses optimised images, and loads heavy features only when needed. If a page feels slow, people don't wait — they call the competitor.

## The checklist I start every client project with

1. What single action should a visitor take?
2. Which services and areas do customers search for?
3. What will the owner want to update themselves?
4. How do their customers prefer to pay and contact them?
5. Is there one feature that would make them memorable?

Get those five right and the design has something real to support.
