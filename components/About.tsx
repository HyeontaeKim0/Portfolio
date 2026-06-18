"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Code, Coffee, Heart, Rocket } from "lucide-react";

import Image from "next/image";
import profile from "../assets/User.jpg";

const interests = [
  {
    icon: Code,
    title: "코딩",
    description: "깔끔하고 효율적인 코드를 작성하는 것을 좋아합니다.",
  },
  {
    icon: Rocket,
    title: "새로운 기술",
    description: "최신 기술 트렌드를 학습하고 적용하는 것을 즐깁니다.",
  },
  {
    icon: Coffee,
    title: "커피",
    description: "커피와 함께하는 개발 시간이 가장 행복합니다.",
  },
  {
    icon: Heart,
    title: "사용자 경험",
    description: "사용자 중심의 디자인과 개발을 지향합니다.",
  },
];

interface CareerProject {
  name: string;
  role: string;
  stack: string;
}

interface Career {
  company: string;
  period: string;
  current?: boolean;
  position: string;
  projects: CareerProject[];
}

const careers: Career[] = [
  {
    company: "윈클(주)",
    period: "2024.11 ~ 재직중",
    current: true,
    position: "프론트엔드 개발",
    projects: [
      {
        name: "윈클 탄소 모니터링",
        role: "모니터링 차트·카테고리 데이터 입력 페이지 개발, 권한 기반 라우팅·재사용 차트 컴포넌트 구축",
        stack: "React · Vite · Tailwind CSS · Zustand · React Query · Chart.js · i18next",
      },
      {
        name: "탄소배출 계산기",
        role: "교통수단별 배출 계수 계산 알고리즘, 5단계 설문 플로우, 다국어 UI 전담 개발",
        stack: "Next.js · TypeScript · Tailwind CSS · Zustand · i18next",
      },
      {
        name: "윈클 GovFund",
        role: "정부지원사업 공고 도메인 UI·화면 설계, 라우트 기반 코드 스플리팅·문서/데이터 중심 화면 구현",
        stack: "React 19 · TypeScript · Vite · Recharts · PDF.js · xlsx",
      },
    ],
  },
  {
    company: "(주)비즈비",
    period: "2024.05 ~ 2024.10",
    position: "프론트엔드 개발",
    projects: [
      {
        name: "코코아톡 (비즈니스 채팅 서비스)",
        role: "채팅 화면 개발, 아토믹 디자인 패턴 도입·동적 라우팅 설계로 재사용성 향상",
        stack: "Next.js · TypeScript · Scss · Redux Toolkit",
      },
      {
        name: "사내 Works 시스템",
        role: "문서함·결재함 화면 개발, 폴더 관리 기능 API 연동·공용 컴포넌트 제작",
        stack: "React Native · TypeScript · Scss · Redux Toolkit",
      },
    ],
  },
  {
    company: "(주)인텔로이드",
    period: "2022.04 ~ 2023.10",
    position: "프론트엔드 개발",
    projects: [
      {
        name: "STT 기반 상담 전화 서비스",
        role: "로그인·사용자 정보 조회 화면 설계·구현, 상담 내역 검색·STT 텍스트 제공·녹음 ZIP 다운로드",
        stack: "JavaScript · React · Css · Scss",
      },
      {
        name: "AICC 기업 전화 관리자 페이지",
        role: "회원·전화번호·결제·발신료 관리 프론트엔드 화면 및 백엔드 기능 구현",
        stack: "React · TypeScript · NestJS · PostgreSQL",
      },
    ],
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6">안녕하세요!</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              저는 프론트엔드 개발자로서 사용자 경험을 최우선으로 생각하며,
              아름답고 기능적인 웹 애플리케이션을 만드는 것을 좋아합니다.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              React, Next.js, TypeScript 등의 기술 스택을 활용하여 현대적인 웹
              애플리케이션을 개발하고 있습니다. 코드의 가독성과 재사용성을
              중시하며, 지속적인 학습과 성장을 추구합니다.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              새로운 기술을 배우고 도전하는 것을 두려워하지 않으며, 팀과의
              협업을 통해 더 나은 결과물을 만들어가고 있습니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="flex justify-center items-center">
              <Image
                src={profile}
                alt="profile"
                width={330}
                height={330}
                className="rounded-full"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">관심사</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-200 shadow-sm"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    {interest.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {interest.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-12 text-center">경력</h3>
          <div className="relative max-w-3xl mx-auto">
            {/* 타임라인 세로선 */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />

            <div className="space-y-12">
              {careers.map((career, index) => (
                <motion.div
                  key={career.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 1 + index * 0.15 }}
                  className="relative pl-8"
                >
                  {/* 타임라인 점 */}
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100" />

                  {/* 회사·기간 헤더 */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
                    <div className="flex items-center gap-2">
                      <Briefcase size={18} className="text-blue-600" />
                      <h4 className="text-xl font-bold text-gray-800">
                        {career.company}
                      </h4>
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      {career.position}
                    </span>
                    <span className="text-sm text-gray-500 sm:ml-auto">
                      {career.period}
                    </span>
                  </div>

                  {/* 프로젝트 목록 */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    {career.projects.map((project) => (
                      <div
                        key={project.name}
                        className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 transition-colors duration-200 shadow-sm"
                      >
                        <h5 className="font-semibold text-gray-800 mb-1">
                          {project.name}
                        </h5>
                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                          {project.role}
                        </p>
                        <p className="text-xs text-gray-400">{project.stack}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
