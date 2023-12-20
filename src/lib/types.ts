export type Categories = "sveltkit" | "svelte"

export type Post = {
    title: string,
    slug: string,
    description: string,
    date: string,
    categories: string[],
    published: boolean,
    url?: string,
}
