import { Pill } from "@/components/ui/Pill";
import type { RxSchedule } from "@/lib/catalog/types";
import { cx } from "@/lib/cx";

export type Schedule = RxSchedule;

/** Outlined square. Only ever rendered beside RxMark, never alone. */
export function ScheduleTag({ schedule }: { schedule: Schedule }) {
  return (
    <span
      className="inline-flex size-6 items-center justify-center rounded-none border border-primary text-legal font-semibold text-primary"
      aria-label={`Schedule ${schedule}`}
    >
      {schedule}
    </span>
  );
}

interface RxMarkProps {
  /** Renders the schedule tag beside the mark. */
  schedule?: Schedule;
  className?: string;
}

/** Fraunces ℞ in a sage pill: prescription-only. */
export function RxMark({ schedule, className }: RxMarkProps) {
  return (
    <span className={cx("inline-flex items-center gap-1.5", className)}>
      <Pill aria-label="Prescription only" className="min-w-8 justify-center px-2">
        <span aria-hidden="true" className="font-editorial text-input leading-none font-medium">
          ℞
        </span>
      </Pill>
      {schedule ? <ScheduleTag schedule={schedule} /> : null}
    </span>
  );
}
