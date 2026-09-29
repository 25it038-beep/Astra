import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  Zap,
  BarChart3,
  FileText,
  Globe,
  AlertTriangle,
  ArrowDown,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SlideProps {
  isPlaying?: boolean;
}

const IMPACT_ITEMS = [
  {
    title: '24/7',
    subtitle: 'Continuous operation',
    icon: Clock,
  },
  {
    title: 'FASTER',
    subtitle: 'Reduced checkout waiting',
    icon: Zap,
  },
  {
    title: 'SMARTER',
    subtitle: 'Real-time inventory',
    icon: BarChart3,
  },
  {
    title: 'DIGITAL',
    subtitle: 'Automatic receipts',
    icon: FileText,
  },
  {
    title: 'SCALABLE',
    subtitle: 'Multi-store management',
    icon: Globe,
  },
];

const CHALLENGE_ITEMS = [
  {
    title: 'Vision',
    subtitle: 'Occlusion & recognition',
    mitigation: 'Mitigated via multi-angle overhead RGB-D cameras & shelf weight cross-check.',
  },
  {
    title: 'Sensors',
    subtitle: 'Calibration & reliability',
    mitigation: 'Auto-zeroing load cell firmware compensates for temperature & drift.',
  },
  {
    title: 'Network',
    subtitle: 'Connectivity failures',
    mitigation: 'Local edge inference buffers cart state during cloud link interruptions.',
  },
  {
    title: 'Payment',
    subtitle: 'Transaction failures',
    mitigation: 'Entry QR requires pre-authorized wallet hold prior to turnstile unlock.',
  },
  {
    title: 'Security',
    subtitle: 'Privacy & cybersecurity',
    mitigation: 'Pose-only skeletal tracking (no facial biometrics stored) + TLS 1.3.',
  },
];

const ROADMAP_ITEMS = [
  {
    stage: 'NOW',
    title: 'Prototype Store',
    detail: 'Single-aisle CV + load cell fusion with QR gate & automated payment.',
  },
  {
    stage: 'NEXT',
    title: 'Edge AI + Sensor Fusion',
    detail: 'On-premise TensorRT inference for sub-100ms multi-customer tracking.',
  },
  {
    stage: 'FUTURE',
    title: 'AI Anomaly Detection',
    detail: 'Automated detection of misplaced stock, spills, and shelf tampering.',
  },
  {
    stage: 'SCALE',
    title: 'Autonomous Inventory',
    detail: 'Predictive supplier restocking triggered by real-time shelf depletion.',
  },
  {
    stage: 'VISION',
    title: 'Robotic Store Management',
    detail: 'Autonomous mobile robots (AMRs) for overnight shelf replenishment.',
  },
];

const IEEE_REFERENCES = [
  '[1] Amazon Web Services, “Just Walk Out Technology,” AWS, 2026.',
  '[2] Amazon, “How generative AI helps Amazon eliminate checkout lines and revolutionize shopping,” Amazon News, 2023.',
  '[3] “Intelligent Retail Shelf Management Using Transfer Learning and YOLOv8n,” 2026 World Conference on Computational Science and Technology (WcCST), IEEE, 2026, DOI: 10.1109/WcCST67302.2026.11496329.',
  '[4] “Next-Generation Smart Cart System using RFID and Artificial Intelligence,” 2026 4th International Conference on Sustainable Computing and Smart Systems (ICSCSS), IEEE, 2026, DOI: 10.1109/ICSCSS69635.2026.11646159.',
  '[5] “RFID And Ultrasonic Sensor based Dualmodule Inventory Management System with Two Layer Scrutiny,” 2025 Third International Conference on Emerging Applications of Material Science and Technology (ICEAMST), IEEE, 2025, DOI: 10.1109/ICEAMST67459.2025.11336099.',
  '[6] Amazon Web Services, “Amazon’s Just Walk Out technology,” AWS, 2024.',
];

