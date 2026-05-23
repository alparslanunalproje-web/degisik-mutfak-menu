"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, QrCode } from "lucide-react";
import QRCode from "qrcode";

const PRESETS = [
  { name: "Mavi", dark: "#0284c7", light: "#ffffff" },
  { name: "Gece", dark: "#0f172a", light: "#f1f5f9" },
  { name: "Altın", dark: "#92400e", light: "#fffbeb" },
  { name: "Mor", dark: "#6d28d9", light: "#f5f3ff" },
  { name: "Yeşil", dark: "#047857", light: "#ecfdf5" },
];

export function QrGenerator() {
  const [url, setUrl] = useState("");
  const [dark, setDark] = useState("#0284c7");
  const [light, setLight] = useState("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const base = window.location.origin;
    setUrl(base || "https://degisik-mutfak-menu.vercel.app/");
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !url) return;
    QRCode.toCanvas(
      canvasRef.current,
      url,
      {
        width: 256,
        margin: 2,
        errorCorrectionLevel: "H",
        color: { dark, light },
      },
      (err) => {
        if (err) console.error(err);
      }
    );
  }, [url, dark, light]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "degisik-mutfak-qr.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-3xl glass-strong p-6 shadow-[var(--shadow-glass)]"
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-lg shadow-brand-500/30">
          <QrCode className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-[var(--text-strong)]">
            Karekod Oluşturucu
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Menünüze direkt erişim için özelleştirin
          </p>
        </div>
      </div>

      <div className="mb-6 flex justify-center rounded-2xl border border-brand-100/60 bg-white p-6 shadow-inner dark:border-brand-800/40 dark:bg-slate-950/40">
        <motion.div
          key={`${dark}-${light}`}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          className="rounded-xl bg-white p-3 shadow-md"
          style={{ background: light }}
        >
          <canvas
            ref={canvasRef}
            className="block h-[220px] w-[220px]"
            aria-label="QR kod önizleme"
          />
        </motion.div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="qr-url"
            className="mb-1.5 block text-xs font-bold text-[var(--text-strong)]"
          >
            Karekod URL
          </label>
          <input
            id="qr-url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/menu"
            className="h-11 w-full rounded-xl border border-brand-100/60 bg-white px-3 text-sm text-[var(--text-strong)] focus:ring-focus dark:border-brand-800/40 dark:bg-slate-900/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-bold text-[var(--text-strong)]">
            Hazır Temalar
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => {
              const active = dark === p.dark && light === p.light;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setDark(p.dark);
                    setLight(p.light);
                  }}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-200"
                      : "border-brand-100/60 bg-white/50 text-[var(--text-soft)] hover:border-brand-300 dark:border-brand-800/40 dark:bg-slate-900/40"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full ring-1 ring-black/10"
                    style={{ background: p.dark }}
                  />
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ColorField label="Karekod" value={dark} onChange={setDark} />
          <ColorField label="Arka plan" value={light} onChange={setLight} />
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 text-sm font-bold text-white shadow-lg shadow-brand-500/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          PNG Olarak İndir
        </button>
      </div>
    </motion.div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-[var(--text-strong)]">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-brand-100/60 bg-white p-2 dark:border-brand-800/40 dark:bg-slate-900/60">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-9 cursor-pointer rounded-lg border-0"
          aria-label={`${label} rengi`}
        />
        <span className="font-mono text-xs text-[var(--text-muted)]">
          {value.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
