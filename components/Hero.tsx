"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import profile from "../assets/User.jpg";
import { MiniBars, MiniLine } from "@/components/ui/MiniCharts";

const line = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-8 font-display text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
          Frontend Developer — Kim Hyeontae
        </p>

        {/* 큰 문구: 줄마다 들여쓰기를 엇갈리게 */}
        <h1 className="font-display text-[13vw] font-bold uppercase leading-[0.95] tracking-tight text-gray-900 md:text-[8.5vw] xl:text-[7.5rem]">
          <motion.span
            className="block"
            variants={line}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            Turning data
          </motion.span>
          <motion.span
            className="block pl-[8%]"
            variants={line}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <MiniBars className="mr-[0.2em]" />
            into screens
          </motion.span>
          <motion.span
            className="block"
            variants={line}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            people decide on
            <MiniLine className="ml-[0.2em]" />
          </motion.span>
        </h1>

        <motion.div
          className="mt-14 grid gap-10 border-t border-gray-900/15 pt-10 md:grid-cols-[1fr_auto] md:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex gap-6">
            <div className="relative hidden size-28 shrink-0 sm:block">
              <span className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-blue-600" />
              <Image
                src={profile}
                alt="김현태 프로필"
                width={112}
                height={112}
                className="relative size-28 rounded-lg object-cover"
              />
            </div>
            <div className="max-w-xl space-y-3 text-base leading-relaxed text-gray-700">
              <p>
                안녕하세요, <strong className="text-gray-900">김현태</strong>
                입니다. 복잡한 데이터를 사람이 판단할 수 있는 화면으로
                만드는 프론트엔드 개발자예요.
              </p>
              <p className="text-gray-600">
                React · Next.js · TypeScript로 대시보드와 B2B 서비스를
                만들어 왔고, 코드의 가독성과 재사용성을 중요하게 생각합니다.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-col gap-2 text-sm text-gray-700 md:items-end">
              <a
                href="mailto:cesc231@naver.com"
                className="flex items-center gap-2 transition-colors hover:text-blue-600"
              >
                <Mail size={16} /> cesc231@naver.com
              </a>
              <a
                href="tel:01052017704"
                className="flex items-center gap-2 transition-colors hover:text-blue-600"
              >
                <Phone size={16} /> 010-5201-7704
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#projects"
                className="rounded-full bg-gray-900 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-blue-600"
              >
                View Projects
              </a>
              <a
                href="https://github.com/HyeontaeKim0"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-900/20 p-2.5 text-gray-700 transition-colors hover:border-blue-600 hover:text-blue-600"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/현태-김-8898062ab"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-900/20 p-2.5 text-gray-700 transition-colors hover:border-blue-600 hover:text-blue-600"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center font-display text-xs uppercase tracking-widest text-gray-400 transition-colors hover:text-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { duration: 2, repeat: Infinity } }}
      >
        Scroll
        <ArrowDown size={16} className="mt-1" />
      </motion.a>
    </section>
  );
}
