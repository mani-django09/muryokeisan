'use client';

export default function TodayDate() {
  const formatted = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return <span>{formatted}</span>;
}