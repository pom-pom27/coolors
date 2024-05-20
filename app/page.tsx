"use client";
import { BLUR_BUTTON_VARIANT, FADE_DOWN_ANIMATION_VARIANTS } from "@/variants";
import { useSession } from "@clerk/nextjs";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export default function Home() {
  const { isSignedIn, isLoaded } = useSession();

  const [scope, animate] = useAnimate();

  const animateWithRandomColors = async (target: string) => {
    while (true) {
      if (scope.current) {
        const color = getRandomColor();

        await animate(target, { fill: color }, { duration: 0.3, delay: 0.4 });
      } else {
        break;
      }
    }
  };

  useEffect(() => {
    animateWithRandomColors(".first");
    animateWithRandomColors(".second");
    animateWithRandomColors(".third");
    animateWithRandomColors(".fourth");
    animateWithRandomColors(".fifth");
  }, []);

  return (
    <main className="flex  lg:gap-32 lg:flex-row flex-col-reverse items-center justify-around p-24">
      <motion.div
        className="w-[calc(100% -1100px + 180px)]"
        initial="hidden"
        viewport={{ once: true }}
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.15 } },
        }}
      >
        <div className="content">
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="lg:text-7xl text-4xl max-w-[500px] tracking-tight mx-auto font-black text-center mb-[30px]"
          >
            The super fast color palettes generator!
          </motion.h1>
          <motion.p
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="text-lg max-w-[400px] mb-[35px] mx-auto font-medium text-[#464853] text-center"
          >
            Create the perfect palette or get inspired bu thousand of beautiful
            color schemes.
          </motion.p>

          <div className="buttons w-[260px] mx-auto">
            {isSignedIn && isLoaded ? (
              <motion.button
                className="bg-[#0066ff] h-[46px] px=[21px] my-3 rounded-lg hover:bg-[#0066ff] w-full text-white"
                initial="hidden"
                animate="visible"
                variants={BLUR_BUTTON_VARIANT}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <Link href="/generate"> Start generate.</Link>
              </motion.button>
            ) : (
              <motion.button
                className="bg-[#0066ff] h-[46px] px=[21px] my-3 rounded-lg hover:bg-[#0066ff] w-full text-white"
                initial="hidden"
                animate="visible"
                variants={BLUR_BUTTON_VARIANT}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link href="/sign-in"> Sign in to start generate.</Link>
              </motion.button>
            )}
            {/* <motion.button
              initial="hidden"
              animate="visible"
              variants={BLUR_BUTTON_VARIANT}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-black w-full border border-[#d8d8da] font-semibold h-[46px] px-[21px] my-3 rounded-lg"
            >
              Explore trending palettes
            </motion.button> */}
          </div>
        </div>
      </motion.div>
      <motion.div
        ref={scope}
        className="w-2/3 min-w-72 xl:py-32 p-2 lg:mb-0 mb-10 xl:mt-0 lg:mt-32 mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <svg
          version="1.1"
          id="homepage_hero_image-mobile"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 498.94 301.86"
          xmlSpace="preserve"
        >
          <path d="M450.79,288.72V20.22c0.1-7.6-6.1-13.9-13.8-14c0,0,0,0-0.1,0H59.59c-7.7,0.1-13.9,6.3-13.9,13.9c0,0,0,0,0,0.1v268.5 H450.79z"></path>
          <g id="homepage_hero-generator-laptop-mobile">
            <path
              className="first"
              d="M324.79,16.12h112c2.2,0,4,1.8,4,4v255h-116V16.12z"
              fill="rgba(34, 102, 157, 1)"
              data-darkreader-inline-fill=""
            ></path>
            <rect
              x="249.79"
              y="16.12"
              fill="rgba(221, 96, 10, 1)"
              className=" second"
              width="115"
              height="259"
              data-darkreader-inline-fill=""
            ></rect>
            <rect
              x="171.79"
              y="16.12"
              fill="rgba(139, 56, 198, 1)"
              className=" third"
              width="115"
              height="259"
              data-darkreader-inline-fill=""
            ></rect>
            <rect
              x="94.79"
              y="16.12"
              className=" fourth"
              width="116"
              height="259"
              fill="rgba(59, 159, 78, 1)"
            ></rect>
            <path
              fill="rgba(77, 60, 37, 1)"
              className=" fifth"
              d="M59.79,16.12h74v259h-78v-255C55.79,17.92,57.59,16.12,59.79,16.12z"
            ></path>
          </g>
          <path
            fill="#C9C8CC"
            d="M9.79,285.22h480l0,0c0,5.5-4.5,10-10,10h-460C14.29,295.22,9.79,290.72,9.79,285.22L9.79,285.22z"
          ></path>
        </svg>
      </motion.div>
    </main>
  );
}
