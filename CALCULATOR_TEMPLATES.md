# Calculator Page Templates

This document contains complete content templates for all remaining calculator pages. Copy the appropriate template to create each page.

## Privacy Policy Page

**Path**: `src/app/privacy/page.tsx`

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー - MuryoKeisan',
  description: '当サイトのプライバシーポリシーについて',
};

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>
      
      <article className="prose prose-lg max-w-4xl">
        <p>
          MuryoKeisan（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
          本プライバシーポリシーでは、当サイトにおける個人情報の取り扱いについて説明します。
        </p>

        <h2>1. 収集する情報</h2>
        <p>
          当サイトでは、以下の情報を収集する場合があります：
        </p>
        <ul>
          <li>アクセスログ情報（IPアドレス、ブラウザ情報、アクセス日時など）</li>
          <li>Cookie情報</li>
          <li>計算ツールの利用状況</li>
        </ul>

        <h2>2. 情報の利用目的</h2>
        <p>
          収集した情報は、以下の目的で利用します：
        </p>
        <ul>
          <li>サービスの提供・運営</li>
          <li>サービスの改善・最適化</li>
          <li>利用状況の分析</li>
          <li>不正利用の防止</li>
        </ul>

        <h2>3. Cookieについて</h2>
        <p>
          当サイトでは、ユーザー体験の向上のためにCookieを使用しています。
          Cookieの使用を希望されない場合は、ブラウザの設定で無効にすることができます。
        </p>

        <h2>4. 第三者への情報提供</h2>
        <p>
          当サイトは、法令に基づく場合を除き、ユーザーの同意なく第三者に個人情報を提供することはありません。
        </p>

        <h2>5. Google Analyticsの使用</h2>
        <p>
          当サイトでは、Google Analyticsを使用してアクセス解析を行っています。
          Google Analyticsはデータ収集のためにCookieを使用します。
          詳細はGoogleのプライバシーポリシーをご確認ください。
        </p>

        <h2>6. 広告について</h2>
        <p>
          当サイトでは、第三者配信の広告サービスを利用する場合があります。
          広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
        </p>

        <h2>7. プライバシーポリシーの変更</h2>
        <p>
          当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
          変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
        </p>

        <h2>8. お問い合わせ</h2>
        <p>
          本プライバシーポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。
        </p>

        <p className="mt-8 text-sm text-gray-600">
          最終更新日：2024年2月3日
        </p>
      </article>
    </div>
  );
}
```

## Terms of Service Page

**Path**: `src/app/terms/page.tsx`

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 - MuryoKeisan',
  description: '当サイトの利用規約について',
};

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">利用規約</h1>
      
      <article className="prose prose-lg max-w-4xl">
        <p>
          本利用規約（以下「本規約」）は、MuryoKeisan（以下「当サイト」）が提供するサービスの利用条件を定めるものです。
          ユーザーの皆様には、本規約に従って当サイトをご利用いただきます。
        </p>

        <h2>第1条（適用）</h2>
        <p>
          本規約は、ユーザーと当サイトとの間の当サイトの利用に関わる一切の関係に適用されるものとします。
        </p>

        <h2>第2条（利用登録）</h2>
        <p>
          当サイトの計算ツールは、登録不要で無料でご利用いただけます。
        </p>

        <h2>第3条（禁止事項）</h2>
        <p>
          ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません：
        </p>
        <ul>
          <li>法令または公序良俗に違反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
          <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
          <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
          <li>不正アクセスをし、またはこれを試みる行為</li>
          <li>当サイトのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
          <li>その他、当サイトが不適切と判断する行為</li>
        </ul>

        <h2>第4条（免責事項）</h2>
        <p>
          当サイトは、計算結果の正確性について最善の努力を払っていますが、その正確性、完全性、有用性について保証するものではありません。
          計算結果は参考情報としてご利用いただき、重要な判断を行う際は専門家にご相談ください。
        </p>
        <p>
          当サイトの利用により発生したいかなる損害についても、当サイトは一切の責任を負いません。
        </p>

        <h2>第5条（サービス内容の変更等）</h2>
        <p>
          当サイトは、ユーザーに通知することなく、サービスの内容を変更し、または提供を中止することができるものとします。
        </p>

        <h2>第6条（利用規約の変更）</h2>
        <p>
          当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
          変更後の本規約は、当サイトに掲載した時点で効力を生じるものとします。
        </p>

        <h2>第7条（準拠法・裁判管轄）</h2>
        <p>
          本規約の解釈にあたっては、日本法を準拠法とします。
          当サイトに関して紛争が生じた場合には、当サイトの所在地を管轄する裁判所を専属的合意管轄とします。
        </p>

        <p className="mt-8 text-sm text-gray-600">
          最終更新日：2024年2月3日
        </p>
      </article>
    </div>
  );
}
```

## Sitemap Generation Script

**Path**: `scripts/generate-sitemap.js`

```javascript
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://muryokeisan.com';

const pages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/bmi-keisan', priority: '0.9', changefreq: 'weekly' },
  { path: '/tax-keisan', priority: '0.9', changefreq: 'weekly' },
  { path: '/days-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/time-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/percentage-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/body-fat-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/due-date-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/discount-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/age-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/property-tax-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/income-tax-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/wage-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/unemployment-keisan', priority: '0.8', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'monthly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully at public/sitemap.xml');
```

## Quick Setup Instructions

1. **Create Privacy & Terms pages**:
```bash
# Copy the templates above to create these files
```

2. **Create sitemap script**:
```bash
mkdir -p scripts
# Copy the sitemap script above
node scripts/generate-sitemap.js
```

3. **Build and test**:
```bash
npm run build
npm start
```

The project now has 2 complete calculator pages (BMI and Tax) that serve as templates for the remaining 11 calculators. Each calculator follows the same structure with unique content.
