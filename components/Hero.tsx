"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-2xl md:text-5xl lg:text-6xl font-bold mb-10 text-blue-600"
        >
          안녕하세요,
          <br />
          프론트엔드 개발자
          <br />
          김현태 입니다.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          사용자 경험을 최우선으로 생각하며,
          <br className="hidden md:block" />
          아름답고 기능적인 웹 애플리케이션을 만듭니다.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-gray-700"
          >
            연락하기
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6 mb-16"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 text-gray-600"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 text-gray-600"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:your.email@example.com"
            className="p-3 border border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 text-gray-600"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute  left-[45%] transform -translate-x-1/2"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="text-sm ">더 알아보기</span>
            <ArrowDown size={24} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
