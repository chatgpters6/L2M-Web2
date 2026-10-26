import type { Lang } from './i18n'

/*
 * SINGLE SOURCE OF TRUTH for the fictional DEMO company "Hartwell Fluid Systems".
 * Hartwell is not a real company, not an L2M customer and none of this was produced by an L2M model.
 * Every component that shows Hartwell facts must read them from here.
 * `pnpm check:demo` fails if product facts are hardcoded anywhere else.
 */

type Text = Record<Lang, string>

export const DEMO_COMPANY = {
  name: 'Hartwell Fluid Systems',
  shortName: 'Hartwell',
  legalName: 'Hartwell Fluid Systems Co., Ltd.',
  founded: 1998,
  domain: 'hartwell-demo.example',
  legacyHost: 'www.hartwell-demo.example',
  legacyCopyright: '2009-2016',
  tagline: { en: 'Industrial valves since 1998', zh: '始于 1998 年的工业阀门企业' } as Text,
} as const

export type DemoApplication = { key: string; name: Text; families: Text[] }

export const DEMO_APPLICATIONS: DemoApplication[] = [
  {
    key: 'water',
    name: { en: 'Water treatment', zh: '水处理' },
    families: [
      { en: 'Butterfly valves', zh: '蝶阀' },
      { en: 'Check valves', zh: '止回阀' },
      { en: 'Gate valves', zh: '闸阀' },
    ],
  },
  {
    key: 'chemical',
    name: { en: 'Chemical processing', zh: '化工' },
    families: [
      { en: 'Ball valves (316 SS)', zh: '球阀（316 不锈钢）' },
      { en: 'Check valves', zh: '止回阀' },
      { en: 'Sampling valves', zh: '取样阀' },
    ],
  },
  {
    key: 'food',
    name: { en: 'Food & beverage', zh: '食品饮料' },
    families: [
      { en: 'Sanitary ball valves', zh: '卫生级球阀' },
      { en: 'Butterfly valves', zh: '蝶阀' },
    ],
  },
  {
    key: 'hvac',
    name: { en: 'HVAC & building', zh: '暖通与楼宇' },
    families: [
      { en: 'Balancing valves', zh: '平衡阀' },
      { en: 'Butterfly valves', zh: '蝶阀' },
      { en: 'Strainers', zh: '过滤器' },
    ],
  },
]

export const DEMO_FAMILY_COUNT = new Set(DEMO_APPLICATIONS.flatMap((a) => a.families.map((f) => f.en))).size

export type DemoSpec = { key: string; label: Text; value: Text }

/** The one flagship product used in every section: hero, transformation, journey, report and What You Get. */
export const DEMO_PRODUCT = {
  model: 'H-200',
  series: 'Series H-200',
  legacyCode: 'HW-BV-200',
  applicationKey: 'chemical',
  category: { en: 'Ball valves', zh: '球阀' } as Text,
  name: { en: 'Series H-200 Ball Valve', zh: 'H-200 系列球阀' } as Text,
  summary: {
    en: 'Full-bore 316 stainless ball valve for corrosive process media.',
    zh: '用于腐蚀性工艺介质的 316 不锈钢全通径球阀。',
  } as Text,
  image: '/demo/valve.png',
  imageAlt: { en: 'Stainless steel ball valve (demo product image)', zh: '不锈钢球阀（演示产品图）' } as Text,
  specs: [
    { key: 'size', label: { en: 'Size range', zh: '通径范围' }, value: { en: 'DN15 – DN100', zh: 'DN15 – DN100' } },
    { key: 'pressure', label: { en: 'Pressure rating', zh: '压力等级' }, value: { en: 'PN40', zh: 'PN40' } },
    { key: 'material', label: { en: 'Body material', zh: '阀体材质' }, value: { en: '316 stainless steel', zh: '316 不锈钢' } },
    { key: 'connection', label: { en: 'Connection', zh: '连接方式' }, value: { en: 'Flanged / threaded', zh: '法兰 / 螺纹' } },
  ] as DemoSpec[],
  datasheet: {
    file: 'HW-BV-200 Specification.pdf',
    size: '2.3MB',
    label: { en: 'Datasheet PDF', zh: '规格书 PDF' } as Text,
  },
  /** The configuration a buyer asks about; carried into every inquiry example. */
  inquiry: {
    size: 'DN50',
    connection: { en: 'Flanged', zh: '法兰' } as Text,
    source: { en: 'Product page', zh: '产品页' } as Text,
  },
} as const

export const DEMO_LEGACY_PRODUCTS = [
  'HW-BV-101', 'HW-BV-102', 'HW-BV-115F', DEMO_PRODUCT.legacyCode, 'HW-BV-200S', 'HW-BF-301', 'HW-BF-305', 'HW-CV-410',
  'HW-CV-412', 'HW-GV-520', 'HW-GV-525', 'HW-SV-601', 'HW-ACC-01', 'HW-ACC-02',
]

export function demoApplication(key: string = DEMO_PRODUCT.applicationKey) {
  const app = DEMO_APPLICATIONS.find((a) => a.key === key)
  if (!app) throw new Error(`Unknown demo application: ${key}`)
  return app
}

export function demoSpec(key: string) {
  const spec = DEMO_PRODUCT.specs.find((s) => s.key === key)
  if (!spec) throw new Error(`Unknown demo spec: ${key}`)
  return spec
}

/** "H-200 · DN50 · Flanged" */
export function demoInquiryChip(lang: Lang) {
  return `${DEMO_PRODUCT.model} · ${DEMO_PRODUCT.inquiry.size} · ${DEMO_PRODUCT.inquiry.connection[lang]}`
}

/** Lines shown in every "context attached to the inquiry" example. */
export function demoInquiryContext(lang: Lang) {
  const zh = lang === 'zh'
  return [
    `${zh ? '型号' : 'Model'}: ${DEMO_PRODUCT.name[lang]}`,
    `${zh ? '规格' : 'Configuration'}: ${DEMO_PRODUCT.inquiry.size} · ${DEMO_PRODUCT.inquiry.connection[lang]}`,
    `${zh ? '应用' : 'Application'}: ${demoApplication().name[lang]}`,
    `${zh ? '来源页面' : 'Started from'}: ${DEMO_PRODUCT.inquiry.source[lang]}`,
  ]
}

export function demoDatasheetLabel(lang: Lang) {
  return `${DEMO_PRODUCT.datasheet.label[lang]} · ${DEMO_PRODUCT.datasheet.size}`
}
