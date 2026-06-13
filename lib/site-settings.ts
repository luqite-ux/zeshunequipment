import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import { pickI18n, readExtra, type I18nField } from "@/lib/products-db-helpers"

export type SiteSettings = {
  siteTitle: string
  companyName: string
  siteDescription: string
  email: string
  phone: string
  phoneHref: string
  address: string
  businessHours: string
  socialLinks: Record<string, string>
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteTitle: "Zeshun Equipment",
  companyName: "JIANGYIN ZESHUN MACHINERY CO., LTD.",
  siteDescription:
    "JIANGYIN ZESHUN MACHINERY CO., LTD. specializes in stainless steel non-standard custom equipment, providing professional solutions for chemical, lithium battery, pharmaceutical, and food industries.",
  email: "info@zeshunequipment.com",
  phone: "+86 138 1513 8483",
  phoneHref: "tel:+8613815138483",
  address: "No.3 Railway Station Road, Yuecheng Town, Jiangyin City, Jiangsu Province, China",
  businessHours: "Mon - Sat: 8:00 AM - 6:00 PM",
  socialLinks: {},
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function toPhoneHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "")
  return cleaned ? `tel:${cleaned}` : DEFAULT_SITE_SETTINGS.phoneHref
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return DEFAULT_SITE_SETTINGS

  const { data, error } = await supabase
    .from("tenants")
    .select(
      "name, display_name, site_title_i18n, site_description_i18n, contact_email, contact_phone, contact_address_short, contact_address_i18n, social_links",
    )
    .eq("id", tenantId)
    .maybeSingle()

  if (error || !data) {
    if (error) console.error("[site-settings] getSiteSettings error:", error.message)
    return DEFAULT_SITE_SETTINGS
  }

  const siteTitle =
    pickI18n(data.site_title_i18n as I18nField, "en") ||
    readString(data.name) ||
    DEFAULT_SITE_SETTINGS.siteTitle
  const companyName = readString(data.name) || siteTitle
  const siteDescription =
    pickI18n(data.site_description_i18n as I18nField, "en") ||
    DEFAULT_SITE_SETTINGS.siteDescription
  const email = readString(data.contact_email) || DEFAULT_SITE_SETTINGS.email
  const phone = readString(data.contact_phone) || DEFAULT_SITE_SETTINGS.phone
  const address =
    pickI18n(data.contact_address_i18n as I18nField, "en") ||
    readString(data.contact_address_short) ||
    DEFAULT_SITE_SETTINGS.address

  return {
    ...DEFAULT_SITE_SETTINGS,
    siteTitle,
    companyName,
    siteDescription,
    email,
    phone,
    phoneHref: toPhoneHref(phone),
    address,
    socialLinks: readExtra(data.social_links) as Record<string, string>,
  }
}
