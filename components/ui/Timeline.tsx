import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export interface TimelineStep {
  label: string;
  /** One line under the label, for example a time or a pharmacist's name. */
  sub?: string;
  /** A timestamp at 12px faint, for done steps. */
  time?: string;
  /** Content shown under the labels, for example the seal beside the verified step. */
  aside?: ReactNode;
}

interface TimelineProps {
  steps: readonly TimelineStep[];
  /** Index of the current step. Earlier steps are done, later steps are future. */
  current: number;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

type NodeState = "done" | "current" | "future";

function stateOf(index: number, current: number): NodeState {
  if (index < current) return "done";
  if (index === current) return "current";
  return "future";
}

/** 22px node. Done: filled with a check. Current: filled with a 5px sage halo. Future: 2px ring. */
function Node({ state }: { state: NodeState }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "flex size-5.5 shrink-0 items-center justify-center rounded-pill",
        state === "done" && "bg-primary",
        state === "current" && "bg-primary outline outline-5 outline-sage",
        state === "future" && "border-2 border-ring bg-canvas",
      )}
    >
      {state === "done" ? (
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          className="stroke-surface"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 12.5l4 4L18 8" />
        </svg>
      ) : null}
    </span>
  );
}

function Labels({ step, state }: { step: TimelineStep; state: NodeState }) {
  const future = state === "future";
  return (
    <span className="flex min-w-0 flex-col">
      <span className={cx("text-body font-medium", future ? "text-ink-faint" : "text-ink")}>
        {step.label}
      </span>
      {step.sub ? (
        <span className={cx("text-row", future ? "text-ink-faint" : "text-ink-muted")}>
          {step.sub}
        </span>
      ) : null}
      {step.time ? <span className="text-legal text-ink-faint">{step.time}</span> : null}
      {step.aside ? <span className="mt-3 block">{step.aside}</span> : null}
    </span>
  );
}

export function Timeline({ steps, current, orientation = "vertical", className }: TimelineProps) {
  const last = steps.length - 1;

  if (orientation === "horizontal") {
    return (
      <ol className={cx("flex", className)}>
        {steps.map((step, index) => {
          const state = stateOf(index, current);
          return (
            <li
              key={step.label}
              aria-current={state === "current" ? "step" : undefined}
              className="flex flex-1 flex-col gap-3 pr-4 last:pr-0"
            >
              <span className="flex items-center">
                <Node state={state} />
                {index < last ? (
                  <span
                    aria-hidden="true"
                    className={cx("ml-2 h-0.5 flex-1", index < current ? "bg-primary" : "bg-ring")}
                  />
                ) : null}
              </span>
              <Labels step={step} state={state} />
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cx("flex flex-col", className)}>
      {steps.map((step, index) => {
        const state = stateOf(index, current);
        return (
          <li
            key={step.label}
            aria-current={state === "current" ? "step" : undefined}
            className="relative flex gap-3.5 pb-6 last:pb-0"
          >
            {index < last ? (
              <span
                aria-hidden="true"
                className={cx(
                  "absolute top-5.5 bottom-0 left-2.5 w-0.5",
                  index < current ? "bg-primary" : "bg-ring",
                )}
              />
            ) : null}
            <Node state={state} />
            <Labels step={step} state={state} />
          </li>
        );
      })}
    </ol>
  );
}
