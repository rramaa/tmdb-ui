export default function HTML({markup, jsFiles}) {
    return (
        <html>
            <head>
                <title>TMDB</title>
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{__html: markup}}/>
                {
                    jsFiles.map(v => <script key={v} src={v}/>)
                }
            </body>
        </html>

    )
}
