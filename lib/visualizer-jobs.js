const JOB_STORE_KEY = "__bgw_visualizer_jobs__";

function getStore() {
  if (!globalThis[JOB_STORE_KEY]) {
    globalThis[JOB_STORE_KEY] = new Map();
  }
  return globalThis[JOB_STORE_KEY];
}

export function createJob(customId = null) {
  const id = customId || crypto.randomUUID();
  const job = {
    id,
    status: "queued",
    imageUrl: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  getStore().set(id, job);
  return job;
}

export function getJob(jobId) {
  if (!jobId) return null;
  return getStore().get(jobId) || null;
}

export function updateJob(jobId, patch) {
  const job = getJob(jobId);
  if (!job) return null;
  const next = {
    ...job,
    ...patch,
    updatedAt: Date.now(),
  };
  getStore().set(jobId, next);
  return next;
}

export function normalizeStatus(status) {
  const allowed = new Set(["queued", "starting", "processing", "succeeded", "completed", "failed", "canceled"]);
  return allowed.has(status) ? status : "failed";
}

