import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import OrderForm from './components/OrderForm';
import StatusTracker, { nextStatus } from './components/StatusTracker';
import OrderList from './components/OrderList';
import History from './components/History';

const STORAGE_KEY = 'cleanup_orders_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState('order');
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
  });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const selectedOrder = useMemo(() => orders.find(o=>o.id===selectedId) || orders[0] || null, [orders, selectedId]);

  useEffect(() => {
    if (orders.length && !selectedId) setSelectedId(orders[0].id);
  }, [orders, selectedId]);

  const handleCreate = (order) => {
    setOrders(prev => [order, ...prev]);
    setActiveTab('track');
    setSelectedId(order.id);
  };

  const advanceStatus = () => {
    setOrders(prev => prev.map(o => {
      if (o.id !== selectedOrder.id) return o;
      const newStatus = nextStatus(o.status);
      return {
        ...o,
        status: newStatus,
        statusHistory: [...(o.statusHistory||[]), { status: newStatus, at: new Date().toISOString() }],
      };
    }));
  };

  const handleRate = (id, rating) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, rating } : o));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-amber-50">
      <Header activeTab={activeTab} onChangeTab={setActiveTab} />

      <main className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'order' && (
            <OrderForm onCreate={handleCreate} />
          )}

          {activeTab === 'track' && selectedOrder && (
            <>
              <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-100 p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">Pesanan #{selectedOrder.id}</h2>
                    <p className="text-sm text-gray-600">{selectedOrder.serviceName} • {selectedOrder.qty} item • Rp{new Intl.NumberFormat('id-ID').format(selectedOrder.subtotal)}</p>
                    <p className="text-xs text-gray-500 mt-1">Pick-up: {selectedOrder.pickupDate} • Delivery: {selectedOrder.deliveryDate}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Status saat ini</div>
                    <div className="text-lg font-semibold text-blue-700">{selectedOrder.status}</div>
                  </div>
                </div>
              </div>
              <StatusTracker order={selectedOrder} onAdvance={advanceStatus} />
            </>
          )}

          {activeTab === 'history' && (
            <History orders={orders} />
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-100 p-4 sm:p-6 shadow-sm sticky top-20">
            <h3 className="text-base font-semibold text-gray-800 mb-3">Daftar Pesanan</h3>
            <OrderList
              orders={orders}
              activeId={selectedOrder?.id || null}
              onSelect={(id)=>{ setSelectedId(id); setActiveTab('track'); }}
              onRate={handleRate}
            />
          </div>
        </aside>
      </main>

      <footer className="py-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CleanUp Laundry — versi demo (local only)
      </footer>
    </div>
  );
}
