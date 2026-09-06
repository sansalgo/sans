import { AvatarLights } from "@/features/portfolio/components/avatar-lights"
import { USER } from "@/features/portfolio/data/user"

import { IsometricMark } from "@/components/isometric-mark"

import { AvatarLightsToggle } from "./avatar-lights-toggle"
import { FlipSentences } from "./flip-sentences"
import {
  ResponsiveName,
  ResponsiveNameInlineScript,
} from "./responsive-name"
import { VerifiedIcon } from "./verified-icon"

const NAME_ID = "profile-name"

const NAME_VARIANTS = [
  USER.displayName,
  `${USER.firstName} ${USER.lastName.charAt(0)}`,
  USER.firstName,
  "Santhosh",
]

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x border-line">
      <figure className="relative col-span-2 p-2 sm:p-4">
        <IsometricMark />

        <figcaption className="pointer-events-none absolute right-2 bottom-2 text-sm leading-none tracking-wide text-[color-mix(in_oklab,var(--muted-foreground)_60%,var(--background))] tabular-nums select-none sm:right-4 sm:bottom-4">
          Fig. 1.
        </figcaption>
      </figure>

      <div className="flex flex-col">
        <div className="screen-line-top mt-auto shrink-0 border-r border-line">
          <AvatarLightsToggle className="group/avatar-lights-toggle mx-0.5 my-0.75 flex outline-none">
            <AvatarLights
              className="ring-border ring-offset-background group-focus-visible/avatar-lights-toggle:ring-1 group-focus-visible/avatar-lights-toggle:ring-offset-2"
              variants={USER.avatarVariants}
            />
          </AvatarLightsToggle>
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <div className="z-1 mt-auto border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <ResponsiveName
              id={NAME_ID}
              variants={NAME_VARIANTS}
              className="relative min-w-0 -translate-y-px text-[2rem]/none font-medium tracking-tight"
            />

            <VerifiedIcon className="size-4.5 select-none" aria-hidden />

            {/* Must render after every sibling above so the pre-hydration
                measurement sees the full row's width (see responsive-name.tsx). */}
            <ResponsiveNameInlineScript id={NAME_ID} variants={NAME_VARIANTS} />
          </div>

          <FlipSentences className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            {USER.flipSentences}
          </FlipSentences>
        </div>
      </div>
    </div>
  )
}
