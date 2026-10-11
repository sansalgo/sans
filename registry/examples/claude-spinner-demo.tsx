import { ClaudeSpinner } from "@/registry/components/claude-spinner/claude-spinner"

export default function ClaudeSpinnerDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <ClaudeSpinner label="Thinking" />
      <ClaudeSpinner label="Reading files" color="var(--primary)" />
      <ClaudeSpinner
        label="Deploying"
        color="#3b82f6"
        tokens={1200}
        subStatus="still thinking"
      />
    </div>
  )
}
