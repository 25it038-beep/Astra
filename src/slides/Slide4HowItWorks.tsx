import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  QrCode,
  UserCheck,
  Eye,
  ShieldCheck,
  CreditCard,
  DoorOpen,
  ArrowRight,
  Lock,
  Plus,
  Minus,
  RotateCcw,
} from 'lucide-react';

interface SlideProps {
  isPlaying?: boolean;
}

interface TimelineStep {
  num: string;
  title: string;
  subtitle: string;
  technicalNote: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    num: '01',
    title: 'SCAN',
    subtitle: 'Customer scans QR',
    technicalNote: 'Dynamic QR at entrance turnstile binds mobile wallet & initiates session.',
    icon: QrCode,
  },
  {
    num: '02',
    title: 'ENTER',
    subtitle: 'Identity/session verified',
    technicalNote: 'Payment pre-authorization verified; turnstile unlocks for store access.',
    icon: UserCheck,
  },
  {
    num: '03',
    title: 'SHOP',
    subtitle: 'AI detects product interactions',
    technicalNote: 'YOLOv8n computer vision + smart shelf load cells track item pickups & returns.',
    icon: Eye,
  },
  {
    num: '04',
    title: 'VERIFY',
    subtitle: 'Final cart is validated',
    technicalNote: 'Sensor fusion engine reconciles visual trajectory and weight deltas before billing.',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'PAY',
    subtitle: 'Verified amount is captured',
    technicalNote: 'Exact verified cart total is captured from pre-authorized payment session.',
    icon: CreditCard,
  },
  {
    num: '06',
    title: 'EXIT',
    subtitle: 'Gate opens + receipt generated',
    technicalNote: 'Smart exit gate opens automatically and sends an itemized digital receipt.',
    icon: DoorOpen,
  },
];

interface CartItem {
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
}

const DEFAULT_CART: CartItem[] = [
  { id: 'milk', name: 'Milk', unitPrice: 30, qty: 2 },
  { id: 'bread', name: 'Bread', unitPrice: 45, qty: 1 },
  { id: 'chips', name: 'Chips', unitPrice: 20, qty: 2 },
];

