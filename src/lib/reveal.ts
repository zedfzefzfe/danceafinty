import gsap from 'gsap'

export interface RevealOptions {
  /** Elements to animate. */
  targets: gsap.TweenTarget | null | undefined
  /** Element whose visibility starts the tween. Defaults to `targets`. */
  trigger?: Element | null
  from: gsap.TweenVars
  to: gsap.TweenVars
  /** How much of the trigger must be showing before it plays. */
  threshold?: number
  /** Shrinks the viewport so the reveal starts slightly before the edge. */
  rootMargin?: string
}

/**
 * Plays a gsap tween once its trigger scrolls into view.
 *
 * Deliberately built on IntersectionObserver instead of ScrollTrigger.
 * ScrollTrigger resolves a trigger's start into a cached document offset when
 * the trigger is created — which is before webfonts swap in and before images
 * load. Those shift everything below them, so the cached offset stops matching
 * where the section actually is: scrolling past the section never crosses the
 * stale start, the tween never fires, and because its `from` state is
 * opacity: 0 the section stays invisible for good.
 *
 * IntersectionObserver re-measures against the live layout on every check, so
 * it cannot drift. It also reports elements that are already above the viewport,
 * which lets anything scrolled past be shown immediately rather than stranded.
 *
 * @returns cleanup that disconnects the observer and kills the tween.
 */
export function revealOnView({
  targets,
  trigger,
  from,
  to,
  threshold = 0,
  rootMargin = '0px 0px -8% 0px',
}: RevealOptions): () => void {
  const list =
    targets == null
      ? []
      : targets instanceof Element
        ? [targets]
        : Array.from(targets as ArrayLike<Element>)

  if (list.length === 0) return () => {}

  const tween = gsap.fromTo(list, from, { ...to, paused: true })

  const el = trigger ?? list[0]

  // No observer support (or nothing to watch): show it rather than hide it
  if (!el || typeof IntersectionObserver === 'undefined') {
    tween.progress(1)
    return () => tween.kill()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // `top < 0` means the trigger sits above the viewport — the user has
        // already scrolled past it, so reveal it instead of leaving it blank.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          tween.play()
          observer.disconnect()
          return
        }
      }
    },
    { threshold, rootMargin }
  )

  observer.observe(el)

  return () => {
    observer.disconnect()
    tween.kill()
  }
}
