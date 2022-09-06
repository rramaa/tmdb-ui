import React from "react";

export default function withCssFactory(cssFiles) {
    return function withCss(Component) {
        return function ComponentWithCss(props) {
            let [cssLoaded, updateCssLoaded] = React.useState(false)
            React.useEffect(() => {
                Promise.all(cssFiles.map(v => v())).then(() => {
                    updateCssLoaded(true)
                })
            }, [])
            if(!cssLoaded) {
                return null;
            }
            return <Component {...props} />
        }
    }
}
