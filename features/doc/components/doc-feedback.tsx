"use client"

import { useId, useState } from "react"
import { useWebHaptics } from "web-haptics/react"
import { atomWithStorage } from "jotai/utils"
import { useAtom } from "jotai"
import { CheckIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

import { trackEvent } from "@/lib/events"
import { Button } from "@/components/base/ui/button"
import { Callout } from "@/components/callout"

type DocFeedbackVote = "yes" | "no"

const VOTE_OPTIONS = [
  { value: "yes", label: "Yes", icon: <ThumbsUpIcon className="-mr-0.5" /> },
  { value: "no", label: "No", icon: <ThumbsDownIcon /> },
] as const satisfies ReadonlyArray<{
  value: DocFeedbackVote
  label: string
  icon: React.ReactElement
}>

const feedbackVotesAtom = atomWithStorage<Record<string, DocFeedbackVote>>(
  "doc_feedback_v1",
  {}
)

type DocFeedbackProps = {
  category: string
  slug: string
}

export function DocFeedback({ category, slug }: DocFeedbackProps) {
  const headingId = useId()
  const key = `${category}/${slug}`

  const [votes, setVotes] = useAtom(feedbackVotesAtom)
  const vote = votes[key]
  const hasVoted = vote !== undefined

  // Unlike `hasVoted`, this is not persisted: the thanks message only
  // appears right after voting, not for a returning visitor.
  const [justVoted, setJustVoted] = useState(false)

  const { trigger: haptic } = useWebHaptics()

  const handleVote = (value: DocFeedbackVote) => {
    trackEvent({
      name: "doc_feedback",
      properties: { category, slug, vote: value },
    })
    setVotes((prev) => ({ ...prev, [key]: value }))
    setJustVoted(true)
    haptic("success")
  }

  return (
    <>
      <div className="screen-dashed-line-top before:opacity-80">
        <div className="screen-line-top h-px overflow-x-clip" />
      </div>

      <section className="flex flex-col gap-2 p-4" aria-labelledby={headingId}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h2 id={headingId} className="text-sm font-medium">
            Was this helpful?
          </h2>

          <div
            className="flex items-center gap-2"
            role="group"
            aria-labelledby={headingId}
          >
            {VOTE_OPTIONS.map((option) => {
              const selected = vote === option.value

              return (
                <Button
                  key={option.value}
                  className="gap-2 disabled:opacity-100"
                  variant={selected ? "default" : "outline"}
                  size="sm"
                  aria-pressed={selected}
                  disabled={hasVoted}
                  onClick={() => handleVote(option.value)}
                >
                  {option.icon}
                  {option.label}
                </Button>
              )
            })}
          </div>
        </div>

        {vote && justVoted && (
          <Callout
            className="outline-none has-[>svg]:gap-x-3"
            icon={<CheckIcon />}
            tabIndex={-1}
          >
            Thanks for your feedback!
          </Callout>
        )}
      </section>
    </>
  )
}
