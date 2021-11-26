import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollToPlugin)

export const scrollToArea = (targetNodeClass) => {
  const target = document.querySelector(targetNodeClass)
  gsap.to(window, { duration: 0.6, ease: 'power1', scrollTo: target })
}
