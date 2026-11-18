import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-900/15 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1 text-sm text-gray-600">
          <p className="flex items-center gap-2 font-display text-base font-bold text-gray-900">
            <span className="inline-block size-2.5 rounded-sm bg-blue-600" />
            HYEONTAE KIM
          </p>
          <a href="mailto:cesc231@naver.com" className="block hover:text-blue-600">
            cesc231@naver.com
          </a>
          <a
            href="https://github.com/HyeontaeKim0"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-blue-600"
          >
            github.com/HyeontaeKim0
          </a>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex gap-4 text-gray-600">
            <a
              href="https://github.com/HyeontaeKim0"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-600"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/현태-김-8898062ab"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-blue-600"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:cesc231@naver.com"
              className="transition-colors hover:text-blue-600"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
          <p className="font-display text-xs uppercase tracking-wide text-gray-400">
            © 2026 Kim Hyeontae
          </p>
        </div>
      </div>
    </footer>
  );
}
