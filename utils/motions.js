export const containerMotion = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const itemMotion = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};
