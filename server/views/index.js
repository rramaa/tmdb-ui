export default function HTML({markup, jsFiles, cache, cssFiles, manifest}) {
    return (
        <html>
            <head>
                <title>TMDB</title>
                {
                    cssFiles.map(v => <link key={v} rel={"stylesheet"} href={manifest[`styles/${v}.css`]}/>)
                }
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{__html: markup}}/>
                <br />
                <script dangerouslySetInnerHTML={{__html: `window.__INTERNAL_DATA_CACHE__ = ${cache}`}} />
                <script dangerouslySetInnerHTML={{__html: `window.__LOADED_CSS__ = ${JSON.stringify(cssFiles)}`}} />
                <script dangerouslySetInnerHTML={{__html: `window.API_TOKEN = "${process.env.API_TOKEN}"`}} />
                {
                    jsFiles.map(v => <script key={v} src={manifest[`${v}.js`]}/>)
                }
            </body>
        </html>

    )
}
