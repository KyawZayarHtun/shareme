import {createClient} from '@sanity/client'
import imgUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: 'v1',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKENS,
  ignoreBrowserTokenWarning: true
})

const builder = imgUrlBuilder(client)
export const urlFor = source => builder.image(source)