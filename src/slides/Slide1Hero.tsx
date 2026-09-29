import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  QrCode,
  Camera,
  ShoppingCart,
  CreditCard,
  DoorOpen,
  ArrowRight,
  Radio,
  Scale,
} from 'lucide-react';

interface SlideProps {
  onNavigate?: (slideIndex: number) => void;
  isPlaying?: boolean;
}

type NodeId = 'customer' | 'camera' | 'ai' | 'cart' | 'payment' | 'exit';

interface FlowNode {
  id: NodeId;
  label: string;
  techTag: string;
  title: string;
  detail: string;
  cartValue: string;
  coords: { x: number; y: number };
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'customer',
    label: 'Customer',
    techTag: 'QR Entry Gate',
    title: '01. Authenticated Store Entry',
    detail: 'Customer scans dynamic app QR at turnstile; encrypted session token binds biometric trajectory to virtual wallet.',
    cartValue: '₹0.00',
    coords: { x: 85, y: 270 },
  },
  {
    id: 'camera',
    label: 'Camera',
    techTag: 'Computer Vision',
    title: '02. Multi-Angle Ceiling Vision',
    detail: 'Overhead RGB-D cameras track skeletal pose and hand-to-shelf interactions without facial recognition storage.',
    cartValue: '₹60.00',
    coords: { x: 215, y: 95 },
  },
  {
    id: 'ai',
    label: 'AI',
    techTag: 'Sensor Fusion',
    title: '03. YOLOv8n + Load Cell Fusion',
    detail: 'Cross-verifies visual grab/put-back detections with high-precision strain-gauge shelf weight deltas.',
    cartValue: '₹105.00',
    coords: { x: 350, y: 175 },
  },
  {
    id: 'cart',
    label: 'Cart',
    techTag: 'Virtual Session',
    title: '04. Real-Time Virtual Shopping Cart',
    detail: 'Sub-second item ledger updates as products are picked up or returned to smart shelves.',
    cartValue: '₹145.00',
    coords: { x: 470, y: 115 },
  },
  {
    id: 'payment',
    label: 'Payment',
    techTag: 'Auto Capture',
    title: '05. Pre-Authorized Automated Payment',
    detail: 'Finalized cart total is verified and captured automatically via UPI / token gateway upon exit approach.',
    cartValue: '₹145.00',
    coords: { x: 525, y: 245 },
  },
  {
    id: 'exit',
    label: 'Exit',
    techTag: 'Smart Gate',
    title: '06. Frictionless Smart Exit',
    detail: 'Exit actuator unlocks automatically in <350ms and dispatches an itemized digital receipt.',
    cartValue: '₹145.00',
    coords: { x: 615, y: 310 },
  },
];

