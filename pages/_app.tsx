import '../styles/globals.scss'
import '../styles/loading_animation.scss'
import 'tailwindcss/tailwind.css'
import '../styles/percent_circle.scss'
import '../styles/item_card.scss'
import '../styles/image_accordion.scss'
import '../styles/gold_font.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
