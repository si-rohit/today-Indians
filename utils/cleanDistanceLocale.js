// utils/cleanDistanceLocale.js
import { enUS } from 'date-fns/locale'

const cleanDistanceLocale = {
  ...enUS,
  formatDistance: (token, count, options) => {
    const formatDistanceLocale = {
      lessThanXSeconds: '{{count}} seconds',
      xSeconds: '{{count}} seconds',
      halfAMinute: '30 seconds',
      lessThanXMinutes: '{{count}} minutes',
      xMinutes: '{{count}} minutes',
      aboutXHours: '{{count}} hours',
      xHours: '{{count}} hours',
      xDays: '{{count}} days',
      aboutXWeeks: '{{count}} weeks',
      xWeeks: '{{count}} weeks',
      aboutXMonths: '{{count}} months',
      xMonths: '{{count}} months',
      aboutXYears: '{{count}} years',
      xYears: '{{count}} years',
      overXYears: '{{count}} years',
      almostXYears: '{{count}} years'
    }

    let result = formatDistanceLocale[token].replace('{{count}}', count)

    if (options?.addSuffix) {
      if (options.comparison > 0) {
        result = `in ${result}`
      } else {
        result = `${result} ago`
      }
    }

    return result
  }
}

export default cleanDistanceLocale
