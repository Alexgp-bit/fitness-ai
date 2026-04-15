'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Row = {
  label: string;
  steps: number;
  sleepHours: number;
  restingHeartRate: number;
};

export function TrendsChart({ data }: { data: Row[] }) {
  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="label">Tendencias</div>
          <h2 className="mt-1 text-xl font-semibold text-white">Últimos días</h2>
        </div>
      </div>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#94a3b8" />
            <YAxis yAxisId="left" stroke="#94a3b8" />
            <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
            <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#38bdf8" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="sleepHours" stroke="#c084fc" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="restingHeartRate" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
