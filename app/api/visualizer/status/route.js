import { NextResponse } from "next/server";
import { getJob, normalizeStatus } from "@/lib/visualizer-jobs";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const jobId = request.nextUrl.searchParams.get("jobId") || "";
  const job = getJob(jobId);

  if (!job) {
    return NextResponse.json({
      jobId,
      status: "failed",
      imageUrl: null,
    });
  }

  return NextResponse.json({
    jobId: job.id,
    status: normalizeStatus(job.status),
    imageUrl: job.imageUrl || null,
  });
}

