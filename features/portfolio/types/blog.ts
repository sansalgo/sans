export type BlogPost = {
  slug: string
  metadata: {
    title: string
    image?: string
    createdAt: string
    new?: boolean
    updated?: boolean
  }
}