export const Slide5ImpactFuture: React.FC<SlideProps> = ({ isPlaying = true }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showAllRefs, setShowAllRefs] = useState<boolean>(true);

  // Automatic video progression through Impact, Challenges, and Future Roadmap rows
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 2100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full bg-[#0B0D10] bg-tech-grid overflow-hidden flex flex-col justify-between p-6 lg:p-9 select-none">
      {/* Top Three-Column Canva Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* COLUMN 1: IMPACT (4 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="lg:col-span-4 bg-[#12161C]/90 border border-white/[0.08] rounded-2xl p-4.5 flex flex-col justify-between"
        >
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#36D9FF] font-semibold">
              IMPACT
            </div>
            <h2 className="font-display text-xl font-bold text-white tracking-tight mt-0.5 mb-3.5">
              Why It Matters
            </h2>

            <div className="space-y-2">
              {IMPACT_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={item.title}
                    onClick={() => setActiveIndex(idx)}
                    className={`bg-[#0B0D10] border rounded-xl px-3.5 py-2.5 flex items-center gap-3 transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#36D9FF] shadow-[0_0_16px_rgba(54,217,255,0.16)]'
                        : 'border-white/[0.07]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#12161C] border border-[#36D9FF]/30 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#36D9FF]" />
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-white tracking-wide">
                        {item.title}
                      </div>
                      <div className="text-xs text-[#A8B0BA]">{item.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* COLUMN 2: CHALLENGES — Engineering Reality (4 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="lg:col-span-4 bg-[#12161C]/90 border border-white/[0.08] rounded-2xl p-4.5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-amber-400 font-semibold">
                CHALLENGES
              </span>
              <span className="text-[10px] font-mono text-[#A8B0BA]">
                ENGINEERING REALITY
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-white tracking-tight mt-0.5 mb-3.5">
              Engineering Reality
            </h2>

            <div className="space-y-2">
              {CHALLENGE_ITEMS.map((item, idx) => {
                const isSelected = activeIndex === idx;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left bg-[#0B0D10] rounded-xl px-3.5 py-2 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-400/70 shadow-sm'
                        : 'border-white/[0.07] hover:border-amber-400/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="font-display text-xs font-bold text-white">
                          {item.title}
                        </span>
                        <span className="text-xs text-[#A8B0BA]">· {item.subtitle}</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400/90">
                        WARN
                      </span>
                    </div>
                    {isSelected && (
                      <p className="text-[11px] text-[#A8B0BA] mt-1.5 pl-6 leading-snug">
                        {item.mitigation}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* COLUMN 3: FUTURE — Vertical Roadmap (4 Cols) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="lg:col-span-4 bg-[#12161C]/90 border border-[#6C63FF]/35 rounded-2xl p-4.5 flex flex-col justify-between"
        >
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#6C63FF] font-semibold">
              FUTURE
            </div>
            <h2 className="font-display text-xl font-bold text-white tracking-tight mt-0.5 mb-3.5">
              Where It Can Go
            </h2>

            <div className="relative pl-3 space-y-2">
              <div className="absolute left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#36D9FF] to-[#6C63FF]" />
              {ROADMAP_ITEMS.map((step, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={step.stage}
                    onClick={() => setActiveIndex(idx)}
                    className="relative flex items-center gap-3 cursor-pointer"
                  >
                    <div
                      className={`relative z-10 w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                        isActive
                          ? 'bg-[#36D9FF] border-[#36D9FF] ring-4 ring-[#36D9FF]/25'
                          : 'bg-[#0B0D10] border-[#36D9FF]'
                      }`}
                    />
                    <div
                      className={`flex-1 bg-[#0B0D10] border rounded-xl px-3 py-1.5 flex items-center justify-between gap-2 transition-all ${
                        isActive
                          ? 'border-[#36D9FF] shadow-[0_0_16px_rgba(54,217,255,0.16)]'
                          : 'border-white/[0.07]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-bold text-[#36D9FF]">
                            {step.stage}
                          </span>
                          <span className="text-xs font-semibold text-white">
                            {step.title}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#A8B0BA] truncate max-w-[220px]">
                          {step.detail}
                        </p>
                      </div>
                      {idx < ROADMAP_ITEMS.length - 1 && (
                        <ArrowDown className="w-3 h-3 text-[#6C63FF] shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* FINAL STATEMENT Banner Across the Entire Slide */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="my-2.5 bg-gradient-to-r from-[#12161C] via-[#161D26] to-[#12161C] border border-[#36D9FF]/40 rounded-2xl px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            “SCAN. SHOP. PAY. EXIT.”
          </h3>
          <p className="text-xs text-[#A8B0BA] mt-0.5">
            <span className="text-[#36D9FF] font-semibold">AI</span> +{' '}
            <span className="text-[#36D9FF] font-semibold">IoT</span> +{' '}
            <span className="text-[#36D9FF] font-semibold">Computer Vision</span> for
            next-generation autonomous retail.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-[#A8B0BA]">
          <div className="text-white font-semibold">Harshan Seliyan B. S.</div>
          <div>Information Technology · RMK Engineering College</div>
        </div>
      </motion.div>

      {/* IEEE-Style References Section at the Bottom of Slide 5 */}
      <div className="bg-[#12161C]/90 border border-white/[0.07] rounded-xl px-4 py-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#36D9FF] font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>IEEE REFERENCES</span>
          </div>
          <button
            type="button"
            onClick={() => setShowAllRefs((prev) => !prev)}
            className="inline-flex items-center gap-1 text-[10px] font-mono text-[#A8B0BA] hover:text-white cursor-pointer"
          >
            <span>{showAllRefs ? 'Compact View' : 'Show All 6 Citations'}</span>
            {showAllRefs ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {showAllRefs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-[10px] text-[#A8B0BA] leading-snug font-sans">
            {IEEE_REFERENCES.map((ref) => (
              <div key={ref} className="truncate" title={ref}>
                {ref}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[10px] text-[#A8B0BA] font-mono">
            [1] AWS Just Walk Out (2026) · [2] Amazon Generative AI Retail (2023) · [3] YOLOv8n Smart Shelf IEEE WcCST (2026) · [4] Smart Cart RFID & AI IEEE ICSCSS (2026) · [5] Dualmodule Inventory IEEE ICEAMST (2025) · [6] AWS (2024)
          </div>
        )}
      </div>
    </div>
  );
};
