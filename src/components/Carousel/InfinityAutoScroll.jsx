"use client";

import { cn } from "../../utils/clsx_util";
import React, { useEffect, useState } from "react";
import ImageDisplay from "./ImageRenderer";
export default  function InfinityAutoScroll({
  items,
  pauseOnHover = true,
  className,
  open
}) {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  console.log(open)
  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {

        containerRef.current.style.setProperty("--animation-direction", "reverse");

    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
        containerRef.current.style.setProperty("--animation-duration", "10s");
    }
  };
  return (
    (<div
      ref={containerRef}
      onClick={()=>open(true)}
      className={cn(
        "scroller relative z-20  w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_60%,transparent)]",
        className
      )}>
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}>
        {[...items,...items].map((item, idx) => (
          <li
            className="w-[100px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700  md:w-[20rem] "
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={item.name} >
              
              
              <ImageDisplay Img={item} size={5} />
          </li>
        ))}
      </ul>
    </div>)
  );
};
