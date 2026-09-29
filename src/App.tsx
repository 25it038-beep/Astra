import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Presentation,
  Play,
  Pause,
  Repeat,
  FastForward,
} from 'lucide-react';
import { Slide1Hero } from './slides/Slide1Hero';
import { Slide2ProblemSolution } from './slides/Slide2ProblemSolution';
import { Slide3Architecture } from './slides/Slide3Architecture';
import { Slide4HowItWorks } from './slides/Slide4HowItWorks';
import { Slide5ImpactFuture } from './slides/Slide5ImpactFuture';

interface SlideMeta {
  index: number;
  navLabel: string;
  question: string;
  title: string;
}

const SLIDES_META: SlideMeta[] = [
  {
    index: 0,
    navLabel: '01. Hero',
    question: 'What are we building?',
    title: 'AI-Powered 24/7 Autonomous Cashierless Smart Store',
  },
  {
    index: 1,
    navLabel: '02. Problem & Solution',
    question: 'Why is it needed?',
    title: 'Manual Retail Checkout vs. Autonomous Self-Operating Store',
  },
  {
    index: 2,
    navLabel: '03. Architecture',
    question: 'How does it work technically?',
    title: 'Multi-Modal IoT Sensor Fusion & Computer Vision Architecture',
  },
  {
    index: 3,
    navLabel: '04. Customer Journey',
    question: 'How does a customer use it?',
    title: 'Six Steps. Zero Checkout Queue & Pre-Verified Payment Capture',
  },
  {
    index: 4,
    navLabel: '05. Impact & Future',
    question: 'What is the impact and where can it go?',
    title: 'Operational Impact, Engineering Reality & Autonomous Roadmap',
  },
];

