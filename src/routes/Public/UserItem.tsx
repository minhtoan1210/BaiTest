import { useCallback, useEffect, useMemo, useState } from 'react'

import _ from 'lodash'

import { ListUserType } from 'types'

type UserFormType = {
  NumberCard: string
  openUp: boolean
  listUsers: ListUserType[] | undefined
}
export default function UserItem({ listUsers, NumberCard, openUp }: UserFormType): JSX.Element {

  return (
    <>
      <div className='table'>
        {listUsers &&
          listUsers?.map((i, index) => (
            <div key={index}>
              <div className={`item${index}`}>
                <h4>{i.name}</h4>
                <h4>{i.coins}</h4>
                <h4>{openUp && i.nameWL}</h4>
                <h4>Tổng Cộng Điểm: {i.status && openUp && i.value}</h4>
                <div className='table-images' style={{ display: 'flex' }}>
                  <div className={`table-images${index}`}>
                  {i.images?.map((x, y) => {
                    return (
                        <img key={y}
                          src={openUp ? x.image : 'https:deckofcardsapi.com/static/img/back.png'}
                          alt=''
                          className='image-item'
                        />
                    )
                  })}
                  </div>
                </div>
                <h4>{i.status ? "" : "Bạn đã hết tiền"}</h4>
              </div>
            </div>
          ))}

        <div className='deck-cards'>
          <img src="https:deckofcardsapi.com/static/img/back.png" alt="" />
          <h1>{NumberCard} Lá Bài</h1>
        </div>
      </div>
    </>
  )
}