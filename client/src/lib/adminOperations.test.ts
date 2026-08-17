import { describe, expect, it } from "vitest";
import { buildDisputeResolution, canFinalizeTeacherReview } from "./adminOperations";

describe("admin operations", () => {
  it("creates complete refund and release decisions without a partial amount", () => {
    expect(buildDisputeResolution("refund", "")).toEqual({ decision: "refund", refundAmount: 0 });
    expect(buildDisputeResolution("release", "250")).toEqual({ decision: "release", refundAmount: 0 });
  });

  it("only creates a partial decision when the refund is a positive number", () => {
    expect(buildDisputeResolution("partial", "")).toBeNull();
    expect(buildDisputeResolution("partial", "-5")).toBeNull();
    expect(buildDisputeResolution("partial", "125.5")).toEqual({ decision: "partial", refundAmount: 125.5 });
  });

  it("requires a certificate and a rejection reason where appropriate", () => {
    expect(canFinalizeTeacherReview(undefined, "approved", "")).toBe(false);
    expect(canFinalizeTeacherReview("https://files.example/certificate.pdf", "approved", "")).toBe(true);
    expect(canFinalizeTeacherReview("https://files.example/certificate.pdf", "rejected", "")).toBe(false);
    expect(canFinalizeTeacherReview("https://files.example/certificate.pdf", "rejected", "صورة الشهادة غير واضحة")).toBe(true);
  });
});
