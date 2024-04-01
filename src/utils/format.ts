import { DateTime } from 'luxon'
import { PandaConfig } from '../config.js'
const { defaultLocale } = PandaConfig

export function relativeTo(dateStr: string, locale = 'zh') {
    locale ??= 'zh'
    locale = defaultLocale // force to default language
    return DateTime.fromISO(dateStr).toRelative({
        base: DateTime.now(),
        locale: locale
    })
}

export function formatDateMD(dateStr: string, locale: string = 'zh') {
    const date = DateTime.fromISO(dateStr)
    locale = defaultLocale // force to default language
    if (locale === 'en') {
        return date.setLocale(locale).toFormat('dd, MMM')
    }
    return date.toFormat('MM-dd')
}

export function formatDateYMD(dateString: string, locale: string = 'zh') {
    locale = defaultLocale // force to default language
    const date = DateTime.fromISO(dateString)
    if (locale === 'en') {
        return date.setLocale(locale).toFormat('dd, MMM, yyyy')
    }
    return date.toFormat('yyyy-MM-dd')
}

export function slugifySpace(old: string) {
    return old.replace(/\s/g, '-')
}
