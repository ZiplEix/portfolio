type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date:string, dateStyle: DateStyle = 'medium', locales = 'fr') {
    const [day, month, year] = date.split('-').map(Number);

    const formattedDate = new Date(year, month - 1, day);

    const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
    return formatter.format(formattedDate);
}
