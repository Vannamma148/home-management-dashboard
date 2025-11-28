import { ShoppingCart, Calendar, ListTodo, Wallet } from "lucide-react";

export default function Home() {
  return (
    <main className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Shopping Items"
          value={42}
          gradient="from-teal-400 to-teal-600"
          icon={<ShoppingCart className="text-white" />}
        />
        <DashboardCard
          title="Tasks"
          value={18}
          gradient="from-purple-400 to-purple-600"
          icon={<ListTodo className="text-white" />}
        />
        <DashboardCard
          title="Expenses"
          value="Rs. 10,480"
          gradient="from-green-400 to-green-600"
          icon={<Wallet className="text-white" />}
        />
        <DashboardCard
          title="Events"
          value={8}
          gradient="from-yellow-400 to-yellow-600"
          icon={<Calendar className="text-white" />}
        />
      </div>
    </main>
  );
}

export function DashboardCard({ title, value, icon, gradient }) {
  return (
    <div
      className={`flex items-center p-5 rounded-xl bg-gradient-to-r ${gradient} shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer`}
    >
      <div className="p-3 rounded-full bg-white/20">{icon}</div>
      <div className="ml-4">
        <p className="text-white opacity-90">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
