import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="assets/images/logo.jpg" />
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="description"
            content={
              "Matching people’s personalities with literature genres and specific books"
            }
          />
          <meta
            name="keywords"
            content={"Books, Book Match, Magazine, Subscription"}
          />
          <meta property="og:site_name" content="book-match" />
          <meta property="twitter:site" content="@book-match" />
          <meta property="twitter:card" content="summary" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="assets/images/logo.jpg" />
          <meta property="twitter:image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
