// scroll-utils.ts
const NAVBAR_OFFSET = 88;

function currentScrollTarget(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return window.scrollY + rect.top - NAVBAR_OFFSET;
}

export function scrollUnderNavbar(getEl: () => HTMLElement | null) {
  const DEBOUNCE_MS = 60;
  const MAX_WAIT_MS = 900;
  const CORRECTION_CHECKS = [150, 350, 600]; // ms after final scroll to re-verify

  let debounceTimer: ReturnType<typeof setTimeout>;
  let maxTimer: ReturnType<typeof setTimeout>;
  let done = false;

  const onTransitionEnd = (e: Event) => {
    const prop = (e as TransitionEvent).propertyName;
    if (prop !== "max-height" && prop !== "height" && prop !== "grid-template-rows") return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(finish, DEBOUNCE_MS);
  };

  function doScroll(smooth: boolean) {
    const el = getEl();
    if (!el) return;
    const target = currentScrollTarget(el);
    window.scrollTo({ top: target, behavior: smooth ? "smooth" : "instant" as ScrollBehavior });
  }

  function verifyAndCorrect(delay: number) {
    setTimeout(() => {
      const el = getEl();
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const off = rect.top - NAVBAR_OFFSET;
      // If it's drifted more than a couple px from where it should sit,
      // snap it back — no animation, just correct it.
      if (Math.abs(off) > 2) {
        doScroll(false);
      }
    }, delay);
  }

  function finish() {
    if (done) return;
    done = true;
    document.removeEventListener("transitionend", onTransitionEnd, true);
    clearTimeout(debounceTimer);
    clearTimeout(maxTimer);

    doScroll(true);
    // Layout can still shift slightly after our scroll (sibling finishing
    // its collapse, fonts/icons finishing layout, etc). Re-check a few times
    // and snap back into place if it drifted.
    CORRECTION_CHECKS.forEach(verifyAndCorrect);
  }

  document.addEventListener("transitionend", onTransitionEnd, true);
  debounceTimer = setTimeout(finish, DEBOUNCE_MS);
  maxTimer = setTimeout(finish, MAX_WAIT_MS);
}