export const Slide1Hero: React.FC<SlideProps> = ({ onNavigate, isPlaying = true }) => {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  // Automatic video-style progression through the 6 store nodes
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % FLOW_NODES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const selectedNode = FLOW_NODES[activeNodeIndex] || FLOW_NODES[0];
  const activeNode = selectedNode.id;

  return (
    <div className="relative w-full h-full bg-[#0B0D10] bg-tech-grid overflow-hidden flex flex-col justify-between p-7 lg:p-10 select-none">
      {/* Subtle Ambient Animated Glows */}
      <motion.div
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 right-1/4 w-[480px] h-[480px] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, #36D9FF 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -bottom-32 left-1/3 w-[420px] h-[420px] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)' }}
      />

      {/* Top Metadata Row */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4"
      >
        <div className="flex items-center gap-3 text-xs tracking-wider font-mono text-[#A8B0BA]">
          <span className="text-[#36D9FF] font-semibold">IEEE HACKATHON 2026</span>
          <span aria-hidden="true">·</span>
          <span>AUTONOMOUS RETAIL SYSTEMS</span>
          <span aria-hidden="true">·</span>
          <span>SLIDE 01 / 05</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#A8B0BA]">
          <span className="text-white font-medium">Harshan Seliyan B. S.</span>
          <span aria-hidden="true">·</span>
          <span>B.Tech Information Technology</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#36D9FF]">RMK Engineering College</span>
        </div>
      </motion.div>

      {/* Main Content Split */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-4">
        {/* Left Column: 5 Cols */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col justify-center space-y-6"
        >
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#36D9FF]">
              Next-Generation Retail Infrastructure
            </p>
            <h1
              className="font-display text-3xl sm:text-4xl xl:text-[44px] font-extrabold tracking-tight text-white leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              AI-POWERED 24/7{' '}
              <span className="text-[#36D9FF]">AUTONOMOUS</span>{' '}
              CASHIERLESS SMART STORE
            </h1>
          </div>

          <p className="text-sm sm:text-base text-[#A8B0BA] leading-relaxed font-normal">
            Powered by{' '}
            <span className="text-white font-semibold underline decoration-[#36D9FF]/60 underline-offset-4">
              Computer Vision
            </span>{' '}
            +{' '}
            <span className="text-white font-semibold underline decoration-[#36D9FF]/60 underline-offset-4">
              IoT Sensor Fusion
            </span>{' '}
            +{' '}
            <span className="text-white font-semibold underline decoration-[#6C63FF]/80 underline-offset-4">
              Automated Payment
            </span>
          </p>

          {/* Animated Node Telemetry Card */}
          <div className="bg-[#12161C]/90 border border-white/[0.08] rounded-xl p-4 space-y-2.5 shadow-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#36D9FF] font-medium">{selectedNode.title}</span>
                  <span className="text-[#A8B0BA]">{selectedNode.techTag}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#A8B0BA] leading-relaxed min-h-[40px]">
                  {selectedNode.detail}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Pipeline Selector */}
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-1 overflow-x-auto">
              {FLOW_NODES.map((node, idx) => {
                const isActive = idx === activeNodeIndex;
                return (
                  <React.Fragment key={node.id}>
                    <button
                      type="button"
                      onClick={() => setActiveNodeIndex(idx)}
                      className={`px-2 py-1 rounded text-[11px] font-mono transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#36D9FF]/15 text-[#36D9FF] border border-[#36D9FF]/40 font-semibold'
                          : 'text-[#A8B0BA] hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {node.label}
                    </button>
                    {idx < FLOW_NODES.length - 1 && (
                      <span className="text-[#A8B0BA]/40 text-[10px] font-mono">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Author & Institution Block */}
          <div className="bg-[#12161C]/60 border-l-2 border-[#36D9FF] pl-4 py-2 space-y-0.5">
            <div className="text-xs font-mono text-[#A8B0BA] uppercase tracking-wider">
              Presented By
            </div>
            <div className="text-sm sm:text-base font-semibold text-white">
              Harshan Seliyan B. S.
            </div>
            <div className="text-xs text-[#A8B0BA]">
              Department of Information Technology · RMK Engineering College
            </div>
          </div>
        </motion.div>

        {/* Right Column: 7 Cols — Stylized Autonomous Retail Store Illustration with Live Video Motion */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="lg:col-span-7 relative"
        >
          <div className="relative bg-[#12161C] border border-white/[0.09] rounded-2xl p-4 sm:p-5 shadow-2xl overflow-hidden">
            {/* Top HUD Header inside illustration */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#36D9FF] animate-pulse" />
                <span className="text-white font-medium">AUTONOMOUS STORE DIGITAL TWIN</span>
                <span className="text-[#A8B0BA]">·</span>
                <span className="text-[#36D9FF]">LIVE STREAM SIMULATION</span>
              </div>
              <div className="text-[#36D9FF] hidden sm:block">
                ACTIVE STAGE: {selectedNode.label.toUpperCase()}
              </div>
            </div>

            {/* Architectural Vector Diagram (16:10 canvas) */}
            <div className="relative w-full aspect-[16/10] bg-[#0B0D10] rounded-xl border border-white/[0.06] overflow-hidden">
              <svg
                viewBox="0 0 700 400"
                className="w-full h-full"
                aria-label="Stylized Autonomous Smart Store Illustration"
              >
                <defs>
                  <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#36D9FF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="visionCone" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#36D9FF" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#36D9FF" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="shelfGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#12161C" />
                    <stop offset="100%" stopColor="#18202C" />
                  </linearGradient>
                </defs>

                {/* Perspective Floor Grid */}
                <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
                  <line x1="40" y1="340" x2="660" y2="340" />
                  <line x1="70" y1="290" x2="630" y2="290" />
                  <line x1="100" y1="240" x2="600" y2="240" />
                  <line x1="100" y1="240" x2="40" y2="340" />
                  <line x1="225" y1="240" x2="195" y2="340" />
                  <line x1="350" y1="240" x2="350" y2="340" />
                  <line x1="475" y1="240" x2="505" y2="340" />
                  <line x1="600" y1="240" x2="660" y2="340" />
                </g>

                {/* Ceiling Optical Sensor Rail */}
                <rect
                  x="90"
                  y="28"
                  width="520"
                  height="10"
                  rx="5"
                  fill="#161C24"
                  stroke="rgba(255,255,255,0.15)"
                />
                {/* Ceiling Camera Pods with Active Optical Cones */}
                {[180, 340, 500].map((cx, i) => (
                  <g key={cx}>
                    <polygon
                      points={`${cx},42 ${cx - 75},240 ${cx + 75},240`}
                      fill="url(#visionCone)"
                      opacity={activeNode === 'camera' || activeNode === 'ai' ? 1 : 0.55}
                    />
                    <rect
                      x={cx - 18}
                      y="34"
                      width="36"
                      height="16"
                      rx="4"
                      fill="#12161C"
                      stroke="#36D9FF"
                      strokeWidth={activeNode === 'camera' ? '2' : '1.2'}
                    />
                    <circle cx={cx} cy="42" r="4" fill="#36D9FF" />
                    <text
                      x={cx}
                      y="22"
                      textAnchor="middle"
                      fill="#A8B0BA"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                    >
                      CAM-0{i + 1} [RGB-D]
                    </text>
                  </g>
                ))}

                {/* Smart Shelves */}
                {[150, 295].map((sx, shelfIdx) => (
                  <g key={sx}>
                    <rect
                      x={sx}
                      y="125"
                      width="115"
                      height="135"
                      rx="6"
                      fill="url(#shelfGlow)"
                      stroke={activeNode === 'ai' ? '#36D9FF' : 'rgba(255,255,255,0.16)'}
                      strokeWidth={activeNode === 'ai' ? '2' : '1'}
                    />
                    <rect
                      x={sx + 6}
                      y="131"
                      width="103"
                      height="16"
                      rx="3"
                      fill="#0B0D10"
                    />
                    <text
                      x={sx + 12}
                      y="142"
                      fill="#36D9FF"
                      fontSize="8.5"
                      fontFamily="JetBrains Mono"
                    >
                      SMART SHELF 0{shelfIdx + 1}
                    </text>

                    {[168, 202, 236].map((sy, tierIdx) => (
                      <g key={sy}>
                        <rect
                          x={sx + 8}
                          y={sy + 14}
                          width="99"
                          height="4"
                          rx="2"
                          fill="#36D9FF"
                          fillOpacity={activeNode === 'ai' ? '0.85' : '0.45'}
                        />
                        {[0, 1, 2, 3].map((pIdx) => {
                          const isPicked = shelfIdx === 1 && tierIdx === 0 && pIdx === 2;
                          return (
                            <rect
                              key={pIdx}
                              x={sx + 13 + pIdx * 23}
                              y={sy - 4}
                              width="16"
                              height="16"
                              rx="2.5"
                              fill={isPicked ? 'rgba(54,217,255,0.18)' : '#1F2937'}
                              stroke={isPicked ? '#36D9FF' : 'rgba(255,255,255,0.22)'}
                              strokeDasharray={isPicked ? '2 2' : undefined}
                            />
                          );
                        })}
                      </g>
                    ))}
                  </g>
                ))}

                {/* QR Entry Turnstile */}
                <g>
                  <rect
                    x="38"
                    y="235"
                    width="88"
                    height="90"
                    rx="8"
                    fill="#12161C"
                    stroke={activeNode === 'customer' ? '#36D9FF' : 'rgba(255,255,255,0.18)'}
                    strokeWidth={activeNode === 'customer' ? '2.2' : '1.5'}
                  />
                  <rect
                    x="48"
                    y="245"
                    width="26"
                    height="26"
                    rx="4"
                    fill="#0B0D10"
                    stroke="#36D9FF"
                  />
                  <rect x="53" y="250" width="6" height="6" fill="#36D9FF" />
                  <rect x="63" y="250" width="6" height="6" fill="#36D9FF" />
                  <rect x="53" y="260" width="6" height="6" fill="#36D9FF" />
                  <text
                    x="82"
                    y="256"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans"
                  >
                    QR ENTRY
                  </text>
                  <text
                    x="82"
                    y="267"
                    fill="#36D9FF"
                    fontSize="7.5"
                    fontFamily="JetBrains Mono"
                  >
                    AUTH OK
                  </text>
                  <text
                    x="48"
                    y="292"
                    fill="#A8B0BA"
                    fontSize="8"
                    fontFamily="JetBrains Mono"
                  >
                    UID: #HS-2026
                  </text>
                  <rect
                    x="48"
                    y="302"
                    width="68"
                    height="12"
                    rx="3"
                    fill="rgba(54,217,255,0.12)"
                  />
                  <text
                    x="82"
                    y="311"
                    textAnchor="middle"
                    fill="#36D9FF"
                    fontSize="7.5"
                    fontFamily="JetBrains Mono"
                  >
                    GATE OPEN →
                  </text>
                </g>

                {/* AI Customer Bounding Box + Skeletal Tracking Indicator */}
                <g>
                  <rect
                    x="255"
                    y="152"
                    width="74"
                    height="138"
                    rx="6"
                    fill="rgba(54,217,255,0.06)"
                    stroke="#36D9FF"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    className="animate-dash-flow"
                  />
                  <rect x="255" y="136" width="86" height="15" rx="3" fill="#36D9FF" />
                  <text
                    x="260"
                    y="146"
                    fill="#0B0D10"
                    fontSize="8"
                    fontWeight="700"
                    fontFamily="JetBrains Mono"
                  >
                    ID #04 · 99.4%
                  </text>
                  <circle cx="292" cy="176" r="11" fill="#1E293B" stroke="#36D9FF" strokeWidth="1.5" />
                  <path
                    d="M274 238 C274 202, 310 202, 310 238 L306 280 L278 280 Z"
                    fill="#1E293B"
                    stroke="#36D9FF"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M305 208 L342 172"
                    stroke="#36D9FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="342" cy="172" r="5" fill="#36D9FF" />
                </g>

                {/* Virtual Cart HUD Panel */}
                <g>
                  <rect
                    x="445"
                    y="62"
                    width="215"
                    height="108"
                    rx="8"
                    fill="#12161C"
                    stroke={activeNode === 'cart' ? '#36D9FF' : 'rgba(255,255,255,0.18)'}
                    strokeWidth={activeNode === 'cart' ? '2.2' : '1.5'}
                  />
                  <text
                    x="458"
                    y="81"
                    fill="#36D9FF"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="JetBrains Mono"
                  >
                    VIRTUAL CART SESSION #04
                  </text>
                  <line
                    x1="458"
                    y1="88"
                    x2="648"
                    y2="88"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <text x="458" y="104" fill="#FFFFFF" fontSize="9" fontFamily="JetBrains Mono">
                    Milk × 2
                  </text>
                  <text x="645" y="104" textAnchor="end" fill="#36D9FF" fontSize="9" fontFamily="JetBrains Mono">
                    ₹60
                  </text>
                  <text x="458" y="120" fill="#FFFFFF" fontSize="9" fontFamily="JetBrains Mono">
                    Bread × 1
                  </text>
                  <text x="645" y="120" textAnchor="end" fill="#36D9FF" fontSize="9" fontFamily="JetBrains Mono">
                    ₹45
                  </text>
                  <text x="458" y="136" fill="#FFFFFF" fontSize="9" fontFamily="JetBrains Mono">
                    Chips × 2
                  </text>
                  <text x="645" y="136" textAnchor="end" fill="#36D9FF" fontSize="9" fontFamily="JetBrains Mono">
                    ₹40
                  </text>
                  <line
                    x1="458"
                    y1="145"
                    x2="648"
                    y2="145"
                    stroke="rgba(255,255,255,0.12)"
                  />
                  <text
                    x="458"
                    y="160"
                    fill="#A8B0BA"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="JetBrains Mono"
                  >
                    ACTIVE TOTAL
                  </text>
                  <text
                    x="645"
                    y="160"
                    textAnchor="end"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="JetBrains Mono"
                  >
                    {selectedNode.cartValue}
                  </text>
                </g>

                {/* Digital Payment Interface + Smart Exit Gate */}
                <g>
                  <rect
                    x="455"
                    y="198"
                    width="125"
                    height="72"
                    rx="8"
                    fill="#12161C"
                    stroke={activeNode === 'payment' ? '#36D9FF' : '#6C63FF'}
                    strokeWidth={activeNode === 'payment' ? '2.2' : '1.4'}
                  />
                  <text
                    x="467"
                    y="216"
                    fill="#6C63FF"
                    fontSize="8.5"
                    fontWeight="600"
                    fontFamily="JetBrains Mono"
                  >
                    AUTO PAYMENT
                  </text>
                  <text
                    x="467"
                    y="234"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontWeight="700"
                    fontFamily="JetBrains Mono"
                  >
                    ₹145 CAPTURED
                  </text>
                  <text
                    x="467"
                    y="252"
                    fill="#36D9FF"
                    fontSize="8"
                    fontFamily="JetBrains Mono"
                  >
                    VERIFY → CAPTURE
                  </text>

                  {/* Smart Exit Gate */}
                  <rect
                    x="575"
                    y="278"
                    width="95"
                    height="78"
                    rx="8"
                    fill="#12161C"
                    stroke={activeNode === 'exit' ? '#36D9FF' : 'rgba(255,255,255,0.2)'}
                    strokeWidth={activeNode === 'exit' ? '2.2' : '1.5'}
                  />
                  <text
                    x="622"
                    y="300"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans"
                  >
                    SMART EXIT
                  </text>
                  <text
                    x="622"
                    y="316"
                    textAnchor="middle"
                    fill="#36D9FF"
                    fontSize="8"
                    fontFamily="JetBrains Mono"
                  >
                    GATE UNLOCKED
                  </text>
                  <text
                    x="622"
                    y="334"
                    textAnchor="middle"
                    fill="#A8B0BA"
                    fontSize="7.5"
                    fontFamily="JetBrains Mono"
                  >
                    RECEIPT SENT
                  </text>
                </g>

                {/* Animated Flowing Telemetry Lines: Customer -> Camera -> AI -> Cart -> Payment -> Exit */}
                <polyline
                  points={FLOW_NODES.map((n) => `${n.coords.x},${n.coords.y}`).join(' ')}
                  fill="none"
                  stroke="rgba(54,217,255,0.22)"
                  strokeWidth="3"
                />
                <polyline
                  points={FLOW_NODES.map((n) => `${n.coords.x},${n.coords.y}`).join(' ')}
                  fill="none"
                  stroke="url(#cyanLine)"
                  strokeWidth="2.4"
                  strokeDasharray="8 6"
                  className="animate-dash-flow"
                />

                {/* Interactive Flow Nodes Overlay */}
                {FLOW_NODES.map((node, idx) => {
                  const isSelected = idx === activeNodeIndex;
                  return (
                    <g
                      key={node.id}
                      onClick={() => setActiveNodeIndex(idx)}
                      className="cursor-pointer"
                    >
                      {isSelected && (
                        <circle
                          cx={node.coords.x}
                          cy={node.coords.y}
                          r="20"
                          fill="rgba(54,217,255,0.28)"
                          className="animate-pulse-ring"
                        />
                      )}
                      <circle
                        cx={node.coords.x}
                        cy={node.coords.y}
                        r="11"
                        fill={isSelected ? '#36D9FF' : '#0B0D10'}
                        stroke="#36D9FF"
                        strokeWidth="2"
                      />
                      <circle
                        cx={node.coords.x}
                        cy={node.coords.y}
                        r="3.5"
                        fill={isSelected ? '#0B0D10' : '#36D9FF'}
                      />
                      <rect
                        x={node.coords.x - 32}
                        y={node.coords.y + 14}
                        width="64"
                        height="16"
                        rx="3"
                        fill="#0B0D10"
                        stroke={isSelected ? '#36D9FF' : 'rgba(255,255,255,0.18)'}
                        strokeWidth="1"
                      />
                      <text
                        x={node.coords.x}
                        y={node.coords.y + 25}
                        textAnchor="middle"
                        fill={isSelected ? '#36D9FF' : '#FFFFFF'}
                        fontSize="8.5"
                        fontWeight="600"
                        fontFamily="JetBrains Mono"
                      >
                        {node.label.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Connected Pipeline Legend under diagram */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#A8B0BA]">
              <div className="flex items-center gap-1.5">
                <span className="text-white font-medium">TELEMETRY PATH:</span>
                <span className="text-[#36D9FF]">
                  Customer → Camera → AI → Cart → Payment → Exit
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-[#36D9FF]" /> YOLOv8n Vision
                </span>
                <span className="flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-[#36D9FF]" /> Load Cells
                </span>
                <span className="flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5 text-[#6C63FF]" /> RFID*
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Visual Process Strip: SCAN → SHOP → PAY → EXIT */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.28 }}
        className="relative z-10 pt-3 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-start">
          {[
            { step: '01', label: 'SCAN', desc: 'QR Gate Entry', icon: QrCode, slide: 3 },
            { step: '02', label: 'SHOP', desc: 'AI Vision + IoT', icon: ShoppingCart, slide: 2 },
            { step: '03', label: 'PAY', desc: 'Auto Capture', icon: CreditCard, slide: 3 },
            { step: '04', label: 'EXIT', desc: 'Zero Queue Gate', icon: DoorOpen, slide: 3 },
          ].map((item, index) => {
            const Icon = item.icon;
            const isHighlighted = Math.floor((activeNodeIndex / 6) * 4) === index;
            return (
              <React.Fragment key={item.label}>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate(item.slide)}
                  className={`group flex items-center gap-2.5 bg-[#12161C] hover:bg-[#171C24] border rounded-lg px-3.5 py-2 transition-all cursor-pointer ${
                    isHighlighted
                      ? 'border-[#36D9FF] shadow-[0_0_16px_rgba(54,217,255,0.2)]'
                      : 'border-white/[0.08] hover:border-[#36D9FF]/50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#36D9FF] shrink-0" />
                  <div className="text-left">
                    <div className="text-xs font-mono font-bold tracking-wider text-white group-hover:text-[#36D9FF] transition-colors">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-[#A8B0BA] hidden md:block">
                      {item.desc}
                    </div>
                  </div>
                </button>
                {index < 3 && (
                  <ArrowRight className="w-4 h-4 text-[#36D9FF]/60 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate(1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#36D9FF] text-[#0B0D10] font-semibold text-xs tracking-wide hover:bg-[#36D9FF]/90 transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Explore Problem & Solution</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </div>
  );
};
