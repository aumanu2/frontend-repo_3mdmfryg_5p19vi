import React from 'react';

export default function History({ orders }) {
  const done = orders.filter(o=>o.status==='selesai');
  if (!done.length) return <div className="text-gray-500 text-center py-10">Belum ada riwayat selesai.</div>;
  return (
    <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-100 p-4 sm:p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Riwayat Transaksi</h3>
      <ul className="divide-y divide-gray-100">
        {done.map(o=> (
          <li key={o.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-800">{o.serviceName}</div>
              <div className="text-sm text-gray-500">{o.qty} item • Rp{new Intl.NumberFormat('id-ID').format(o.subtotal)}</div>
            </div>
            <div className="text-sm text-gray-600">Rating: {o.rating || '-'} / 5</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
