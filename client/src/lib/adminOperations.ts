export type DisputeDecision = "refund" | "release" | "partial";

export function buildDisputeResolution(decision: DisputeDecision, amountInput: string) {
  const amount = amountInput.trim() ? Number(amountInput) : 0;
  if (decision === "partial" && (!Number.isFinite(amount) || amount <= 0)) {
    return null;
  }
  return { decision, refundAmount: decision === "partial" ? amount : 0 };
}

export function canFinalizeTeacherReview(certificateUrl: string | undefined, decision: "approved" | "rejected", rejectionReason: string) {
  if (!certificateUrl) return false;
  return decision !== "rejected" || Boolean(rejectionReason.trim());
}
