interface Props {
  missingSections: string[];
  suggestions: string[];
}

export default function ATSSuggestions({
  missingSections,
  suggestions,
}: Props) {
  return (
    <div className="mt-6 rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-bold">ATS Improvements</h2>

      {/* Missing Sections */}

      <div className="mt-6">
        <h3 className="font-semibold text-red-600">Missing Sections</h3>

        <ul className="mt-3 space-y-2">
          {missingSections.length === 0 ? (
            <li className="text-green-600">✅ No missing sections</li>
          ) : (
            missingSections.map((item) => (
              <li key={item} className="text-sm text-gray-600">
                ❌ {item}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Suggestions */}

      <div className="mt-8">
        <h3 className="font-semibold text-blue-600">Suggestions</h3>

        <ul className="mt-3 space-y-2">
          {suggestions.map((item) => (
            <li key={item} className="text-sm text-gray-600">
              💡 {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
