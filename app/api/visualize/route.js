"use server";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { homeImageUrl, doorImageUrl } = body;

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

    // Call Replicate Nano Banana with TWO image inputs
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${replicateToken}`,
        "Content-Type": "application/json",
        "Prefer": "wait"
      },
      body: JSON.stringify({
        version: "fofr/nano-banana:latest",
        input: {
          prompt: "A photorealistic depiction of the user's uploaded home photo, with the existing front door and its frame replaced by the selected reference door image. The new door must be perfectly integrated into the existing opening, matching scale, perspective, and alignment. Preserve the original wall material, siding, trim, floor, steps, and surrounding environment exactly as they appear. Lighting, shadows, and reflections must match the original photo. The result should look like a real professional architectural photograph of the door already installed. Ultra-detailed, sharp focus, natural colors, seamless integration, no visible editing artifacts.",
          negative_prompt: "people, hands, tools, construction, distortion, warped geometry, incorrect perspective, mismatched lighting, blur, low resolution, artifacts, watermark, logo, text, extra objects",
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
