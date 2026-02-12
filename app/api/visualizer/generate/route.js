import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REPLICATE_URL = "https://api.replicate.com/v1/predictions";

const BASE_PROMPT =
  "A photorealistic depiction of the user's uploaded home photo, with the existing front door and its frame replaced by the selected reference door image. The new door must be perfectly integrated into the existing opening, matching scale, perspective, and alignment. Preserve the original wall material, siding, trim, floor, steps, and surrounding environment exactly as they appear. Lighting, shadows, and reflections must match the original photo. The result should look like a real professional architectural photograph of the door already installed. Ultra-detailed, sharp focus, natural colors, seamless integration, no visible editing artifacts.";

const NEGATIVE_PROMPT =
  "people, hands, tools, construction, distortion, warped geometry, incorrect perspective, mismatched lighting, blur, low resolution, artifacts, watermark, logo, text, extra objects";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { homeImageUrl, doorImageUrl } = body || {};

  if (!homeImageUrl || !doorImageUrl) {
    return NextResponse.json(
      { error: "Both home and door images are required." },
      { status: 400 }
    );
  }

  const replicateToken = process.env.REPLICATE_API_TOKEN;
  if (!replicateToken) {
    return NextResponse.json(
      { error: "Replicate API token not configured." },
      { status: 500 }
    );
  }

  try {
    // Submit prediction to Replicate WITHOUT "Prefer: wait"
    // This returns almost instantly with a prediction ID
    const response = await fetch(REPLICATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${replicateToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "google/nano-banana",
        input: {
          prompt: BASE_PROMPT,
          negative_prompt: NEGATIVE_PROMPT,
          image_input: [homeImageUrl, doorImageUrl],
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.detail || "Failed to start visualization." },
        { status: response.status }
      );
    }

    const prediction = await response.json();

    // Return the Replicate prediction ID directly
    // The status endpoint will use this to poll Replicate
    return NextResponse.json({
      jobId: prediction.id,
      status: "processing",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to start visualization." },
      { status: 500 }
    );
  }
}
