import React from 'react';
import { Star } from 'lucide-react';

export default function OrderList({ orders, activeId, onSelect, onRate }) {
  if (!orders.length) {
    return (
      <div className="text-center text-gray-500 py-10">Belum ada pesanan. Buat pesanan pertama Anda.</div>
    );
  }

  return (
    <div className="grid gap-3">
      {orders.map((o) => (
        <button
          key={o.id}
          onClick={() => onSelect(o.id)}
          className={`text-left p-4 rounded-xl border transition hover:shadow ${
            activeId === o.id ? 'border-blue-300 bg-blue-50' : 'border-gray-100 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-800">{o.serviceName}</div>
            <div className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleString('id-ID')}</div>
          </div>
          <div className="mt-2 text-sm text-gray-600">{o.qty} item • Rp{new Intl.NumberFormat('id-ID').format(o.subtotal)}</div>
          <div className="mt-1 text-xs text-blue-700">Status: {o.status}</div>
          <div className="mt-3 flex items-center gap-1">
            {[1,2,3,4,5].map((i)=>(
              <Star
                key={i}
                onClick={(e)=>{ e.stopPropagation(); onRate(o.id, o.rating === i ? 0 : i); }}
                className={`w-4 h-4 cursor-pointer ${i <= (o.rating||0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
