const basePath = "https://image.tmdb.org/t/p/";
export default function Image({size, imagePath, alt, className}) {
    let srcPath = `${basePath}${size}${imagePath}`
    return <img alt={alt} src={srcPath} className={className} />
}
