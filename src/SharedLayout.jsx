import { Suspense } from 'react';
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: -100 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

const SharedLayout = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ willChange: "transform, opacity" }}
    >
    <div className="container">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
    </motion.div>
  );
};

export default SharedLayout;
