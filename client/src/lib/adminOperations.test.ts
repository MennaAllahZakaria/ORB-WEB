import { describe, expect, it } from "vitest";
import { buildDisputeResolution, canFinalizeTeacherReview, isLessonAdminResolved, isSuperAdminRole } from "./adminOperations";

describe("admin operations", () => {
  it("creates complete refund and release decisions without a partial amount", () => {
    expect(buildDisputeResolution("refund", "", "  تم التحقق من الأدلة  ")).toEqual({ decision: "refund", refundAmount: 0, note: "تم التحقق من الأدلة" });
    expect(buildDisputeResolution("release", "250")).toEqual({ decision: "release", refundAmount: 0, note: "" });
  });

  it("only creates a partial decision when the refund is a positive number", () => {
    expect(buildDisputeResolution("partial", "")).toBeNull();
    expect(buildDisputeResolution("partial", "-5")).toBeNull();
    expect(buildDisputeResolution("partial", "125.5")).toEqual({ decision: "partial", refundAmount: 125.5, note: "" });
  });

  it("requires a certificate and a rejection reason where appropriate", () => {
    expect(canFinalizeTeacherReview(undefined, "approved", "")).toBe(false);
    expect(canFinalizeTeacherReview("https://files.example/certificate.pdf", "approved", "")).toBe(true);
    expect(canFinalizeTeacherReview("https://files.example/certificate.pdf", "rejected", "")).toBe(false);
    expect(canFinalizeTeacherReview("https://files.example/certificate.pdf", "rejected", "صورة الشهادة غير واضحة")).toBe(true);
  });

  it("allows admin-account controls for a superAdmin role only", () => {
    expect(isSuperAdminRole("superAdmin")).toBe(true);
    expect(isSuperAdminRole("admin")).toBe(false);
    expect(isSuperAdminRole(undefined)).toBe(false);
  });

  it("keeps an under-admin-review lesson actionable even when its current result is incomplete", () => {
    expect(isLessonAdminResolved("under_admin_review", undefined)).toBe(false);
    expect(isLessonAdminResolved("resolved_by_admin", undefined)).toBe(true);
    expect(isLessonAdminResolved("under_admin_review", "تم توثيق القرار")).toBe(true);
  });
});
