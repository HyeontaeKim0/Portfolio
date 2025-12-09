"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X } from "lucide-react";

interface ProjectDetail {
  title: string;
  items: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: { name: string; label: string }[];
  details?: string;
  participants?: string;
  period?: string;
  detailSections?: ProjectDetail[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    title: "shapeshape",
    description: "Next.js 기반 웹사이트 개발 및 유지보수",
    technologies: [
      { name: "React.js", label: "React.js" },
      { name: "typescript", label: "typescript" },
      { name: "Next.js", label: "Next.js" },
      { name: "Styled-components", label: "Styled-components" },
      { name: "Storybook", label: "Storybook" },
    ],
    details:
      "코드스테이츠 홈페이지 유지보수 및 리뉴얼 업무. 5 명의 프론트엔드 개발자와 협업.",
    participants: "5명 (FE 5)",
    period: "2022.01 ~ 2023.12",
  },
  {
    title: "나의 포트폴리오 사이트",
    description: "Next.js App router 활용하여 웹사이트 개발",
    technologies: [
      { name: "React.js", label: "React.js" },
      { name: "typescript", label: "typescript" },
      { name: "Next.js", label: "Next.js" },
      { name: "tailwind css", label: "tailwind css" },
      { name: "Figma", label: "Figma" },
    ],
    details:
      "프로젝트 데이터를 분리하여 관리하며 빌드 시점에 렌더링하는 SSG 웹 제작",
    participants: "1명",
    period: "2024.01 ~ 2024.02",
  },
  {
    title: "선언적 Toast 컴포넌트 만들기",
    description: "코드스테이츠 디자인 시스템 프로젝트 참여",
    technologies: [
      { name: "React.js", label: "React.js" },
      { name: "typescript", label: "typescript" },
      { name: "Next.js", label: "Next.js" },
      { name: "Zustand", label: "Zustand" },
      { name: "Styled-components", label: "Styled-components" },
      { name: "Storybook", label: "Storybook" },
    ],
    details: "Toast 컴포넌트 외에 Icon, Accordion 등 여러 공용 컴포넌트 개발",
    participants: "3명 (FE 3)",
    period: "2023.03 ~ 2023.05",
  },
  {
    title: "웹사이트 성능 최적화",
    description: "코드스테이츠 홈페이지 성능 최적화 작업",
    technologies: [
      { name: "React.js", label: "React.js" },
      { name: "Javascript", label: "Javascript" },
      { name: "Next.js", label: "Next.js" },
    ],
    details: "성능 최적화 사내 스터디 진행 후, 학습 내용을 적용",
    participants: "5명 (FE 5)",
    period: "2023.05 ~ 2023.07",
    detailSections: [
      {
        title: "프론트엔드 성능 개선 스터디 진행, 성능 개선 계획 수립",
        items: [
          "<프론트엔드 성능 최적화 가이드> 책으로 한 달 동안 업무 외 시간에 스터디 진행",
          "성능 개선 정도를 확인 할 수 있는 지표 선정 (Chrome LightHouse 점수 선택)",
          "학습한 내용을 기반으로 현재 홈페이지에서 진행할 수 있는 성능 개선 과제 목록 작성. 이후 스터디원끼리 과제 분담",
        ],
      },
      {
        title: "성능 개선 작업 진행",
        items: [
          "이미지 사이즈 최적화 및 lazy loading 적용",
          "불필요한 라이브러리 제거 및 코드 스플리팅 적용",
          "번들 사이즈 감소 및 로딩 속도 개선",
        ],
      },
    ],
  },
  {
    title: "블로그 개발 및 검색엔진 최적화",
    description: "코드스테이츠 공식 블로그 제작 프로젝트",
    technologies: [
      { name: "React.js", label: "React.js" },
      { name: "typescript", label: "typescript" },
      { name: "Next.js", label: "Next.js" },
      { name: "Styled-components", label: "Styled-components" },
    ],
    details: "기존에 운영되던 Wordpress 블로그의 데이터를 api로 가져와 연결",
    participants: "2명 (FE 2)",
    period: "2023.08 ~ 2023.10",
  },
  {
    title: "로그인 상태 관리 개발",
    description: "코드스테이츠 통합 로그인 개발 프로젝트",
    technologies: [
      { name: "React.js", label: "React.js" },
      { name: "typescript", label: "typescript" },
      { name: "Next.js", label: "Next.js" },
      { name: "Zustand", label: "Zustand" },
      { name: "Styled-components", label: "Styled-components" },
      { name: "Jest", label: "Jest" },
      { name: "React-testing-library", label: "React-testing-library" },
      { name: "Storybook", label: "Storybook" },
      { name: "Tanstack-query", label: "Tanstack-query" },
      { name: "React-hook-form", label: "React-hook-form" },
    ],
    details:
      "통합 로그인 상태 관리와 마이페이지 개발 담당. 유효성 검사 테스트 작성",
    participants: "3명 (FE 3)",
    period: "2023.01 ~ 2023.03",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // 모달이 열렸을 때 body 스크롤 방지
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const selectedProjectData =
    selectedProject !== null ? projects[selectedProject] : null;

  return (
    <>
      <section
        id="projects"
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
              프로젝트 상세
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4">
              주요 프로젝트의 세부 사항을 확인해보세요
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300 flex flex-col cursor-pointer shadow-sm"
                onClick={() => setSelectedProject(index)}
              >
                {/* 프로젝트 아이콘/이미지 영역 */}
                <div className="h-32 bg-blue-50 flex items-center justify-center relative overflow-hidden">
                  <div className="relative z-10 text-3xl font-bold text-blue-200">
                    {project.title.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-1">
                    {project.description}
                  </p>

                  {/* 기술 스택 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech.name}
                        className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700 text-xs"
                      >
                        {tech.label}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-gray-700 text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* 상세 정보 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(index);
                    }}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mt-auto pt-4 border-t border-gray-200"
                  >
                    <span>주요 업무 내용 보기</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 모달 */}
      <AnimatePresence>
        {selectedProjectData && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setSelectedProject(null)}
            />

            {/* 모달 컨텐츠 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white border border-gray-200 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {/* 모달 헤더 */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedProjectData.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="닫기"
                  >
                    <X size={24} className="text-gray-600" />
                  </button>
                </div>

                {/* 모달 바디 */}
                <div className="p-6 space-y-6">
                  {/* 프로젝트 설명 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      프로젝트 설명
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProjectData.details ||
                        selectedProjectData.description}
                    </p>
                  </div>

                  {/* 기술 스택 */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      기술 스택
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectData.technologies.map((tech) => (
                        <span
                          key={tech.name}
                          className="px-3 py-1.5 bg-gray-100 border border-gray-300 rounded text-gray-700 text-sm"
                        >
                          {tech.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 참여인원 및 기간 */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProjectData.participants && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          참여인원
                        </h3>
                        <p className="text-gray-600">
                          {selectedProjectData.participants}
                        </p>
                      </div>
                    )}
                    {selectedProjectData.period && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          기간
                        </h3>
                        <p className="text-gray-600">
                          {selectedProjectData.period}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 상세 내용 */}
                  {selectedProjectData.detailSections && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        상세 내용
                      </h3>
                      <div className="space-y-6">
                        {selectedProjectData.detailSections.map(
                          (section, index) => (
                            <div key={index}>
                              <h4 className="text-base font-medium text-gray-800 mb-3">
                                {index + 1}. {section.title}
                              </h4>
                              <ul className="space-y-2 ml-4">
                                {section.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="text-gray-600 leading-relaxed list-disc"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
