import { Container, List, Paper, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { RankingItem } from '../../components'

const Ranking = ({ changePage }) => {
    useEffect(() => {
        changePage("ランキング")
    }, [])

    const list = [1, 2, 3, 4, 5, 6]

    return (
        <Container sx={{ mt: 4 }}>
            <List component={Paper}>
                {list.map((data, index) => {
                    return (
                        <RankingItem key={data} />
                    )
                })}
            </List>
        </Container>
    )
}

export default Ranking
