function getWishlistKey(type) {
    return `${type}_wishlist`
}

export function addToWishlist(id, type) {
    let currentWishlist = getWishlist(type)
    currentWishlist.add(id)
    window.localStorage.setItem(getWishlistKey(type), JSON.stringify(Array.from(currentWishlist)))
    return currentWishlist
}

export function removeFromWishlist(id, type) {
    let currentWishlist = getWishlist(type)
    currentWishlist.delete(id)
    window.localStorage.setItem(getWishlistKey(type), JSON.stringify(Array.from(currentWishlist)))
    return currentWishlist
}

export function getWishlist(type) {
    try {
        return new Set(JSON.parse(window.localStorage.getItem(getWishlistKey(type)))) || []
    } catch (e) {
        return []
    }
}


