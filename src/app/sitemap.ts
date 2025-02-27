import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: 'https://bayesconsultants.com',
        },
        {
            url: 'https://bayesconsultants.com/about',
        },
        {
            url: 'https://bayesconsultants.com/services',
        },
        {
            url: 'https://bayesconsultants.com/case-studies',
        },
        {
            url: 'https://bayesconsultants.com/products',
        },
    ]

}