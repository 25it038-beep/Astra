import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Scale,
  Radio,
  Cpu,
  ShoppingCart,
  Receipt,
  CreditCard,
  DoorOpen,
  FileCheck2,
  ArrowDown,
} from 'lucide-react';

interface SlideProps {
  isPlaying?: boolean;
}

interface CoreComponent {
  code: string;
  name: string;
  layer: string;
  spec: string;
}

const CORE_COMPONENTS: CoreComponent[] = [
  {
    code: '01',
    name: 'QR Authentication',
    layer: 'Entry Access Control',
    spec: 'Dynamic JWT session token verifies user identity & pre-authorizes wallet at turnstile.',
  },
  {
    code: '02',
    name: 'Computer Vision',
    layer: 'YOLOv8n Transfer Learning',
    spec: 'Multi-camera overhead tracking detects customer pose and shelf hand interactions.',
  },
  {
    code: '03',
    name: 'Smart Shelves',
    layer: 'Load Cell Array',
    spec: 'Precision strain-gauge weight sensors detect gram-level item removal or replacement.',
  },
  {
    code: '04',
    name: 'RFID*',
    layer: 'Selective Tag Reader',
    spec: 'UHF/HF tag verification for high-value or visually similar item categories.',
  },
  {
    code: '05',
    name: 'AI Cart Engine',
    layer: 'Sensor Fusion Core',
    spec: 'Combines vision confidence + weight delta to maintain an accurate live virtual cart.',
  },
  {
    code: '06',
    name: 'Product Database',
    layer: 'Real-Time SKU Ledger',
    spec: 'Stores unit weights, pricing, visual embeddings, and live shelf stock counts.',
  },
  {
    code: '07',
    name: 'Payment Gateway',
    layer: 'Automated Settlement',
    spec: 'Captures verified cart amount automatically via tokenized UPI/Card payment.',
  },
  {
    code: '08',
    name: 'Exit Controller',
    layer: 'Actuated Smart Gate',
    spec: 'Unlocks exit barrier upon payment confirmation and pushes digital receipt.',
  },
];

type SimEvent = 'pickup' | 'putback' | 'multi';
const SIM_SEQUENCE: SimEvent[] = ['pickup', 'putback', 'multi'];

