import { NextResponse } from "next/server";
import { createJob, updateJob } from "@/lib/visualizer-jobs";

export const dynamic = "force-dynamic";

const REPLICATE_URL = "https://api.replicate.com/v1/predictions";

const BASE_PROMPT =
  "A photorealistic depiction of the user's uploaded home photo, with the existing front door and its frame replaced by the selected reference door image. The new door must be perfectly integrated into the existing opening, matching scale, perspective, and alignment. Preserve the original wall material, siding, trim, floor, steps, and surrounding environment exactly as they appear. Lighting, shadows, and reflections must match the original photo. The result should look like a real professional architectural photograph of the door already installed. Ultra-detailed, sharp focus, natural colors, seamless integration, no visible editing artifacts.";

const NEGATIVE_PROMPT =
  "people, hands, tools, construction, distortion, warped geometry, incorrect perspective, mismatched lighting, blur, low resolution, artifacts, watermark, logo, text, extra objects";

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPredictionStatus(predictionId, token) {
  const response = await fetch(`${REPLICATE_URL}/${predictionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  return response.json().catch(() => null);
}

async function pollPrediction(jobId, predictionId, token) {
  const maxAttempts = 90;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    await delay(2000);
    const prediction = await fetchPredictionStatus(predictionId, token);

    if (!prediction?.status) {
      updateJob(jobId, { status: "processing" });
      continue;
    }

    if (prediction.status === "succeeded") {
      const imageUrl = Array.isArray(prediction.output)
        ? prediction.output[0]
        : prediction.output;
      updateJob(jobId, { status: "completed", imageUrl: imageUrl || null });
      return;
    }

    if (prediction.status === "failed" || prediction.status === "canceled") {
      updateJob(jobId, { status: "failed", imageUrl: null });
      return;
    }

    updateJob(jobId, { status: "processing" });
  }

  updateJob(jobId, { status: "failed", imageUrl: null });
}

async function processJob(jobId, { homeImageUrl, doorImageUrl }) {
  const fail = () => updateJob(jobId, { status: "failed", imageUrl: null });

  if (!homeImageUrl || !doorImageUrl) {
    fail();
    return;
  }

  const replicateToken = process.env.REPLICATE_API_TOKEN;
  if (!replicateToken) {
    fail();
    return;
  }

  updateJob(jobId, { status: "processing" });

  try {
    const response = await fetch(REPLICATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${replicateToken}`,
        "Content-Type": "application/json",
        Prefer: "wait",
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
      fail();
      return;
    }

    const prediction = await response.json().catch(() => null);

    if (prediction?.output) {
      const imageUrl = Array.isArray(prediction.output)
        ? prediction.output[0]
        : prediction.output;
      updateJob(jobId, { status: "completed", imageUrl: imageUrl || null });
      return;
    }

    if (prediction?.id) {
      await pollPrediction(jobId, prediction.id, replicateToken);
      return;
    }

    fail();
  } catch {
    fail();
  }
}

export async function POST(request) {
  const job = createJob();

  const body = await request.json().catch(() => ({}));
  const { homeImageUrl, doorImageUrl } = body || {};

  processJob(job.id, { homeImageUrl, doorImageUrl });

  return NextResponse.json({
    jobId: job.id,
    status: "queued",
  });
}
