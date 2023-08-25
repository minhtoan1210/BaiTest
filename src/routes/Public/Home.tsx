import { AnyARecord } from 'dns'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { Button } from 'antd'

import _, { forEach } from 'lodash'

import { CardType, ImageType, ListUserType } from 'types'

import { getBegin, postDrawn, postShuffle } from 'services/titleServices'

import { listUser } from 'utils/fakeData'

import UserItem from './UserItem'

function show() {
  const percent = document.querySelectorAll('.is_active')
  const game = document.querySelectorAll('.game')
  if (percent.length == 0) {
    game.forEach(element => {
      element?.classList.add('is_active')
    })
  }
}

export default function HomePage(): JSX.Element {
  const [deckId, setDeckId] = useState()
  const [card, setCard] = useState<CardType>()
  const [cardItem, setCardItem] = useState< ImageType[][]>()
  const [openUp, setOpenUp] = useState<boolean>(false)
  const [numberCard, setNumberCard] = useState('')
  const [valueMax, setValueMax] = useState<number>()
  const [arrayNumber, setArrayNumber] = useState<string[][]>()
  const [valueSum, setValueSum] = useState<number[]>()
  const [valuePeace, setValuePeace] = useState<number[] | undefined>()
  const [flag, setFlag] = useState<boolean | undefined>()

  const game = useRef<HTMLDivElement>(null)

  const [listUsers, setUselistUsers] = useState<ListUserType[] | undefined>(listUser)

  const { data: dataBegin } = useQuery('getBegin', getBegin)

  useEffect(() => {
    if (dataBegin?.deck_id) {
      setDeckId(dataBegin.deck_id)
    }
  }, [dataBegin])

  useEffect(() => {
    let myTimeout: any
    if (flag) {
      if (game.current?.classList.value.includes('is_active')) {
        game.current?.classList.remove('is_active')
        myTimeout = setTimeout(show, 500)
      } else {
        myTimeout = setTimeout(show, 500)
      }
    }

    if (flag == false) {
      game.current?.classList.remove('is_active')
      myTimeout = setTimeout(show, 500)
    }

    return () => {
      clearTimeout(myTimeout)
    }
  }, [flag])

  const postShuffleMutate = useMutation(postShuffle, {
    onSuccess(res: any) {
      setNumberCard(res.remaining)
      setCardItem([])
    },
    onError: () => {},
  })

  const postDrawnMutate = useMutation(postDrawn, {
    onSuccess(res: any) {
      setCard(res)
      setNumberCard(res.remaining)
    },
    onError: () => {},
  })

  useEffect(() => {
    if (card) {
      setCardItem(_.chunk(card.cards, 3))
    }
  }, [card])

  useMemo(() => {
    if (cardItem) {
      const array: string[] = []
      let dem = -1

      cardItem?.forEach((element: any, y: number) => {
        element.forEach((x: any, i: number) => {
          if (x.code.slice(0, 1) === 'A') {
            array.push('1')
          } else if (
            x.code.slice(0, 1) === 'J' ||
            x.code.slice(0, 1) === 'Q' ||
            x.code.slice(0, 1) === 'K'
          ) {
            array.push('0')
          } else {
            array.push(x.code.slice(0, 1))
          }
        })
      })

      setArrayNumber(_.chunk(array, 3))

      const updatedUsers: ListUserType[] | undefined = listUsers?.map((element: ListUserType, index) => {
        if (element.status && cardItem.length > 0 ) {
          return { ...element, images: [...cardItem[(dem = dem + 1)]] }
        } else {
          return { ...element }
        }
      })

      setUselistUsers(updatedUsers)
    }
  }, [cardItem])

  useMemo(() => {
    if (arrayNumber) {
      let arraySum: number[] = []
      let arraySumAll: number[] = []
      arrayNumber?.forEach((x: any, y: any) => {
        arraySum.push(
          x.reduce(
            (accumulator: any, currentValue: any) => parseInt(accumulator) + parseInt(currentValue),
            0
          )
        )
      })

      arraySum.forEach((a: number, b: number) => {
        if (a >= 10 && a < 20) {
          arraySumAll.push(a - 10)
        } else if (a >= 20 && a < 30) {
          arraySumAll.push(a - 20)
        } else if (a === 30) {
          arraySumAll.push(a - 30)
        } else {
          arraySumAll.push(a)
        }
      })

      setValueSum(arraySumAll)

      setValuePeace([...new Set(arraySumAll)])
    }
  }, [arrayNumber])

  useMemo(() => {
    if (valueMax) {
      const updatedUsersWinnerLoser: any = listUsers?.map((e: any, index) => {
        if (e.status) {
         if (valuePeace?.length === 1) {
            return { ...e, nameWL: 'Hòa' }
          } else if (valueMax === e.value) {
             return { ...e, coins: e.coins + 900, nameWL: 'Winner' }
          } else {
            return { ...e, coins: e.coins - 900, nameWL: 'Loser' }
          }
        } else {
          return { ...e }
        }
      })

      setUselistUsers(updatedUsersWinnerLoser)
    }
  }, [valueMax])

  const hanldeShuffle = () => {
    if (deckId) {
    
      const remoteImages = listUsers?.map((x: ListUserType, y: number) => {
          return { ...x, images: [] }
      })

      setUselistUsers(remoteImages)

      postShuffleMutate.mutate({
        deck_id: deckId,
      })
    }
  }

  const hanldeReveal = () => {
    setOpenUp(true)
    if (valueSum) {
      let max = 0
      let dem = -1

      const updatedUsersValue = listUsers?.map((e: any, index) => {
        if (e.status) {
          return { ...e, value: valueSum[(dem = dem + 1)] }
        } else {
          return { ...e }
        }
      })

      setUselistUsers(updatedUsersValue)

      valueSum.forEach((e, index) => {
        if (e > max) {
          max = e
        }
      })

      setValueMax(max)
    }
  }

  const hanldeDrawn = () => {
    if (deckId) {
      setFlag(!flag)
      setOpenUp(false)
      let winner: any = []
      let dem = 0

      const updateUserCoin = listUsers?.map((x: ListUserType, y: number) => {
        if (x.coins >= 900) {
          dem = dem + 1
          return { ...x, images: [] }
        } else {
          return { ...x, status: false, images: [] }
        }
      })

      setUselistUsers(updateUserCoin)

      if (dem > 1) {
        if (parseInt(numberCard) > dem * 3) {
          postDrawnMutate.mutate({
            deck_id: deckId,
            count: dem * 3,
          })
        } else {
          alert('Số Lượng Bài Không Đủ')
        }
      } else {
        alert('Đã không còn ai còn tiền')
      }
    }
  }

  const hanldeReset = () => {
    if (deckId) {
      postShuffleMutate.mutate({
        deck_id: deckId,
      })
    }
    setUselistUsers(listUser)
  }

  return (
    <div className='game' ref={game}>
      <img src='https://images7.alphacoders.com/301/301522.jpg' className='background' />
      <div className='container'>
        <UserItem listUsers={listUsers} NumberCard={numberCard} openUp={openUp} />
        <div className="btn-button">
        <Button onClick={() => hanldeShuffle()}>Shuffle (Trộn Bài Lên)</Button>

        <Button onClick={() => hanldeDrawn()}>Drawn (Chia bài)</Button>

        <Button onClick={() => hanldeReveal()}>Reveal (Trả về kết quả)</Button>

        <Button onClick={() => hanldeReset()}>Reset (trạng thái ban đầu)</Button>
        </div>
      </div>
    </div>
  )
}
