type Props = {
  index: string;
  title: string;
  subtitle?: string;
};

/** 섹션 머리: 얇은 선 + 번호 + 큰 영문 제목 + 한글 설명 */
export default function SectionHeader({ index, title, subtitle }: Props) {
  return (
    <div className="mb-14">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-display text-sm font-medium text-blue-600">
          {index}
        </span>
        <span className="h-px flex-1 bg-gray-900/20" />
      </div>
      <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-gray-900 md:text-7xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}
