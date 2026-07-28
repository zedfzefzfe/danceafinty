import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Sections reveal themselves with gsap.fromTo(..., { opacity: 0 }) driven by
 * ScrollTrigger, so their content is invisible until the trigger fires.
 *
 * Each trigger measures its start position once — when the section mounts,
 * which is before the webfonts swap in and before images finish loading. Both
 * change the height of everything above a section, so the cached positions
 * drift out of sync with where the sections actually are. A section can then be
 * scrolled past without its trigger ever firing and stay stuck at opacity 0.
 *
 * Refreshing after each of those milestones re-measures every trigger and
 * applies the correct state, including for sections already scrolled past.
 */
export function useScrollTriggerRefresh() {
  useEffect(() => {
    // Mobile browsers fire resize when the URL bar collapses mid-scroll —
    // refreshing on that causes jumps without fixing anything.
    ScrollTrigger.config({ ignoreMobileResize: true })

    let frame = 0
    const refresh = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    }

    // Webfonts change the metrics of every heading on the page
    if (document.fonts) {
      if (document.fonts.status === 'loaded') refresh()
      else document.fonts.ready.then(refresh)
    }

    // `load` waits on images; if we already passed it, measure now
    if (document.readyState === 'complete') refresh()
    else window.addEventListener('load', refresh)

    // Images that resolve later still shift everything below them
    const pending = Array.from(document.images).filter((img) => !img.complete)
    pending.forEach((img) => {
      img.addEventListener('load', refresh, { once: true })
      img.addEventListener('error', refresh, { once: true })
    })

    // Backstop for anything the above misses (late CSS, slow decode)
    const timer = window.setTimeout(refresh, 1500)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
      pending.forEach((img) => {
        img.removeEventListener('load', refresh)
        img.removeEventListener('error', refresh)
      })
    }
  }, [])
}