export const Slide3Architecture: React.FC<SlideProps> = ({ isPlaying = true }) => {
  const [selectedCompIdx, setSelectedCompIdx] = useState<number>(4);
  const [simEventIdx, setSimEventIdx] = useState<number>(0);
  const [activePipelineStage, setActivePipelineStage] = useState<number>(0);

  // Automatic video choreography cycling through sensor fusion events, pipeline stages, and components
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActivePipelineStage((prev) => (prev + 1) % 5);
      setSelectedCompIdx((prev) => (prev + 1) % CORE_COMPONENTS.length);
      setSimEventIdx((prev) => (prev + 1) % SIM_SEQUENCE.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const simEvent = SIM_SEQUENCE[simEventIdx] || 'pickup';
  const activeComponent = CORE_COMPONENTS[selectedCompIdx] || CORE_COMPONENTS[4];

  const simDetails = {
    pickup: {
      label: 'Event: Milk × 2 Picked Up',
      camera: 'Hand-to-Shelf #02 Grasp (Conf: 99.1%)',
      weight: 'Δ Weight: -1,040g (Matches 2 × 500ml Milk)',
      rfid: 'SKU #MK-204 Verified',
      fusionDecision: 'ADD [Milk × 2 — ₹60] TO VIRTUAL CART',
    },
    putback: {
      label: 'Event: Item Returned to Shelf',
      camera: 'Reverse Placement Trajectory Detected',
      weight: 'Δ Weight: +520g Restored on Tier 2',
      rfid: 'Tag Returned to Read Zone',
      fusionDecision: 'REMOVE [Milk × 1] · RECALCULATE CART',
    },
    multi: {
      label: 'Event: Multi-Item Simultaneous Grab',
      camera: 'Dual-Hand Interaction Tracked (YOLOv8n)',
      weight: 'Δ Weight: -380g (Bread + Chips)',
      rfid: 'Multi-Tag Anti-Collision Read',
      fusionDecision: 'APPEND [Bread × 1, Chips × 2] · VERIFIED',
    },
  }[simEvent];

  return (
    <div className="relative w-full h-full bg-[#0B0D10] bg-tech-grid overflow-hidden flex flex-col justify-between p-7 lg:p-10 select-none">
      {/* Header Row */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-3.5"
      >
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#36D9FF] font-semibold">
            03 / SYSTEM ARCHITECTURE
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
            From Sensors to <span className="text-[#36D9FF]">Autonomous Decisions</span>
          </h2>
        </div>

        {/* Interactive Event Verification Switcher */}
        <div className="flex items-center gap-1.5 bg-[#12161C] p-1 rounded-lg border border-white/[0.08]">
          <span className="text-[11px] font-mono text-[#A8B0BA] px-2 hidden xl:inline">
            LIVE FUSION STREAM:
          </span>
          {[
            { id: 'pickup', label: 'Pick-Up Event' },
            { id: 'putback', label: 'Put-Back Event' },
            { id: 'multi', label: 'Multi-SKU Grab' },
          ].map((ev, idx) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => setSimEventIdx(idx)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                simEventIdx === idx
                  ? 'bg-[#36D9FF] text-[#0B0D10] font-semibold'
                  : 'text-[#A8B0BA] hover:text-white'
              }`}
            >
              {ev.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Architecture Diagram + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-stretch">
        {/* LEFT / CENTER: Architecture Flow Diagram (8 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-8 bg-[#12161C]/90 border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between relative"
        >
          {/* TOP: Three Sensor Cards */}
          <div className="grid grid-cols-3 gap-3.5">
            {/* Sensor 1: CAMERA */}
            <div
              onClick={() => setSelectedCompIdx(1)}
              className="bg-[#0B0D10] border border-[#36D9FF]/50 hover:border-[#36D9FF] rounded-xl p-3.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(54,217,255,0.08)]"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-[#36D9FF]">CAMERA</span>
                <Camera className="w-4 h-4 text-[#36D9FF]" />
              </div>
              <div className="text-xs font-semibold text-white">
                Customer + Product Detection
              </div>
              <div className="text-[11px] font-mono text-[#36D9FF]/90 mt-1.5 pt-1.5 border-t border-white/[0.06]">
                {simDetails.camera}
              </div>
            </div>

            {/* Sensor 2: WEIGHT SENSOR */}
            <div
              onClick={() => setSelectedCompIdx(2)}
              className="bg-[#0B0D10] border border-[#36D9FF]/50 hover:border-[#36D9FF] rounded-xl p-3.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(54,217,255,0.08)]"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-[#36D9FF]">
                  WEIGHT SENSOR
                </span>
                <Scale className="w-4 h-4 text-[#36D9FF]" />
              </div>
              <div className="text-xs font-semibold text-white">Shelf Weight Change</div>
              <div className="text-[11px] font-mono text-[#36D9FF]/90 mt-1.5 pt-1.5 border-t border-white/[0.06]">
                {simDetails.weight}
              </div>
            </div>

            {/* Sensor 3: RFID */}
            <div
              onClick={() => setSelectedCompIdx(3)}
              className="bg-[#0B0D10] border border-[#6C63FF]/60 hover:border-[#6C63FF] rounded-xl p-3.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(108,99,255,0.08)]"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-[#6C63FF]">RFID</span>
                <Radio className="w-4 h-4 text-[#6C63FF]" />
              </div>
              <div className="text-xs font-semibold text-white">
                Product Identification*
              </div>
              <div className="text-[11px] font-mono text-[#A8B0BA] mt-1.5 pt-1.5 border-t border-white/[0.06]">
                {simDetails.rfid}
              </div>
            </div>
          </div>

          {/* Animated SVG Converging Lines from 3 Sensors to AI Sensor Fusion Engine */}
          <div className="w-full h-8 flex items-center justify-center">
            <svg viewBox="0 0 600 32" className="w-full h-full">
              <path
                d="M100 2 L100 16 L300 16 L300 30"
                fill="none"
                stroke="rgba(54,217,255,0.2)"
                strokeWidth="2.5"
              />
              <path
                d="M100 2 L100 16 L300 16 L300 30"
                fill="none"
                stroke="#36D9FF"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="animate-dash-flow"
              />
              <path
                d="M300 2 L300 30"
                fill="none"
                stroke="#36D9FF"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-dash-vertical"
              />
              <path
                d="M500 2 L500 16 L300 16 L300 30"
                fill="none"
                stroke="rgba(108,99,255,0.2)"
                strokeWidth="2.5"
              />
              <path
                d="M500 2 L500 16 L300 16 L300 30"
                fill="none"
                stroke="#6C63FF"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="animate-dash-flow"
              />
              <circle cx="300" cy="16" r="4.5" fill="#36D9FF" />
            </svg>
          </div>

          {/* CENTER: Large Central Glowing Card — AI SENSOR FUSION ENGINE */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(54,217,255,0.12)',
                '0 0 36px rgba(54,217,255,0.26)',
                '0 0 20px rgba(54,217,255,0.12)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => setSelectedCompIdx(4)}
            className="relative bg-[#0B0D10] border-2 border-[#36D9FF] rounded-2xl p-4 cursor-pointer"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#36D9FF] animate-pulse" />
                <span className="font-display text-sm sm:text-base font-extrabold tracking-wide text-white">
                  AI SENSOR FUSION ENGINE
                </span>
              </div>
              <span className="text-xs font-mono text-[#36D9FF] font-semibold">
                {simDetails.fusionDecision}
              </span>
            </div>

            {/* 3 Internal Pillars inside AI Sensor Fusion Engine */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  title: 'Customer Tracking',
                  sub: 'Pose + Multi-Camera Re-ID',
                },
                {
                  title: 'Product Detection',
                  sub: 'YOLOv8n + Shelf Load Delta',
                },
                {
                  title: 'Event Verification',
                  sub: 'Pick / Put-Back Consensus',
                },
              ].map((module, mIdx) => (
                <div
                  key={module.title}
                  className={`bg-[#12161C] border rounded-lg px-3 py-2 transition-colors ${
                    simEventIdx === mIdx
                      ? 'border-[#36D9FF]'
                      : 'border-white/[0.08]'
                  }`}
                >
                  <div className="text-xs font-semibold text-white">{module.title}</div>
                  <div className="text-[11px] text-[#A8B0BA] font-mono mt-0.5">
                    {module.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Animated Downward Pulse Connector */}
          <div className="flex justify-center my-1.5">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <ArrowDown className="w-4 h-4 text-[#36D9FF]" />
            </motion.div>
          </div>

          {/* BOTTOM PIPELINE: Virtual Shopping Cart -> Billing Engine -> Payment Gateway -> Exit Controller -> Digital Receipt */}
          <div className="grid grid-cols-5 gap-2 items-center">
            {[
              {
                title: 'VIRTUAL SHOPPING CART',
                sub: 'Live Session Ledger',
                compIdx: 4,
                icon: ShoppingCart,
              },
              {
                title: 'BILLING ENGINE',
                sub: 'SKU Tax & Total',
                compIdx: 5,
                icon: Receipt,
              },
              {
                title: 'PAYMENT GATEWAY',
                sub: 'Auto Capture',
                compIdx: 6,
                icon: CreditCard,
              },
              {
                title: 'EXIT CONTROLLER',
                sub: 'Smart Turnstile',
                compIdx: 7,
                icon: DoorOpen,
              },
              {
                title: 'DIGITAL RECEIPT',
                sub: 'Instant Invoice',
                compIdx: 7,
                icon: FileCheck2,
              },
            ].map((stage, idx) => {
              const Icon = stage.icon;
              const isStageActive = activePipelineStage === idx;
              return (
                <div key={stage.title} className="relative flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePipelineStage(idx);
                      setSelectedCompIdx(stage.compIdx);
                    }}
                    className={`w-full text-left bg-[#0B0D10] hover:bg-[#161B24] border rounded-xl p-2.5 transition-all cursor-pointer ${
                      isStageActive
                        ? 'border-[#36D9FF] shadow-[0_0_18px_rgba(54,217,255,0.2)] -translate-y-0.5'
                        : 'border-white/[0.1] hover:border-[#36D9FF]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Icon className="w-3.5 h-3.5 text-[#36D9FF]" />
                      <span className="text-[10px] font-mono text-[#36D9FF]">
                        0{idx + 1}
                      </span>
                    </div>
                    <div className="font-display text-[11px] font-bold text-white leading-tight">
                      {stage.title}
                    </div>
                    <div className="text-[10px] font-mono text-[#A8B0BA] mt-0.5 truncate">
                      {stage.sub}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT SIDE PANEL: Core Components (4 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="lg:col-span-4 bg-[#12161C] border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.07]">
              <span className="font-display text-sm font-bold tracking-wide text-white uppercase">
                Core Components
              </span>
              <span className="text-xs font-mono text-[#36D9FF]">08 MODULES</span>
            </div>

            {/* 8 Numbered Core Components */}
            <div className="space-y-1.5">
              {CORE_COMPONENTS.map((comp, idx) => {
                const isSelected = idx === selectedCompIdx;
                return (
                  <button
                    key={comp.code}
                    type="button"
                    onClick={() => setSelectedCompIdx(idx)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0B0D10] border-[#36D9FF] text-white shadow-sm'
                        : 'bg-[#0B0D10]/40 border-white/[0.05] text-[#A8B0BA] hover:text-white hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isSelected ? 'text-[#36D9FF]' : 'text-[#A8B0BA]'
                        }`}
                      >
                        {comp.code}
                      </span>
                      <span className="text-xs font-semibold">{comp.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#A8B0BA]">
                      {comp.layer}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Component Specification Inspector */}
            <div className="mt-3.5 bg-[#0B0D10] border border-[#36D9FF]/30 rounded-xl p-3">
              <div className="text-[11px] font-mono text-[#36D9FF] font-semibold">
                {activeComponent.code} · {activeComponent.name.toUpperCase()}
              </div>
              <p className="text-xs text-[#A8B0BA] mt-1 leading-relaxed min-h-[36px]">
                {activeComponent.spec}
              </p>
            </div>
          </div>

          {/* Mandatory Footnote */}
          <p className="text-[11px] font-mono text-[#A8B0BA] pt-3 border-t border-white/[0.06]">
            *RFID is optional depending on product category and prototype implementation.
          </p>
        </motion.div>
      </div>

      {/* Footer Technical Strip */}
      <div className="pt-2.5 border-t border-white/[0.07] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A8B0BA]">
        <div>
          ARCHITECTURE PATTERN:{' '}
          <span className="text-white">MULTI-MODAL IOT SENSOR FUSION</span>
        </div>
        <div>
          DECISION LATENCY: <span className="text-[#36D9FF]">&lt; 250ms END-TO-END</span>
        </div>
      </div>
    </div>
  );
};
