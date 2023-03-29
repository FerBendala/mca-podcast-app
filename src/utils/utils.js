export const isExpired = ( time ) => {
    const timePassed = Date.now() - Number( time )
    const maxDuration = 24 * 60 * 60 * 1000

    return timePassed > maxDuration
}