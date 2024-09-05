import { RefObject, useLayoutEffect, useState } from 'react'

const useScrollBottom = (ref: RefObject<HTMLDivElement>) => {
  const [scrollBottom] = useState(false)
  const [scrollY] = useState(0)

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' })

        // console.log("ref.current",ref.current)
        // const scrollPosition = ref.current.scrollTop;
        // const scrollHeight = ref.current.scrollHeight;
        // const clientHeight = ref.current.clientHeight;

        // setScrollY(scrollPosition);
        // setScrollBottom(scrollPosition + clientHeight >= scrollHeight);
      }
    }

    const element = ref.current
    element?.addEventListener('scroll', handleScroll)
    return () => element?.removeEventListener('scroll', handleScroll)
  }, [ref])

  return { scrollBottom, scrollY }
}

export default useScrollBottom
