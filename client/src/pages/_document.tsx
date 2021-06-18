import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <title>The Pit Stop</title>
          <link rel="icon" type="image/png" href="/pitstop.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <meta property="og:site_name" content="The Pit Stop" />
          <meta property="twitter:site" content="@jaydjhangiani" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/pitstop.png`} />
          <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/pitstop.png`} />
          <meta property="twitter:card" content="We at ‘The Pit Stop’ believe in equipping you with all that you need to know about current affairs, entertainment, technology, sport, fashion.... your window to the world!" />

          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600&display=swap"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
            integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
            crossOrigin="anonymous"
          />
        </Head>
        <body className="font-body" style={{ backgroundColor: '#f5f5f5' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument