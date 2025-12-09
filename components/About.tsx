"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Coffee, Heart, Rocket } from "lucide-react";

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
            <div className="relative w-full h-96 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center">
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">👨‍💻</div>
                <p className="text-gray-700 text-lg">개발자</p>
              </div>
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
      </div>
    </section>
  );
}
