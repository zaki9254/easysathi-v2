import { ArrowRight, CheckCircle2 } from "lucide-react";

interface AnswerCardProps {
  title: string;
  answer: string;
  description?: string;
  details?: {
    label: string;
    value: string;
  }[];
  onTryAnother?: () => void;
}

export function AnswerCard({
  title,
  answer,
  description,
  details,
  onTryAnother,
}: AnswerCardProps) {
  return (
    <div className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border bg-background text-left shadow-sm">
      {/* Header */}
      <div className="border-b bg-muted/30 px-6 py-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-4" />

          <p className="text-sm font-medium">EasySathi Answer</p>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">{title}</p>
      </div>

      {/* Main answer */}
      <div className="px-6 py-7">
        <p className="text-sm text-muted-foreground">Result</p>

        <p className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
          {answer}
        </p>

        {description && (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {/* Details */}
      {details && details.length > 0 && (
        <div className="border-t px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {details.map((detail) => (
              <div key={detail.label}>
                <p className="text-xs text-muted-foreground">{detail.label}</p>

                <p className="mt-1 font-medium">{detail.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {onTryAnother && (
        <div className="border-t px-6 py-4">
          <button
            type="button"
            onClick={onTryAnother}
            className="group flex items-center gap-2 text-sm font-medium"
          >
            Try another calculation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </div>
  );
}
