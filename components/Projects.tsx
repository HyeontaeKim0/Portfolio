"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
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
  /** `/public` 기준 경로, 예: `/projects/wincl-monitoring.png` */
  coverImage?: string;
}

const projects: Project[] = [
  {
    title: "WinCL Monitoring",
    description:
      "기업용 탄소·ESG 모니터링 SaaS 프론트엔드 — 대시보드·데이터 입력·결제·공급망 도메인 주도 구축",
    technologies: [
      { name: "React.js", label: "React" },
      { name: "typescript", label: "TypeScript" },
      { name: "Vite", label: "Vite" },
      { name: "TanStack Query", label: "TanStack Query" },
      { name: "Zustand", label: "Zustand" },
      { name: "Chart.js", label: "Chart.js" },
      { name: "Recharts", label: "Recharts" },
      { name: "Radix UI", label: "Radix UI" },
      { name: "tailwind css", label: "Tailwind CSS" },
      { name: "i18next", label: "i18next" },
      { name: "Axios", label: "Axios" },
    ],
    details:
      "탄소배출량·ESG 모니터링 SaaS의 프론트엔드를 담당했습니다. 플랜·권한 기반 라우팅, Essential/Pro 차별 대시보드, 배출량 E2E, PAYCO 정기결제, 공급망 관리, 3계층 디자인 시스템, 다국어·AI·온보딩까지 설계·구현했습니다.",
    liveUrl: "https://monitoring.wincl.io/",
    coverImage: "/projects/wincl-monitoring.png",
    detailSections: [
      {
        title: "라우팅·데이터 레이어",
        items: [
          "withAuth / allowedPlans(essential·pro) / allowedRoles / wrapWithLayout로 100+ 라우트를 선언형 단일 테이블에 통합, 로그인·구독·역할 3-factor 가드와 자동 리다이렉트",
          "라우트 정의와 Layout 래핑 분리로 신규 페이지는 import + 메타 한 줄로 반영",
          "TanStack Query 도메인 API 모듈 20+ 분리, Axios 인스턴스 다중화(인증·업로드·다운로드·일반)로 캐시 키 충돌 제거·토큰 갱신 격리",
        ],
      },
      {
        title: "대시보드·시각화·성능",
        items: [
          "Scope 1·2·3을 사업장/법인/법인통합 관점으로 Essential·Pro 차별 대시보드 구현",
          "Chart.js·Recharts로 Bar·Donut·Line·Top10·Treemap 등 10종+ 커스텀 차트, Zustand로 기간·조직 등 다중 필터 공유",
          "Google Maps + MarkerClusterer, react-window 가상 스크롤·메모이제이션으로 대량 마커·테이블·초기 렌더 안정화",
        ],
      },
      {
        title: "배출량 플로우·결제·공급망",
        items: [
          "시설 등록 → 감축 목표 → 입력 → 검증 → 배출 할당 → 매핑·고객사까지 E2E, Excel 업·다운 공통화, jsPDF 리포트",
          "PAYCO 정기결제·수단 변경·갱신 및 리다이렉트 3종, 실패·만료·미결제 모달 분기",
          "협력사 ID 기반 동적 라우팅(SCM ↔ ManageClient ↔ Partner/Client), DirectCustomer·매핑·초대 메일",
        ],
      },
      {
        title: "디자인 시스템·품질·배포",
        items: [
          "ui(Radix) → common → 도메인 3계층, CVA + tailwind-merge + clsx로 variant API, Pagination·Select·TableSelect·DateSelect 등 공용화",
          "ESLint(Airbnb·hooks·a11y·tailwind·import-sort) + Prettier, Husky + lint-staged, MR 리뷰로 포맷 논의 최소화",
          "vite-plugin-html로 빌드 타임·캐시 버스트·GTag·MS Clarity 주입, Firebase Hosting 이원화 배포",
        ],
      },
      // {
      //   title: "i18n·AI·온보딩",
      //   items: [
      //     "i18next 기반 한국어·영어·태국어 및 언어 감지",
      //     "WinCL AI·EEIO 연동·useAiHook 기반 배출량 자동 산정 UI, Pro 플랜 신규 유저 대상 10단계 온보딩 튜토리얼",
      //   ],
      // },
      // {
      //   title: "성과",
      //   items: [
      //     "100+ 라우트를 선언형 메타데이터 단일 테이블로 통합 — 플랜·권한 정책 변경 시 한 곳 수정만으로 전 페이지에 반영되어 정책 변경 대응 공수 대폭 단축",
      //     "TanStack Query를 도메인별 API 모듈 20+개로 분리하고 Axios를 인증·업로드·다운로드·일반으로 다중화 — 캐시 키 충돌 제거, 토큰 갱신 로직을 인증 인스턴스에만 격리해 네트워크 레이어 유지보수성 확보",
      //     "도메인 단위 Zustand 슬라이스 약 30개로 전역 상태를 기능별 격리 — 리렌더 범위 최소화 및 스토어 의존성 가시화",
      //     "공용 컴포넌트 3계층(ui → common → 도메인) 재정비 — 신규 페이지 퍼블리싱 공수 체감 약 30% 단축, 디자인 시스템 변경 시 파급 범위 최소화",
      //     "Husky + lint-staged + GitLab MR 기반 코드 리뷰 정착 — 머지 전 포맷 관련 리뷰 코멘트를 사실상 0건으로 줄여 리뷰어가 비즈니스 로직에 집중할 수 있는 환경 구성",
      //     "차트·지도·테이블 등에 가상 스크롤·마커 클러스터링·메모이제이션 적용 — 대시보드 초기 렌더링 성능 안정화",
      //     "다국어(한·영·태) 대응과 온보딩 튜토리얼 구현 — 해외 고객 유입 및 Pro 플랜 신규 가입 전환율 상승에 기여",
      //   ],
      // },
    ],
  },
  {
    title: "WinCL GovFund",
    description:
      "중소기업용 정부지원·보조금·인증 정보 통합 SaaS — 공고·캘린더·지도·프로젝트·예산·경비·문서·리포트·구독까지 한 화면에서 관리",
    technologies: [
      { name: "React.js", label: "React 19" },
      { name: "typescript", label: "TypeScript" },
      { name: "Vite", label: "Vite 6" },
      { name: "tailwind css", label: "Tailwind CSS 4" },
      { name: "React Router", label: "React Router 7" },
      { name: "Recharts", label: "Recharts" },
      { name: "pdfjs-dist", label: "PDF.js" },
      { name: "xlsx", label: "SheetJS (xlsx)" },
      { name: "react-joyride", label: "react-joyride" },
      { name: "ESLint", label: "ESLint" },
      { name: "Vitest", label: "Vitest" },
      { name: "Azure", label: "Azure SWA / Functions" },
      { name: "GitHub Actions", label: "GitHub Actions" },
    ],
    details:
      "GovFund는 한국 중소기업이 정부지원사업·보조금·인증 등 지원 정보를 한곳에서 보고, 일정·내 프로젝트·경비·문서·리포트까지 관리할 수 있게 만든 웹 기반 통합 대시보드(SaaS)입니다. 공고 탐색, 캘린더, 지도형 뷰, 프로젝트·예산 플래너, 문서 생성, 뉴스·공지, 설정·구독·문의 등 B2B 업무 도구에 가까운 화면을 갖추고 있으며, 실서비스는 Azure Static Web Apps에 배포됩니다.",
    liveUrl: "https://www.govfund.io/login",
    coverImage: "/projects/wincl-govfund.png",
    detailSections: [
      {
        title: "라우팅·성능",
        items: [
          "로그인·랜딩은 즉시 로드하고, 대시보드·프로그램·캘린더·프로젝트 매니저 등 대부분 페이지는 React.lazy + Suspense로 코드 스플리팅해 초기 번들을 축소",
        ],
      },
      {
        title: "인증·레이아웃",
        items: [
          "RequireAuth로 비로그인 사용자를 로그인으로 유도, 공통 Layout 아래에서 앱 본문 구성",
          "인증·테마 등 전역 관심사는 Context API로 관리",
        ],
      },
      {
        title: "데이터·시각화·문서",
        items: [
          "대시보드·인사이트·리포트 등에서 Recharts로 지표·추이 표현",
          "PDF.js(pdfjs-dist)로 PDF 처리, SheetJS(xlsx)로 스프레드시트 기반 워크플로(경비·데이터 리포트 등) 지원",
          "react-joyride로 온보딩, API 연동 맥락에서 bcryptjs·JWT 활용",
        ],
      },
      {
        title: "제품 기능 범위(프론트)",
        items: [
          "프로그램 목록·매칭, 캘린더, 펀딩 맵, 내 프로젝트·과제, 보조금·인증, 예산 플래너, 경비·문서 생성, 데이터 리포트, 뉴스·공지·가이드, 설정·프로필·요금제·문의·약관 등 다수 화면·폼을 라우트 단위로 관리",
        ],
      },
      // {
      //   title: "품질·백엔드·운영",
      //   items: [
      //     "ESLint·Vitest로 품질 도구 구성",
      //     "백엔드는 Azure Functions v4(Node), Upstash Redis, GitHub Actions CI/CD",
      //     "dev / prod 브랜치별 배포(dev.govfund.io, www.govfund.io), README 기준 Node 20+, 로컬은 Vite와 Azure Functions Core Tools 병행 실행",
      //   ],
      // },
    ],
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
                {/* 프로젝트 커버 / 이니셜 */}
                <div className="relative h-40 bg-blue-50 overflow-hidden shrink-0">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} 서비스 화면`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-200">
                        {project.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
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
              <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl isolate">
                {/* 모달 헤더 — 스크롤 영역 밖에 두어 본문 이미지와 겹치지 않음 */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
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

                {/* 모달 바디 — 여기만 스크롤 */}
                <div className="min-h-0 flex-1 overflow-y-auto p-6 space-y-6">
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

                  {selectedProjectData.coverImage && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        스크린샷
                      </h3>
                      <div className="relative w-full aspect-video max-h-[min(420px,55vh)] rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        <Image
                          src={selectedProjectData.coverImage}
                          alt={`${selectedProjectData.title} 서비스 화면`}
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 896px) 100vw, 896px"
                        />
                      </div>
                    </div>
                  )}

                  {(selectedProjectData.liveUrl ||
                    selectedProjectData.githubUrl) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        링크
                      </h3>
                      <ul className="space-y-2 text-gray-600">
                        {selectedProjectData.liveUrl && (
                          <li>
                            <span className="text-gray-500 mr-2">서비스</span>
                            <a
                              href={selectedProjectData.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {selectedProjectData.liveUrl}
                            </a>
                          </li>
                        )}
                        {selectedProjectData.githubUrl && (
                          <li>
                            <span className="text-gray-500 mr-2">GitHub</span>
                            <a
                              href={selectedProjectData.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {selectedProjectData.githubUrl}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

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
                          ),
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
