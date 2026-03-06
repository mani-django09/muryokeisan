interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <div className="content-section">
      <h2>よくある質問</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question">Q{index + 1}. {item.question}</div>
            <div className="faq-answer">{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
