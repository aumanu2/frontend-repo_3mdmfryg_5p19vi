import React, { useEffect } from 'react';
import { Loader2, WashingMachine, Wind, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { key: 'diproses', label: 'Diproses', icon: Loader2 },
  { key: 'dicuci', label: 'Dicuci', icon: WashingMachine },
  { key: 'dikeringkan', label: 'Dikeringkan', icon: Wind },
  { key: 'siap diambil', label: 'Siap Diambil', icon: CheckCircle2 },
  { key: 'selesai', label: 'Selesai', icon: CheckCircle2 },
];

export const nextStatus = (current) => {
  const idx = STEPS.findIndex((s) => s.key === current);
  if (idx < 0 || idx === STEPS.length - 1) return 'selesai';
  return STEPS[idx + 1].key;
};

export default function StatusTracker({ order, onAdvance }) {
  useEffect(() => {
    if (!order) return;
    // Simulasi notifikasi dinamis via browser Notification API fallback toast
    const last = order.statusHistory?.[order.statusHistory.length - 1];
    const text = `Status pesanan ${order.id} berubah menjadi \"${order.status}\"`;
    if ('Notification' in window) {
      if (Notification.permission === 'granted') new Notification('CleanUp Laundry', { body: text });
      else if (Notification.permission !== 'denied') Notification.requestPermission();
    }
    // eslint-disable-next-line no-console
    console.log('[NOTIF]', text);
  }, [order?.status, order?.id]);

  return (
    <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-100 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-semibold text-gray-800">Tracking Status</span>
        <span className="text-xs text-gray-500">({order.id})</span>
      </div>
      <ol className="flex flex-col sm:flex-row gap-3">
        {STEPS.map(({ key, label, icon: Icon }) => {
          const active = STEPS.findIndex(s=>s.key===order.status) >= STEPS.findIndex(s=>s.key===key);
          return (
            <li key={key} className={`flex-1 flex items-center gap-3 p-3 rounded-lg border ${active ? 'border-blue-200 bg-blue-50' : 'border-gray-100'}`}>
              <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${active ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>{label}</span>
            </li>
          );
        })}
      </ol>
      <div className="mt-4 flex justify-end">
        {order.status !== 'selesai' && (
          <button onClick={onAdvance} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Update Status →
          </button>
        )}
      </div>
    </div>
  );
}