const SLIDE_DURATION_MS = 12000; // 12 seconds per slide in full video presentation mode

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'stage' | 'deck'>('stage');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [autoAdvanceSlides, setAutoAdvanceSlides] = useState<boolean>(true);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  const goToSlide = useCallback(
    (targetIdx: number) => {
      setDirection(targetIdx >= currentSlide ? 1 : -1);
      setCurrentSlide(targetIdx);
      setSlideProgress(0);
    },
    [currentSlide]
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES_META.length);
    setSlideProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES_META.length) % SLIDES_META.length);
    setSlideProgress(0);
  }, []);

  // Video timeline progress ticker
  useEffect(() => {
    if (!isPlaying || viewMode !== 'stage') return;
    const tickMs = 100;
    const increment = (tickMs / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev + increment >= 100) {
          if (autoAdvanceSlides) {
            setDirection(1);
            setCurrentSlide((s) => (s + 1) % SLIDES_META.length);
          }
          return 0;
        }
        return prev + increment;
      });
    }, tickMs);

    return () => clearInterval(timer);
  }, [isPlaying, autoAdvanceSlides, viewMode]);

  // Keyboard shortcuts (Arrow keys, Space to Play/Pause video, 1-5 slide jump)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'stage') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        goToSlide(Number(e.key) - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, nextSlide, prevSlide, goToSlide]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setIsFullscreen((prev) => !prev);
    }
  };

  const renderSlideContent = (index: number) => {
    switch (index) {
      case 0:
        return <Slide1Hero onNavigate={(idx) => goToSlide(idx)} isPlaying={isPlaying} />;
      case 1:
        return <Slide2ProblemSolution isPlaying={isPlaying} />;
      case 2:
        return <Slide3Architecture isPlaying={isPlaying} />;
      case 3:
        return <Slide4HowItWorks isPlaying={isPlaying} />;
      case 4:
        return <Slide5ImpactFuture isPlaying={isPlaying} />;
      default:
        return <Slide1Hero onNavigate={(idx) => goToSlide(idx)} isPlaying={isPlaying} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white flex flex-col justify-between">
      {/* Top Bar Contract: Zone 1 (Single text wordmark) — Zone 2 (5 nav links) — Zone 3 (2 actions) */}
      <header className="no-print flex items-center justify-between px-6 py-3.5 bg-[#0B0D10]/95 border-b border-white/[0.08] sticky top-0 z-50 backdrop-blur-md">
        <a
          href="#slide-1"
          onClick={(e) => {
            e.preventDefault();
            goToSlide(0);
          }}
          className="font-display text-base font-bold tracking-tight text-white hover:text-[#36D9FF] transition-colors whitespace-nowrap"
        >
          Autonomous Smart Store
        </a>

        <nav
          className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#A8B0BA]"
          aria-label="Slide Navigation"
        >
          {SLIDES_META.map((slide) => {
            const isActive = currentSlide === slide.index && viewMode === 'stage';
            return (
              <button
                key={slide.index}
                type="button"
                onClick={() => {
                  goToSlide(slide.index);
                  setViewMode('stage');
                }}
                className={`py-1 transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                  isActive
                    ? 'text-white border-[#36D9FF] font-semibold'
                    : 'border-transparent hover:text-white'
                }`}
              >
                {slide.navLabel}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setViewMode((m) => (m === 'stage' ? 'deck' : 'stage'))}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#12161C] border border-white/10 rounded-lg hover:border-[#36D9FF]/50 transition-colors whitespace-nowrap cursor-pointer"
          >
            {viewMode === 'stage' ? (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-[#36D9FF]" />
                <span>All 5 Slides</span>
              </>
            ) : (
              <>
                <Presentation className="w-3.5 h-3.5 text-[#36D9FF]" />
                <span>16:9 Stage</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#0B0D10] bg-[#36D9FF] rounded-lg hover:bg-[#36D9FF]/90 transition-colors whitespace-nowrap cursor-pointer"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Present Video</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Presentation Stage or Full Deck Scroll View */}
      {viewMode === 'stage' ? (
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-4">
          {/* 16:9 Widescreen Canva Video Presentation Canvas */}
          <div className="relative w-full max-w-[1380px] xl:aspect-video min-h-[640px] bg-[#0B0D10] border border-white/[0.12] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 48 : -48, scale: 0.985 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction > 0 ? -48 : 48, scale: 0.985 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex-1 flex flex-col"
              >
                {renderSlideContent(currentSlide)}
              </motion.div>
            </AnimatePresence>

            {/* Continuous Video Timeline Progress Bar along bottom edge of 16:9 frame */}
            <div className="no-print w-full h-1 bg-white/[0.07] grid grid-cols-5 gap-0.5">
              {SLIDES_META.map((s) => {
                let widthPct = 0;
                if (s.index < currentSlide) widthPct = 100;
                else if (s.index === currentSlide) widthPct = slideProgress;
                return (
                  <div
                    key={s.index}
                    onClick={() => goToSlide(s.index)}
                    className="h-full bg-white/[0.06] overflow-hidden cursor-pointer"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#36D9FF] to-[#6C63FF] transition-all duration-100"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Video Transport & Presenter Bar */}
          <div className="no-print w-full max-w-[1380px] mt-3 flex flex-wrap items-center justify-between gap-4 px-2 text-xs">
            {/* Left: Video Play/Pause & Auto-Advance Controls */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#36D9FF] text-[#0B0D10] font-semibold hover:bg-[#36D9FF]/90 transition-colors cursor-pointer whitespace-nowrap"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause Video</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Play Video</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setAutoAdvanceSlides((a) => !a)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] transition-colors cursor-pointer whitespace-nowrap ${
                  autoAdvanceSlides
                    ? 'bg-[#12161C] border-[#36D9FF]/50 text-[#36D9FF]'
                    : 'bg-[#12161C] border-white/10 text-[#A8B0BA] hover:text-white'
                }`}
                title="Toggle between automatic 5-slide video playback or looping current slide animations"
              >
                {autoAdvanceSlides ? (
                  <>
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Auto-Advance Deck: ON</span>
                  </>
                ) : (
                  <>
                    <Repeat className="w-3.5 h-3.5" />
                    <span>Loop Current Slide</span>
                  </>
                )}
              </button>

              <div className="hidden md:flex items-center gap-2 text-[#A8B0BA] pl-2">
                <span className="font-mono text-[#36D9FF] font-semibold">
                  0{currentSlide + 1} / 05
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-white font-medium">
                  {SLIDES_META[currentSlide].question}
                </span>
              </div>
            </div>

            {/* Right: Manual Slide Step Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#12161C] hover:bg-white/[0.08] border border-white/10 text-white transition-colors cursor-pointer whitespace-nowrap"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 text-[#36D9FF]" />
                <span>Prev</span>
              </button>

              {/* Slide Chapter Pills */}
              <div className="flex items-center gap-1.5 px-2">
                {SLIDES_META.map((s) => (
                  <button
                    key={s.index}
                    type="button"
                    onClick={() => goToSlide(s.index)}
                    aria-label={`Go to slide ${s.index + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === s.index
                        ? 'w-6 bg-[#36D9FF]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#12161C] hover:bg-white/[0.08] border border-white/10 text-white transition-colors cursor-pointer whitespace-nowrap"
                aria-label="Next slide"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4 text-[#36D9FF]" />
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 max-w-[1380px] w-full mx-auto px-4 sm:px-8 py-8 space-y-10">
          {SLIDES_META.map((slide) => (
            <section
              key={slide.index}
              className="slide-frame space-y-2"
              aria-label={`Slide ${slide.index + 1}: ${slide.title}`}
            >
              <div className="no-print flex items-center justify-between text-xs font-mono text-[#A8B0BA] px-1">
                <div>
                  <span className="text-[#36D9FF] font-semibold">
                    SLIDE 0{slide.index + 1}
                  </span>{' '}
                  · <span className="text-white">{slide.question}</span> — {slide.title}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    goToSlide(slide.index);
                    setViewMode('stage');
                  }}
                  className="text-[#36D9FF] hover:underline cursor-pointer"
                >
                  Open in 16:9 Video Stage →
                </button>
              </div>
              <div className="w-full xl:aspect-video min-h-[640px] bg-[#0B0D10] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                {renderSlideContent(slide.index)}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}
