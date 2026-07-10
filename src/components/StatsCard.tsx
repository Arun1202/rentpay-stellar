type Props = {
  title: string;
  value: string | number;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 text-center shadow-md">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}