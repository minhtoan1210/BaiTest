import { VITE_API_ENDPOINT as ENDPOINT } from 'constants/endPoint'

import httpRequest from './httpRequest'

const getBegin = (params: any): Promise<any> => {
  const obj = {
    url: `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
    options: { params },
  }

  return httpRequest.get(obj)
}

const postDrawn = (params: any): Promise<any> => {
  const obj = {
    url: `https://deckofcardsapi.com/api/deck/${params.deck_id}/draw/?count=${params.count}`,
    options: { params },
  }

  return httpRequest.get(obj)  
}

const postShuffle = (params: any): Promise<any> => {
  const obj = {
    url: `https://deckofcardsapi.com/api/deck/${params.deck_id}/shuffle`,
    options: { params },
  }

  return httpRequest.get(obj)
}

export { getBegin, postShuffle, postDrawn }
