export default function FeesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">Fee Structure</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 font-semibold text-slate-700">Program</th>
              <th className="p-4 font-semibold text-slate-700">Duration</th>
              <th className="p-4 font-semibold text-slate-700">Tuition Fee (Per Year)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 text-slate-900 font-medium">B.Tech</td>
              <td className="p-4 text-slate-600">4 Years</td>
              <td className="p-4 text-blue-700 font-semibold">₹1,00,000</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 text-slate-900 font-medium">MBA</td>
              <td className="p-4 text-slate-600">2 Years</td>
              <td className="p-4 text-blue-700 font-semibold">₹1,50,000</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="p-4 text-slate-900 font-medium">BBA</td>
              <td className="p-4 text-slate-600">3 Years</td>
              <td className="p-4 text-blue-700 font-semibold">₹80,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Payment Information</h3>
        <p className="text-slate-700 text-sm leading-relaxed">
          Fees can be paid semester-wise. We accept Net Banking, UPI, and major Credit/Debit cards. 
          Education loan assistance is available through our partnered banks.
        </p>
      </div>
    </div>
  );
}