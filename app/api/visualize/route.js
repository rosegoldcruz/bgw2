"use server";

import { NextResponse } from "next/server";
import { createJob, updateJob } from "@/lib/visualizer-jobs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { homeImageUrl, doorImageUrl, doorName } = body;

    // Validate both images are provided
    if (!homeImageUrl) {
      return NextResponse.json(
        { error: "Please upload a photo of your home first." },
        { status: 400 }
      );
    }

    if (!doorImageUrl) {
      return NextResponse.json(
        { error: "Please select a door before using the visualizer." },
        { status: 400 }
      );
    }

    const replicateToken = process.env.REPLICATE_API_TOKEN;
    if (!replicateToken) {
      return NextResponse.json(
        { error: "Replicate API token not configured. Please add REPLICATE_API_TOKEN to .env.local" },
        { status: 500 }
      );
    }

    const nameLine = doorName ? `The selected door is "${doorName}".` : "";
    const prompt = [
      "You are given two images: (1) the user's home photo and (2) the selected door reference image.",
      "Replace ONLY the existing front door within its current opening in image 1 with the exact door from image 2.",
      nameLine,
      "Use the reference door as ground truth for panel layout, glass pattern, lite arrangement, molding details, and finish color.",
      "Do not invent or swap designs. Do not change the door style, glass pattern, or proportions.",
      "Do not add sidelites, transoms, double doors, or change the opening size unless they already exist in image 1.",
      "Ignore the background of the reference door image; extract only the door itself.",
      "Preserve the house, siding, trim, steps, windows, garage, driveway, landscaping, and sky exactly as in image 1.",
      "Match camera perspective, scale, lens, lighting, shadows, and reflections to the original photo.",
      "Result must look like a real photograph with only the door replaced.",
    ]
      .filter(Boolean)
      .join(" ");

    const negativePrompt =
      "different door design, wrong glass pattern, different panel count, mismatched finish, added sidelites, added transom, double doors, enlarged opening, moved doorway, changed siding, new steps, extra railings, new columns, zoomed crop, skewed perspective, warped geometry, halos, seams, blur, low resolution, artifacts, watermark, logo, text, extra objects";

    // Call Replicate Nano Banana with TWO image inputs
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${replicateToken}`,
        "Content-Type": "application/json",
        "Prefer": "wait"
      },
      body: JSON.stringify({
        version: "google/nano-banana",
        input: {
          prompt,
          negative_prompt: negativePrompt,
          image_input: [
            homeImageUrl,
            doorImageUrl
          ]
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Replicate API error:", errorData);
      return NextResponse.json(
        { error: errorData.detail || "Failed to generate visualization. Please try again." },
        { status: response.status }
      );
    }

    const prediction = await response.json();

    // If using "Prefer: wait", the prediction should have output directly
    if (prediction.output) {
      return NextResponse.json({
        imageUrl: Array.isArray(prediction.output) ? prediction.output[0] : prediction.output,
        status: "succeeded"
      });
    }

    // If prediction is still processing, return the prediction ID for polling
    if (prediction.id && prediction.status !== "succeeded") {
      // Create job in store so polling works
      const job = createJob(prediction.id);
      job.status = prediction.status;
      // We need to re-save because createJob sets status to 'queued' by default
      updateJob(prediction.id, { status: prediction.status });

      return NextResponse.json({
        predictionId: prediction.id,
        status: prediction.status
      });
    }

    return NextResponse.json(
      { error: "Unexpected response from Replicate API" },
      { status: 500 }
    );

  } catch (error) {
    console.error("Visualize API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
