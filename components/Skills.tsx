"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiVite,
  SiWebpack,
  SiChartdotjs,
  SiRedux,
  SiReactquery,
  SiSass,
  SiGithub,
  SiVercel,
  SiStyledcomponents,
  SiNestjs,
  SiAxios,
  SiClaude,
} from "react-icons/si";
import { BsCursorFill } from "react-icons/bs";
import { SiJest } from "react-icons/si";
import { SiTestinglibrary } from "react-icons/si";
import { RiBearSmileLine } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import SectionHeader from "@/components/ui/SectionHeader";

interface Skill {
  name: string;
  category: string;
  bgColor: string;
  textColor: string;
  icon?: React.ComponentType<{ className?: string }> | string;
}

const skills: Skill[] = [
  // 프론트엔드
  {
    name: "JavaScript",
    category: "프론트엔드",
    bgColor: "#F7DF1E",
    textColor: "#000000",
    icon: SiJavascript,
  },
  {
    name: "TypeScript",
    category: "프론트엔드",
    bgColor: "#3178C6",
    textColor: "#FFFFFF",
    icon: SiTypescript,
  },
  {
    name: "React",
    category: "프론트엔드",
    bgColor: "#61DAFB",
    textColor: "#000000",
    icon: SiReact,
  },
  {
    name: "Next.js",
    category: "프론트엔드",
    bgColor: "#000000",
    textColor: "#FFFFFF",
    icon: SiNextdotjs,
  },
  {
    name: "Html",
    category: "프론트엔드",
    bgColor: "#FF3E00",
    textColor: "#FFFFFF",
    icon: SiHtml5,
  },
  {
    name: "CSS",
    category: "프론트엔드",
    bgColor: "#1572B6",
    textColor: "#FFFFFF",
    icon: SiCss3,
  },
  {
    name: "Tailwind CSS",
    category: "프론트엔드",
    bgColor: "#06B6D4",
    textColor: "#FFFFFF",
    icon: SiTailwindcss,
  },
  {
    name: "Styled Components",
    category: "프론트엔드",
    bgColor: "#FF6B6B",
    textColor: "#FFFFFF",
    icon: SiStyledcomponents,
  },

  // 라이브러리
  {
    name: "Vite",
    category: "라이브러리",
    bgColor: "#646CFF",
    textColor: "#FFFFFF",
    icon: SiVite,
  },
  {
    name: "Webpack",
    category: "라이브러리",
    bgColor: "#8DD6F9",
    textColor: "#000000",
    icon: SiWebpack,
  },
  {
    name: "Axios",
    category: "라이브러리",
    bgColor: "#5A20CB",
    textColor: "#FFFFFF",
    icon: SiAxios,
  },
  {
    name: "Chart.js",
    category: "라이브러리",
    bgColor: "#E10098",
    textColor: "#FFFFFF",
    icon: SiChartdotjs,
  },
  {
    name: "Redux Toolkit",
    category: "라이브러리",
    bgColor: "#764ABC",
    textColor: "#FFFFFF",
    icon: SiRedux,
  },
  {
    name: "React Query",
    category: "라이브러리",
    bgColor: "#FF4154",
    textColor: "#FFFFFF",
    icon: SiReactquery,
  },
  {
    name: "Sass",
    category: "라이브러리",
    bgColor: "#CC6699",
    textColor: "#FFFFFF",
    icon: SiSass,
  },
  {
    name: "Zustand",
    category: "라이브러리",
    bgColor: "#000000",
    textColor: "#FFFFFF",
    icon: RiBearSmileLine,
  },

  // 환경 및 배포
  {
    name: "VS Code",
    category: "환경 및 배포",
    bgColor: "#ffffff",
    textColor: "skyblue",
    icon: VscVscode,
  },
  {
    name: "GitHub",
    category: "환경 및 배포",
    bgColor: "#181717",
    textColor: "#FFFFFF",
    icon: SiGithub,
  },
  {
    name: "Vercel",
    category: "환경 및 배포",
    bgColor: "#000000",
    textColor: "#FFFFFF",
    icon: SiVercel,
  },
  // AI 도구
  {
    name: "Claude Code",
    category: "AI 도구",
    bgColor: "#D97757",
    textColor: "#FFFFFF",
    icon: SiClaude,
  },
  {
    name: "Cursor",
    category: "AI 도구",
    bgColor: "#000000",
    textColor: "#FFFFFF",
    icon: BsCursorFill,
  },
  {
    name: "Nest.js",
    category: "스터디",
    bgColor: "#ffffff",
    textColor: "red",
    icon: SiNestjs,
  },
];

const categories = [
  "프론트엔드",
  "라이브러리",
  "환경 및 배포",
  "AI 도구",
  "스터디",
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <section
      id="skills"
      className="py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            index="03"
            title="Skills"
            subtitle="실무와 프로젝트에서 사용한 기술과 도구입니다."
          />
        </motion.div>

        {/* 카테고리 탭 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex"
        >
          <div className="inline-flex overflow-hidden rounded-full border border-gray-900/15 bg-white/70">
            <button
              onClick={() => setActiveCategory("")}
              className={`px-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === ""
                  ? "bg-gray-900 text-white"
                  : "bg-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              전체
            </button>
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 text-sm font-medium transition-all duration-200 border-l border-gray-900/10 ${
                  activeCategory === category
                    ? "bg-gray-900 text-white"
                    : "bg-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 기술 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-3 gap-y-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 w-full"
        >
          {skills.map((skill, index) => {
            const isActive =
              activeCategory === "" || skill.category === activeCategory;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: 0.3,
                  delay: 0.5 + index * 0.03,
                }}
                className={`flex mt-7 flex-col items-center justify-center cursor-pointer group transition-all duration-300 ${
                  isActive
                    ? "blur-0 opacity-100"
                    : "blur-sm opacity-30 pointer-events-none"
                }`}
              >
                <div
                  className="w-20 h-20 mb-3 flex items-center justify-center rounded-lg ring-1 ring-gray-900/10 group-hover:scale-110 transition-transform duration-200"
                  style={{
                    backgroundColor: skill.bgColor,
                    color: skill.textColor,
                  }}
                >
                  {skill.icon && typeof skill.icon !== "string" ? (
                    <skill.icon className="w-12 h-12" />
                  ) : (
                    <span className="text-base font-bold">
                      {typeof skill.icon === "string"
                        ? skill.icon
                        : skill.name.length > 8
                          ? skill.name.substring(0, 8).toUpperCase()
                          : skill.name.toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600 text-center leading-tight">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
