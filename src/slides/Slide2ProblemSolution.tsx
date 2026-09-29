import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  UserCheck,
  ScanBarcode,
  Clock,
  CalendarOff,
  ClipboardList,
  QrCode,
  ShieldCheck,
  Eye,
  ShoppingCart,
  CreditCard,
  DoorOpen,
  ArrowDown,
  CheckCircle2,
} from 'lucide-react';

interface SlideProps {
  isPlaying?: boolean;
}

interface ProblemItem {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  impactDetail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROBLEMS: ProblemItem[] = [
  {
    id: 'cashiers',
    title: 'Cashiers',
    subtitle: 'Manual billing dependency',
    metric: 'High Labor Overhead',
    impactDetail: 'Requires continuous human staffing per lane, increasing operational cost and human billing errors.',
    icon: UserCheck,
  },
  {
    id: 'scanning',
    title: 'Scanning',
    subtitle: 'Product-by-product scanning',
    metric: '4–8 sec / SKU',
    impactDetail: 'Every barcode must be manually aligned and scanned at the POS terminal, creating a serial bottleneck.',
    icon: ScanBarcode,
  },
  {
    id: 'queues',
    title: 'Queues',
    subtitle: 'Customers wait at checkout',
    metric: '68% Cart Abandonment Trigger',
    impactDetail: 'Peak-hour congestion degrades customer experience and limits store throughput.',
    icon: Clock,
  },
  {
    id: 'hours',
    title: 'Fixed Hours',
    subtitle: 'Limited store availability',
    metric: 'Closed 8–10 hrs / day',
    impactDetail: 'Overnight operation is economically unviable with manual staff, forfeiting 24/7 neighborhood demand.',
    icon: CalendarOff,
  },
  {
    id: 'inventory',
    title: 'Inventory',
    subtitle: 'Manual monitoring',
    metric: 'Delayed Stock Visibility',
    impactDetail: 'Shelf stockouts and misplaced items remain undetected until periodic manual shelf audits.',
    icon: ClipboardList,
  },
];

interface JourneyStep {
  id: string;
  code: string;
  title: string;
  techKeyword: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SOLUTION_STEPS: JourneyStep[] = [
  {
    id: 'qr',
    code: '01',
    title: 'QR ENTRY',
    techKeyword: 'IoT Gate',
    desc: 'Customer scans dynamic QR code at the entrance turnstile',
    icon: QrCode,
  },
  {
    id: 'auth',
    code: '02',
    title: 'AUTHENTICATE',
    techKeyword: 'Pre-Auth Session',
    desc: 'Identity and payment session verified in real time',
    icon: ShieldCheck,
  },
  {
    id: 'track',
    code: '03',
    title: 'AI TRACKING',
    techKeyword: 'Computer Vision + Sensor Fusion',
    desc: 'Multi-camera vision and smart shelf sensors detect interactions',
    icon: Eye,
  },
  {
    id: 'cart',
    code: '04',
    title: 'VIRTUAL CART',
    techKeyword: 'Automation',
    desc: 'Picked items synchronize automatically to the active digital cart',
    icon: ShoppingCart,
  },
  {
    id: 'pay',
    code: '05',
    title: 'AUTO PAYMENT',
    techKeyword: 'Payment',
    desc: 'Verified cart total is captured without POS terminals',
    icon: CreditCard,
  },
  {
    id: 'exit',
    code: '06',
    title: 'SMART EXIT',
    techKeyword: '24/7 Autonomous',
    desc: 'Exit gate unlocks automatically with instant digital receipt',
    icon: DoorOpen,
  },
];

export const Slide2ProblemSolution: React.FC<SlideProps> = ({ isPlaying = true }) => {
  const [selectedProblemIdx, setSelectedProblemIdx] = useState<number>(0);
  const [activeJourneyStep, setActiveJourneyStep] = useState<number>(0);

  // Automatic video choreography cycling through Problem cards & Solution vertical pipeline
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveJourneyStep((prev) => (prev + 1) % SOLUTION_STEPS.length);
      setSelectedProblemIdx((prev) => (prev + 1) % PROBLEMS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full bg-[#0B0D10] bg-tech-grid overflow-hidden flex flex-col justify-between p-7 lg:p-10 select-none">
      {/* Top Slide Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between border-b border-white/[0.07] pb-3.5 text-xs font-mono text-[#A8B0BA]"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#36D9FF] font-semibold">SLIDE 02 / 05</span>
          <span aria-hidden="true">·</span>
          <span>PARADIGM SHIFT: MANUAL POS VS. AUTONOMOUS RETAIL</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>KEY TECHNOLOGIES:</span>
          <span className="text-white">AI</span>
          <span>·</span>
          <span className="text-white">Computer Vision</span>
          <span>·</span>
          <span className="text-white">IoT</span>
          <span>·</span>
          <span className="text-[#36D9FF]">Automation</span>
        </div>
      </motion.div>

      {/* Main Split-Screen Canva Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto py-4 items-stretch">
        {/* LEFT SIDE: 01 / THE PROBLEM */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-6 bg-[#12161C]/90 border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#A8B0BA] mb-2">
              01 / THE PROBLEM
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-5"
              style={{ textWrap: 'balance' }}
            >
              Retail Checkout Still Depends on{' '}
              <span className="text-[#A8B0BA] underline decoration-white/20 underline-offset-4">
                Manual Operations
              </span>
            </h2>

            {/* 5 Elegant Icon Cards */}
            <div className="space-y-2.5">
              {PROBLEMS.map((item, idx) => {
                const Icon = item.icon;
                const isSelected = selectedProblemIdx === idx;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.12 + idx * 0.06 }}
                    onClick={() => setSelectedProblemIdx(idx)}
                    className={`w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#0B0D10] border-white/30 shadow-md'
                        : 'bg-[#0B0D10]/60 border-white/[0.06] hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#12161C] border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-[#A8B0BA]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm font-bold text-white">
                            {item.title}
                          </span>
                          <span className="text-xs text-[#A8B0BA]">·</span>
                          <span className="text-xs text-[#A8B0BA] font-medium">
                            {item.subtitle}
                          </span>
                        </div>
                        {isSelected && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="text-xs text-[#A8B0BA]/90 mt-1.5 leading-relaxed"
                          >
                            {item.impactDetail}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-[#A8B0BA] shrink-0 pt-0.5">
                      {item.metric}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#A8B0BA]">
            <span>LEGACY BOTTLENECK: SERIAL HUMAN CHECKOUT</span>
            <span>AUTO-SCANNING BOTTLENECKS</span>
          </div>
        </motion.div>

        {/* RIGHT SIDE: 02 / OUR SOLUTION */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="lg:col-span-6 bg-[#12161C] border border-[#36D9FF]/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-15 blur-[80px]"
            style={{ background: 'radial-gradient(circle, #36D9FF 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#36D9FF] font-semibold">
                02 / OUR SOLUTION
              </span>
              <span className="text-xs font-mono text-[#36D9FF]">
                STEP 0{activeJourneyStep + 1} / 06 ACTIVE
              </span>
            </div>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-5"
              style={{ textWrap: 'balance' }}
            >
              A Store That <span className="text-[#36D9FF]">Operates Itself</span>
            </h2>

            {/* Large Vertical Customer Journey with Connected Glowing Lines */}
            <div className="relative pl-4 space-y-2">
              {/* Vertical Glowing Connector Line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-white/10 overflow-hidden">
                <motion.div
                  animate={{
                    y: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-full h-1/2 bg-gradient-to-b from-transparent via-[#36D9FF] to-[#6C63FF]"
                />
              </div>

              {SOLUTION_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeJourneyStep === index;
                const isPassed = index <= activeJourneyStep;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.16 + index * 0.06 }}
                    className="relative flex items-center gap-3.5"
                  >
                    {/* Connected Node Circle */}
                    <button
                      type="button"
                      onClick={() => setActiveJourneyStep(index)}
                      className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-[#36D9FF] text-[#0B0D10] ring-4 ring-[#36D9FF]/25 scale-110'
                          : isPassed
                          ? 'bg-[#36D9FF]/25 text-[#36D9FF] border border-[#36D9FF]'
                          : 'bg-[#0B0D10] text-[#A8B0BA] border border-white/20'
                      }`}
                    >
                      <span className="text-[10px] font-mono font-bold">{step.code}</span>
                    </button>

                    {/* Journey Card */}
                    <button
                      type="button"
                      onClick={() => setActiveJourneyStep(index)}
                      className={`flex-1 text-left rounded-xl px-4 py-2.5 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-[#0B0D10] border-[#36D9FF] shadow-[0_0_20px_rgba(54,217,255,0.16)]'
                          : 'bg-[#0B0D10]/60 border-white/[0.07] hover:border-[#36D9FF]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-[#36D9FF]' : 'text-[#A8B0BA]'
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-xs sm:text-sm font-bold tracking-wide text-white">
                              {step.title}
                            </span>
                            {index < SOLUTION_STEPS.length - 1 && (
                              <ArrowDown className="w-3 h-3 text-[#36D9FF]/60 inline" />
                            )}
                          </div>
                          <p className="text-xs text-[#A8B0BA]">{step.desc}</p>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono text-[#36D9FF] shrink-0 hidden sm:inline">
                        {step.techKeyword}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Statement inside Solution Panel */}
          <div className="relative z-10 mt-5 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <blockquote className="font-display text-lg font-bold text-white tracking-tight">
                “Scan. Shop. Pay. Exit.”
              </blockquote>
              <p className="text-xs text-[#A8B0BA]">
                A 24/7 autonomous retail environment powered by{' '}
                <span className="text-white font-medium">AI</span>,{' '}
                <span className="text-white font-medium">computer vision</span> and{' '}
                <span className="text-white font-medium">IoT</span>.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#36D9FF] shrink-0">
              <CheckCircle2 className="w-4 h-4" />
              <span>AUTONOMOUS LOOP</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Comparison Summary Bar */}
      <div className="pt-3 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A8B0BA]">
        <div>
          TRADITIONAL POS: <span className="text-white">3–5 MIN QUEUE WAIT</span> → SMART STORE:{' '}
          <span className="text-[#36D9FF] font-semibold">0 SEC WALK-OUT</span>
        </div>
        <div>
          STORE AVAILABILITY: <span className="text-[#36D9FF] font-semibold">24/7 UNATTENDED</span>
        </div>
      </div>
    </div>
  );
};
