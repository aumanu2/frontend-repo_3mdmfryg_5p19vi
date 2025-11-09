import React from 'react';
import { Shirt, Bell, History, ClipboardList } from 'lucide-react';

const TABS = [
  { key: 'order', label: 'Order', icon: ClipboardList },
  { key: 'track', label: 'Tracking', icon: Bell },
  { key: 'history', label: 'Riwayat', icon: History },
];

export default function Header({ activeTab, onChangeTab }) {
  return (
    <header className="w-full sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shirt className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-gray-800">CleanUp Laundry</span>
        </div>
        <nav className="flex items-center gap-1">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChangeTab(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                activeTab === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