export const Slide4HowItWorks: React.FC<SlideProps> = ({ isPlaying = true }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>(DEFAULT_CART);

  // Automatic video timeline sweep through 01 SCAN -> 06 EXIT and Payment Pipeline stages
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % TIMELINE_STEPS.length);
    }, 1900);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const totalAmount = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      )
    );
  };

  const resetCart = () => setCart(DEFAULT_CART);

  return (
    <div className="relative w-full h-full bg-[#0B0D10] bg-tech-grid overflow-hidden flex flex-col justify-between p-7 lg:p-10 select-none">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-3.5"
      >
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#36D9FF] font-semibold">
            04 / CUSTOMER JOURNEY
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
            Six Steps. <span className="text-[#36D9FF]">Zero Checkout Queue.</span>
          </h2>
        </div>

        <div className="text-xs font-mono text-[#A8B0BA]">
          SECURITY PROTOCOL:{' '}
          <span className="text-[#36D9FF] font-semibold">VERIFY → CAPTURE → EXIT</span>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="my-auto py-3 space-y-6">
        {/* TOP: Horizontal Timeline of 6 Numbered Cards connected with one continuous animated line */}
        <div className="relative">
          {/* Continuous Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[3px] bg-white/10 z-0 overflow-hidden rounded-full">
            <motion.div
              animate={{
                width: `${((activeStep + 1) / TIMELINE_STEPS.length) * 100}%`,
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#36D9FF] to-[#6C63FF]"
            />
          </div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {TIMELINE_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isSelected = activeStep === index;
              const isCompleted = index <= activeStep;
              return (
                <motion.button
                  key={step.num}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + index * 0.05 }}
                  onClick={() => setActiveStep(index)}
                  className={`text-left rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#12161C] border-[#36D9FF] shadow-[0_0_28px_rgba(54,217,255,0.2)] -translate-y-1'
                      : isCompleted
                      ? 'bg-[#12161C]/95 border-[#36D9FF]/40'
                      : 'bg-[#12161C]/90 border-white/[0.08] hover:border-[#36D9FF]/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span
                        className={`font-mono text-lg font-bold ${
                          isSelected ? 'text-[#36D9FF]' : 'text-white/80'
                        }`}
                      >
                        {step.num}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#36D9FF] text-[#0B0D10]'
                            : 'bg-[#0B0D10] text-[#36D9FF]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="font-display text-sm font-extrabold tracking-wide text-white">
                      {step.title}
                    </div>
                    <p className="text-xs text-[#A8B0BA] mt-1 leading-snug">
                      {step.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-[#36D9FF] truncate">
                    {isSelected ? '● ACTIVE NOW' : `STEP ${step.num} READY`}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Active Step Detail Strip */}
          <div className="mt-3 bg-[#12161C]/80 border border-white/[0.07] rounded-xl px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#36D9FF]">
                STEP {TIMELINE_STEPS[activeStep].num} ({TIMELINE_STEPS[activeStep].title}):
              </span>
              <span className="text-white">{TIMELINE_STEPS[activeStep].technicalNote}</span>
            </div>
            <span className="text-[11px] font-mono text-[#36D9FF]">
              LIVE SEQUENCE PLAYBACK
            </span>
          </div>
        </div>

        {/* BOTTOM: Premium Payment-Flow Card + Mini Billing Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Payment Authorization & Capture Flow (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="lg:col-span-7 bg-[#12161C] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#36D9FF] font-semibold">
                  AUTOMATED PAYMENT PIPELINE
                </span>
                <h3 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                  Final Amount Determined Before Payment Capture
                </h3>
              </div>

              {/* Security Label */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0D10] border border-[#36D9FF]/40 text-xs font-mono text-[#36D9FF] font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>VERIFY → CAPTURE → EXIT</span>
              </div>
            </div>

            {/* Horizontal / Flow Sequence of Payment Stages synced with activeStep */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-auto">
              {[
                { label: '01', name: 'PAYMENT AUTHORIZATION', sub: 'Session Token Bound' },
                { label: '02', name: 'SHOPPING SESSION', sub: 'AI Vision + Shelf IoT' },
                { label: '03', name: 'FINAL CART VERIFICATION', sub: 'Sensor Fusion Lock' },
                {
                  label: '04',
                  name: `₹${totalAmount}`,
                  sub: 'Exact Verified Amount',
                  highlight: true,
                },
                { label: '05', name: 'PAYMENT CAPTURE', sub: 'Instant Settlement' },
                { label: '06', name: 'EXIT OPEN', sub: 'Gate Unlocks + Receipt' },
              ].map((stage, idx) => {
                const isCurrentStage = activeStep === idx;
                return (
                  <div
                    key={stage.label}
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-xl p-3 border flex flex-col justify-between transition-all cursor-pointer ${
                      isCurrentStage
                        ? 'bg-[#36D9FF]/20 border-[#36D9FF] shadow-[0_0_20px_rgba(54,217,255,0.18)]'
                        : stage.highlight
                        ? 'bg-[#36D9FF]/10 border-[#36D9FF]/60 text-white'
                        : 'bg-[#0B0D10] border-white/[0.07]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#A8B0BA]">
                      <span>STAGE {stage.label}</span>
                      <ArrowRight
                        className={`w-3 h-3 ${
                          isCurrentStage ? 'text-white' : 'text-[#36D9FF]'
                        }`}
                      />
                    </div>
                    <div
                      className={`font-mono font-bold mt-1 ${
                        stage.highlight
                          ? 'text-xl text-[#36D9FF]'
                          : 'text-xs text-white leading-snug'
                      }`}
                    >
                      {stage.name}
                    </div>
                    <div className="text-[11px] text-[#A8B0BA] mt-0.5">{stage.sub}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-[#A8B0BA]">
              <span>PRE-AUTH PREVENTS UNPAID EXIT</span>
              <span className="text-white">FINAL CAPTURE: ₹{totalAmount}</span>
            </div>
          </motion.div>

          {/* Mini Billing Table (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.26 }}
            className="lg:col-span-5 bg-[#12161C] border border-[#36D9FF]/30 rounded-2xl p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono text-[#36D9FF] font-semibold">
                    LIVE VIRTUAL CART LEDGER
                  </span>
                  <h3 className="font-display text-base font-bold text-white">
                    Mini Billing Table
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={resetCart}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0B0D10] hover:bg-white/[0.06] border border-white/10 text-[11px] font-mono text-[#A8B0BA] hover:text-white transition-colors cursor-pointer"
                  title="Reset to canonical ₹145 demo preset"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ₹145</span>
                </button>
              </div>

              {/* Billing Rows */}
              <div className="space-y-2">
                {cart.map((item, idx) => {
                  const lineTotal = item.unitPrice * item.qty;
                  const isRowHighlighted = activeStep % 3 === idx;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between bg-[#0B0D10] border rounded-xl px-3.5 py-2.5 font-mono text-xs transition-colors ${
                        isRowHighlighted
                          ? 'border-[#36D9FF]/50'
                          : 'border-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">{item.name}</span>
                        <span className="text-[#A8B0BA]">× {item.qty}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, -1)}
                            className="w-5 h-5 rounded bg-[#12161C] hover:bg-white/10 text-[#A8B0BA] hover:text-white flex items-center justify-center cursor-pointer"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            className="w-5 h-5 rounded bg-[#12161C] hover:bg-white/10 text-[#A8B0BA] hover:text-white flex items-center justify-center cursor-pointer"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-white font-bold w-12 text-right">
                          ₹{lineTotal}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOTAL Footer */}
            <div className="mt-4 pt-3 border-t border-white/[0.1] flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-[#A8B0BA] uppercase">
                  TOTAL VERIFIED AMOUNT
                </div>
                <div className="text-[11px] font-mono text-[#36D9FF]">
                  VERIFY → CAPTURE → EXIT
                </div>
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#36D9FF]">
                ₹{totalAmount}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Summary Strip */}
      <div className="pt-2.5 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A8B0BA]">
        <div>
          BILLING FORMULA:{' '}
          <span className="text-white">
            Milk × 2 (₹60) + Bread × 1 (₹45) + Chips × 2 (₹40) = ₹145
          </span>
        </div>
        <div>
          RECEIPT DELIVERY: <span className="text-[#36D9FF]">INSTANT MOBILE NOTIFICATION</span>
        </div>
      </div>
    </div>
  );
};
