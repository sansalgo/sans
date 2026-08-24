export function SiteMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 256 256"
      aria-hidden
      {...props}
    >
      <path
        fill="currentColor"
        d="M96 0H160V64H96V0ZM32 64H96V128H32V64ZM160 64H224V128H160V64ZM0 128H64V192H0V128ZM96 128H160V192H96V128ZM192 128H256V192H192V128ZM96 192H160V256H96V192Z"
      />
    </svg>
  )
}

export function getMarkSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256"><path fill="currentColor" d="M96 0H160V64H96V0ZM32 64H96V128H32V64ZM160 64H224V128H160V64ZM0 128H64V192H0V128ZM96 128H160V192H96V128ZM192 128H256V192H192V128ZM96 192H160V256H96V192Z"/></svg>`
}
