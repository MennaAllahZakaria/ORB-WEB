export type DisputeDecision = "refund" | "release" | "partial";

export function isSuperAdminRole(role: string | undefined | null) {
  return role === "superAdmin";
}

export function isLessonAdminResolved(reviewStatus: string | undefined, adminNote: string | undefined) {
  return reviewStatus === "resolved_by_admin" || Boolean(adminNote?.trim());
}

export function buildDisputeResolution(decision: DisputeDecision, amountInput: string, noteInput = "") {
  const amount = amountInput.trim() ? Number(amountInput) : 0;
  if (decision === "partial" && (!Number.isFinite(amount) || amount <= 0)) {
    return null;
  }
  return { decision, refundAmount: decision === "partial" ? amount : 0, note: noteInput.trim() };
}

export function canFinalizeTeacherReview(certificateUrl: string | undefined, decision: "approved" | "rejected", rejectionReason: string) {
  if (decision === "approved") return Boolean(certificateUrl);
  return Boolean(rejectionReason.trim());
}
