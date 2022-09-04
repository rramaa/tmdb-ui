export default function HTML({markup, jsFiles, cache}) {
    return (
        <html>
            <head>
                <title>TMDB</title>
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
