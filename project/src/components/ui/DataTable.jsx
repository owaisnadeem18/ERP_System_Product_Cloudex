export default function DataTable({ columns, data }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            {columns.map((col) => (
              <th key={col} className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                {col}
              </th>
            ))}
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-blue-50/30 transition-colors group">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.id}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{row.name}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{row.contact}</td>
              <td className="px-6 py-4 text-sm">
                {row.status === 1 ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Inactive
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right text-sm">
                <button className="text-blue-600 hover:text-blue-800 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}