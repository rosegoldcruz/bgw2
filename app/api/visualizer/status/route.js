import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REPLICATE_URL = "https://api.replicate.com/v1/predictions";

export async function GET(request) {
  const jobId = request.nextUrl.searchParams.get("jobId") || "";

  if (!jobId) {
    return NextResponse.json({
      jobId: "",
      status: "failed",
      imageUrl: null,
    });
  }

  const replicateToken = process.env.REPLICATE_API_TOKEN;
  if (!replicateToken) {
    return NextResponse.json({
      jobId,
      status: "failed",
      imageUrl: null,
    });
  }

  try {
    // Poll Replicate directly using the prediction ID
    const response = await fetch(`${REPLICATE_URL}/${jobId}`, {
      headers: {
        Authorization: `Bearer ${replicateToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Don't mark as failed, Replicate might be temporarily unavailable
      return NextResponse.json({
        jobId,
        status: "processing",
        imageUrl: null,
      });
    }

    const prediction = await response.json();

    if (prediction.status === "succeeded" && prediction.output) {
      const imageUrl = Array.isArray(prediction.output)
        ? prediction.output[0]
        : prediction.output;
      return NextResponse.json({
        jobId,
        status: "completed",
        imageUrl,
      });
    }

    if (prediction.status === "failed" || prediction.status === "canceled") {
      return NextResponse.json({
        jobId,
        status: "failed",
        imageUrl: null,
      });
    }

    // Still processing (starting, processing, etc.)
    return NextResponse.json({
      jobId,
      status: "processing",
      imageUrl: null,
    });
  } catch {
    // Network error, don't mark as failed
    return NextResponse.json({
      jobId,
      status: "processing",
      imageUrl: null,
    });
  }
}
