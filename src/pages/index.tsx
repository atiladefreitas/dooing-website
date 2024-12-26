import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { ArrowDown, Github } from "lucide-react";
import RepoStats from "../components/RepoStats";
import CodeRender from "../components/CodeRender";
import DefaultConfig from "../components/DefaultConfig";
import Image from "next/image";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const slideIn = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  return (
    <>
      <div className="pt-12 md:h-screen w-screen dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center px-4">
        <motion.div
          {...fadeIn}
          className="absolute flex flex-col left-1/2 bottom-0 transform -translate-x-1/2 mb-6 items-center justify-center"
        >
          <p>Install Dooing</p>
          <ArrowDown size={24} className="animate-bounce" />
        </motion.div>

        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2">
          <motion.div
            {...slideIn}
            className="md:h-screen w-full flex flex-col justify-center relative md:px-32 gap-12"
          >
            <p className="text-blue-gray-900 font-bold text-4xl">Dooing</p>
            <p className="text-blue-gray-900 text-lg">
              Dooing is a minimalist todo list manager for Neovim, designed with
              simplicity and efficiency in mind. It provides a clean,
              distraction-free interface to manage your tasks directly within
              Neovim. Perfect for users who want to keep track of their todos
              without leaving their editor.
            </p>
            <Link href="https://github.com/atiladefreitas/dooing">
              <Button
                placeholder="button"
                size="lg"
                className="flex items-center gap-4"
              >
                <Github />
                See on GitHub
              </Button>
            </Link>
            <RepoStats />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:h-screen w-full flex items-center justify-center relative"
          >
            <Image width={1200} height={300} alt="Demo" src="/frame.png" />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="h-screen w-screen dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center px-4"
      >
        <div className="pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <CodeRender />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="h-fit w-screen dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center px-4 flex-col"
      >
        <div className="pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <DefaultConfig />
        <div className="my-12 flex items-center gap-2">
          Made in
          <Image width={20} height={20} alt="brazil flag" src="/br.png" />
          with
          <Image width={20} height={20} alt="heart" src="/heart.png" />
        </div>
      </motion.div>
    </>
  );
}
