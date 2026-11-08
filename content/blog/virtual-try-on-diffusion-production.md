---
title: "Virtual Try-On in Production: Diffusion Models, DensePose and the GPU Bill"
excerpt: "Making a shirt look right on a photo of a real person is a research problem. Making it fast and affordable for an online store is an engineering one. Notes from building Stylique."
tags: ["Virtual Try-On", "Diffusion Models", "Computer Vision", "PyTorch", "GPU", "E-commerce"]
---

At Stylique I worked on a virtual try-on engine for online fashion stores: a shopper uploads a photo, picks a garment, and sees themselves wearing it. Getting a good-looking result in a research notebook took weeks. Getting it to run reliably, quickly and affordably for paying B2B clients took much longer.

Here's what that journey taught me.

## The pipeline, in plain terms

A modern try-on system isn't one model. It's a chain:

1. **Understand the person.** A human-parsing model (we used **SCHP**) labels every pixel: hair, face, arms, upper clothes, trousers.
2. **Understand the body's shape.** **DensePose** maps the person's body surface, so we know where a sleeve should wrap around an arm.
3. **Prepare the garment.** Clean the product image, extract the garment mask, and align it to the body.
4. **Generate.** A **diffusion model**, conditioned on the person, the pose information and the garment, paints the new clothing into the masked region while keeping the face, hands and background intact.
5. **Post-process.** Blend edges, fix colour shifts, and check quality before showing it to a shopper.

Each step can fail on its own, which is why the engineering around it matters so much.

## Where the quality comes from

- **Masks matter more than the model.** Most ugly results came from bad masks — a sleeve cut off at the elbow, hair painted over. Improving parsing and mask logic improved quality more than swapping diffusion checkpoints.
- **Garment detail is the hard part.** Logos, text and fine patterns are exactly what diffusion models like to "reimagine". Conditioning strongly on the garment image and keeping inference steps sensible helped preserve them.
- **Real customer photos are messy.** Studio photos work. Mirror selfies with bad lighting and busy backgrounds don't — which is why input checks and gentle guidance ("stand facing the camera, arms slightly away from your body") matter as much as the model.

## Where the cost comes from

Diffusion inference is expensive. A naive setup runs every model on every request on a big GPU and burns money while it waits for traffic. The levers that matter most:

- **Cache the person.** Parsing and DensePose results for an uploaded photo don't change between garments. Compute them once, reuse them for every item the shopper tries.
- **Half precision and sensible step counts.** fp16 inference and tuning the number of denoising steps gave large speed-ups with little visible quality loss.
- **Queue, batch and scale to zero.** Put requests in a queue, batch where possible, and let GPU workers scale down when idle. Cold starts are the trade-off, so keep some warm capacity when shoppers are most active.
- **Pre-generate where you can.** For a store's catalogue, popular garments on model photos can be generated ahead of time instead of on demand.

## Shipping it to stores

The best model in the world doesn't matter if a store can't install it. That's why we built a scalable **Shopify integration**, so merchants could bring try-on to their product pages without rebuilding their store. For a B2B product, that integration was as important as the model itself.

The work also took us through the **LUMS LCE Idea Launch** programme and into the **National Incubation Center** — and the lesson that stuck with me is simple: clients care about speed, reliability and whether shoppers trust the result, far more than which model is under the hood.

## The takeaway

Generative AI in production is mostly classic engineering: good inputs, caching, queues, monitoring and a clear integration story. The model gives you the magic; the pipeline makes it a product.
