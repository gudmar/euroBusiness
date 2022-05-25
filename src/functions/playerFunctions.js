const hasPlayerExtraCardsFunction = (state, playerColor) => {
    const extraCards = state?.playerSlice?.[playerColor]?.extraCards;
    if (extraCards === undefined) throw new Error(`playerFunctions, hasPlayerExtraCards: extra cards are undefined`);
    return state?.playerSlice?.[playerColor]?.extraCards.length > 0
}

const hasCurrentPlayerExtraCardsFunction = state => {
    const currentPlayer = state?.playerSlice?.currentPlayer;
    if (currentPlayer === undefined) throw new Error(`playerFunctions, hasCurrentPlayerExtraCards: currentPlayer is undefined`)
    return hasPlayerExtraCardsFunction(state, currentPlayer);
}

export { hasPlayerExtraCardsFunction, hasCurrentPlayerExtraCardsFunction };