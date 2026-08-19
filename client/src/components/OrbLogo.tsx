/**
 * Style reminder — ORB «دفتر المنارة»:
 * A simple orbital brand mark used at a legible scale; confident blue, compact gold nucleus.
 */
type OrbLogoProps = {
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
  showLabel?: boolean;
};

export default function OrbLogo({
  className = "",
  imageClassName = "",
  labelClassName = "",
  showLabel = true,
}: OrbLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/images/orb-official-logo.png"
        alt="شعار ORB الرسمي"
        className={`h-11 w-11 shrink-0 object-contain ${imageClassName}`}
      />
      {showLabel && (
        <div className={labelClassName}>
          <p className="font-display text-lg font-bold tracking-[0.12em] text-[#102A4B]">
            ORB
          </p>
          <p className="mt-0.5 text-[10px] font-semibold tracking-[0.12em] text-[#6C7A91]">
            EDUCATION OS
          </p>
        </div>
      )}
    </div>
  );
}
