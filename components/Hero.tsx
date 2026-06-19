"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import profile from "../assets/User.jpg";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 좌측: 텍스트 영역 */}
        <div>
          <motion.p
            variants={itemVariants}
            className="text-blue-500 font-semibold text-lg mb-3"
          >
            Frontend Developer
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight"
          >
            안녕하세요,
            <br />
            <span className="text-blue-600">김현태</span>입니다.
          </motion.h1>

          <motion.div variants={itemVariants} className="space-y-3 mb-8 text-gray-600 text-base leading-relaxed">
            <p>
              저는 프론트엔드 개발자로서 사용자 경험을 최우선으로 생각하며,
              아름답고 기능적인 웹 애플리케이션을 만드는 것을 좋아합니다.
            </p>
            <p>
              React, Next.js, TypeScript 등의 기술 스택을 활용하여 현대적인
              웹 애플리케이션을 개발하고 있습니다. 코드의 가독성과 재사용성을
              중시하며, 지속적인 학습과 성장을 추구합니다.
            </p>
          </motion.div>

          {/* 연락처 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 mb-8">
            <a
              href="mailto:cesc231@naver.com"
              className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 group w-fit"
            >
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                <Mail size={18} className="text-blue-600" />
              </div>
              <span>cesc231@naver.com</span>
            </a>
            <a
              href="tel:01052017704"
              className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 group w-fit"
            >
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                <Phone size={18} className="text-blue-600" />
              </div>
              <span>010-5201-7704</span>
            </a>
          </motion.div>

          {/* 소셜 링크 + CTA */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 flex-wrap">
            <a
              href="#projects"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
            >
              프로젝트 보기
            </a>
            <a
              href="https://github.com/HyeontaeKim0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 text-gray-600"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/현태-김-8898062ab"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors duration-200 text-gray-600"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </motion.div>
        </div>

        {/* 우측: 프로필 이미지 */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-100 shadow-xl">
              <Image
                src={profile}
                alt="김현태 프로필"
                width={320}
                height={320}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-blue-500 rounded-full opacity-20" />
            <div className="absolute -top-2 -left-2 w-12 h-12 bg-blue-300 rounded-full opacity-30" />
          </div>
        </motion.div>
      </motion.div>

      {/* 스크롤 유도 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span className="text-sm mb-1">더 알아보기</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
