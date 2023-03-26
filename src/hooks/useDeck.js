import { useState, useEffect, useRef } from "react";
import calculateSnapOdds from "../calculateSnapOdds";
import { createDeck, drawCard as drawCardApi } from "../api";

export default function useDeck() {
  const [deckId, setDeckId] = useState();
  const [cards, setCards] = useState([]);
  const [deckStatus, setDeckStatus] = useState("idle");
  const [cardStatus, setCardStatus] = useState("idle");
  const [isReset, setIsReset] = useState(true);
  const valueSnapCount = useRef(0);
  const suitSnapCount = useRef(0);

  const isValueSnap = cards[1]?.value && cards[1]?.value === cards[0]?.value;
  const isSuitSnap = cards[1]?.suit && cards[1]?.suit === cards[0]?.suit;
  const cardsRemaining = cards[0]?.remaining ?? 52;
  const snapOdds = calculateSnapOdds(cards, cardsRemaining);

  useEffect(() => {
    async function fetchDeck() {
      try {
        setDeckStatus("loading");
        const newDeck = await createDeck();
        setDeckId(newDeck.deck_id);
        setDeckStatus("completed");
      } catch (error) {
        setDeckStatus("error");
        console.error("Error fetching data:", error);
      }
    }
    if (isReset) {
      fetchDeck();
      setIsReset(false);
    }
  }, [isReset]);

  useEffect(() => {
    if (isValueSnap) {
      valueSnapCount.current += 1;
    }
  }, [isValueSnap]);

  useEffect(() => {
    if (isSuitSnap) {
      suitSnapCount.current += 1;
    }
  }, [isSuitSnap]);

  async function drawCard() {
    try {
      setCardStatus("loading");
      const drawnCard = await drawCardApi(deckId);
      setCards((prevCards) => [
        { ...drawnCard.cards[0], remaining: drawnCard.remaining },
        ...prevCards,
      ]);
      setCardStatus("completed");
    } catch (error) {
      setCardStatus("error");
      console.error("Error fetching data:", error);
    }
  }

  function reset() {
    setDeckId();
    setCards([]);
    setIsReset(true);
  }

  return {
    deckStatus,
    cardStatus,
    cards,
    cardsRemaining,
    snapOdds,
    isValueSnap,
    isSuitSnap,
    valueSnapCount: valueSnapCount.current,
    suitSnapCount: suitSnapCount.current,
    drawCard,
    reset,
  };
}
