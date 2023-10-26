export function sanitizeStringSearch(value: string): string {
    return value
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

export function sortedString<T = any>(field: string = "", optionsSorts: Intl.CollatorOptions = {}) {
    const locale = "pt-BR";

    optionsSorts = {
        ...optionsSorts,
        sensitivity: optionsSorts?.sensitivity ?? "variant",
    };

    if (!field) return Intl.Collator(locale, optionsSorts).compare;

    return (a: T, b: T): number =>
        (a[field as keyof T] as string)?.localeCompare(
            (b[field as keyof T] as string) ?? "",
            locale,
            optionsSorts
        );
}
