export default function HTML({markup, jsFiles, cache, cssFiles}) {
    return (
        <html>
            <head>
                <title>TMDB</title>
                {
                    cssFiles.map(v => <link key={v} rel={"stylesheet"} href={v}/>)
                }
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{__html: markup}}/>
                <br />
                <script dangerouslySetInnerHTML={{__html: `window.__INTERNAL_DATA_CACHE__ = ${cache}`}} />
                <script dangerouslySetInnerHTML={{__html: `window.API_TOKEN = "${process.env.API_TOKEN}"`}} />
                {
                    jsFiles.map(v => <script key={v} src={v}/>)
                }
            </body>
        </html>

    )
}
