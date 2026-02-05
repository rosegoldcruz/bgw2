import { NextResponse } from "next/server";
import { createJob, updateJob } from "@/lib/visualizer-jobs";

export const dynamic = "force-dynamic";

const REPLICATE_URL = "https://api.replicate.com/v1/predictions";

const buildPrompt = (doorName) => {
  const nameLine = doorName ? `The selected door is "${doorName}".` : "";
  return [
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
};

const NEGATIVE_PROMPT =
  "different door design, wrong glass pattern, different panel count, mismatched finish, added sidelites, added transom, double doors, enlarged opening, moved doorway, changed siding, new steps, extra railings, new columns, zoomed crop, skewed perspective, warped geometry, halos, seams, blur, low resolution, artifacts, watermark, logo, text, extra objects";

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

async function processJob(jobId, { homeImageUrl, doorImageUrl, doorName }) {
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
          prompt: buildPrompt(doorName),
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
  const { homeImageUrl, doorImageUrl, doorName } = body || {};

  processJob(job.id, { homeImageUrl, doorImageUrl, doorName });

  return NextResponse.json({
    jobId: job.id,
    status: "queued",
  });
}
