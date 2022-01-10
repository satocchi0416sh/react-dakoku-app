import { Avatar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const AvaterItem = ({ name, img }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar alt={name} src={img} />
            <Typography variant="caption">{name}</Typography>
        </Box>
    )
}

export default AvaterItem
