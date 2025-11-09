import React, { useMemo, useState } from 'react';
import { Calendar, Package, ShoppingCart } from 'lucide-react';

const SERVICES = [
  { id: 'cuci_lipat', name: 'Cuci Lipat', price: 6000 },
  { id: 'express', name: 'Express', price: 9000 },
  { id: 'dry_clean', name: 'Dry Clean', price: 12000 },
];

export default function OrderForm({ onCreate }) {
  const [service, setService] = useState(SERVICES[0].id);
  const [qty, setQty] = useState(5);
  const [pickupDate, setPickupDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === service) || SERVICES[0],
    [service]
  );
  const subtotal = useMemo(() => selectedService.price * (Number(qty) || 0), [selectedService.price, qty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pickupDate || !deliveryDate) return;
    const newOrder = {
      id: `ORD-${Date.now().toString(36)}`,
      service,
      serviceName: selectedService.name,
      pricePerItem: selectedService.price,
      qty: Number(qty),
      subtotal,
      pickupDate,
      deliveryDate,
      status: 'diproses',
      statusHistory: [
        { status: 'diproses', at: new Date().toISOString() },
      ],
      rating: 0,
      createdAt: new Date().toISOString(),
    };
    onCreate(newOrder);
    // reset minimal
    setQty(5);
    setPickupDate('');
    setDeliveryDate('');
    setService(SERVICES[0].id);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="w-full">
      <div className="bg-white/80 backdrop-blur rounded-xl border border-gray-100 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Form Order Laundry</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-1">Jenis Layanan</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} — Rp{new Intl.NumberFormat('id-ID').format(s.price)}/item
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-1">Jumlah Pakaian</label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-1">Tanggal Pick-up</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full pl-9 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-sm text-gray-600 mb-1">Tanggal Delivery</label>
            <div className="relative">
              <Package className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                min={pickupDate || today}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full pl-9 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
            <div className="text-sm text-gray-600">Perkiraan harga</div>
            <div className="text-lg font-semibold text-blue-700">Rp{new Intl.NumberFormat('id-ID').format(subtotal)}</div>
          </div>

          <div className="col-span-1 sm:col-span-2 flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow">
              Buat Pesanan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
