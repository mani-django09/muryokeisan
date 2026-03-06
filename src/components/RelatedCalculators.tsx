import Link from 'next/link';

interface RelatedCalculator {
  title: string;
  href: string;
  description: string;
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[];
}

export default function RelatedCalculators({ calculators }: RelatedCalculatorsProps) {
  return (
    <section className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">関連する計算ツール</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {calculators.map((calc, index) => (
          <Link
            key={index}
            href={calc.href}
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <h3 className="font-semibold text-blue-600 mb-2">{calc.title}</h3>
            <p className="text-sm text-gray-600">{calc.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
