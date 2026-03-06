/**
 * Related Calculators Configuration
 * Defines which calculators are related to each other for internal linking
 */

export const relatedCalculators = {
  'bmi': [
    { title: '体脂肪率計算', href: '/body-fat-keisan', description: '体脂肪率を計算して健康管理' },
    { title: '年齢計算', href: '/age-keisan', description: '正確な年齢を簡単に計算' },
    { title: 'パーセント計算', href: '/percentage-keisan', description: 'BMI変化率の計算に便利' },
  ],
  'tax': [
    { title: '割引計算', href: '/discount-keisan', description: '割引後の価格を即座に計算' },
    { title: 'パーセント計算', href: '/percentage-keisan', description: '税率や割引率の計算' },
    { title: '所得税計算', href: '/income-tax-keisan', description: '所得税額を簡単に試算' },
  ],
  'days': [
    { title: '時間計算', href: '/time-keisan', description: '時間の加算・減算を計算' },
    { title: '年齢計算', href: '/age-keisan', description: '生年月日から年齢を計算' },
    { title: '出産予定日計算', href: '/due-date-keisan', description: '出産予定日を簡単に算出' },
  ],
  'time': [
    { title: '日数計算', href: '/days-keisan', description: '日付間の日数を計算' },
    { title: '時給計算', href: '/wage-keisan', description: '時給から月給・年収を試算' },
    { title: 'パーセント計算', href: '/percentage-keisan', description: '時間の割合を計算' },
  ],
  'percentage': [
    { title: '割引計算', href: '/discount-keisan', description: '割引率から価格を計算' },
    { title: '消費税計算', href: '/tax-keisan', description: '税込価格を即座に計算' },
    { title: 'BMI計算', href: '/bmi-keisan', description: 'BMI変化率の確認に' },
  ],
  'body-fat': [
    { title: 'BMI計算', href: '/bmi-keisan', description: '体格指数を簡単に計算' },
    { title: '年齢計算', href: '/age-keisan', description: '正確な年齢を確認' },
    { title: 'パーセント計算', href: '/percentage-keisan', description: '体脂肪率の変化を計算' },
  ],
  'due-date': [
    { title: '日数計算', href: '/days-keisan', description: '妊娠期間の日数を計算' },
    { title: '年齢計算', href: '/age-keisan', description: '出産時の年齢を確認' },
    { title: '時間計算', href: '/time-keisan', description: '陣痛間隔の計算に' },
  ],
  'discount': [
    { title: '消費税計算', href: '/tax-keisan', description: '割引後の税込価格を計算' },
    { title: 'パーセント計算', href: '/percentage-keisan', description: '割引率を簡単に計算' },
    { title: '所得税計算', href: '/income-tax-keisan', description: '節税額の試算に' },
  ],
  'age': [
    { title: '日数計算', href: '/days-keisan', description: '誕生日までの日数を計算' },
    { title: 'BMI計算', href: '/bmi-keisan', description: '年齢別の適正体重確認' },
    { title: '失業保険計算', href: '/unemployment-keisan', description: '年齢別の給付日数確認' },
  ],
  'property-tax': [
    { title: '所得税計算', href: '/income-tax-keisan', description: '所得税額を試算' },
    { title: 'パーセント計算', href: '/percentage-keisan', description: '税率の計算に便利' },
    { title: '固定資産税計算', href: '/property-tax-keisan', description: '固定資産税を試算' },
  ],
  'income-tax': [
    { title: '時給計算', href: '/wage-keisan', description: '年収から手取りを試算' },
    { title: '固定資産税計算', href: '/property-tax-keisan', description: '固定資産税を試算' },
    { title: 'パーセント計算', href: '/percentage-keisan', description: '税率の計算に' },
  ],
  'wage': [
    { title: '所得税計算', href: '/income-tax-keisan', description: '年収から税額を試算' },
    { title: '時間計算', href: '/time-keisan', description: '労働時間を正確に計算' },
    { title: '失業保険計算', href: '/unemployment-keisan', description: '失業時の給付額確認' },
  ],
  'unemployment': [
    { title: '時給計算', href: '/wage-keisan', description: '給与から月収を試算' },
    { title: '年齢計算', href: '/age-keisan', description: '給付日数の確認に' },
    { title: '所得税計算', href: '/income-tax-keisan', description: '失業給付の税金確認' },
  ],
};
