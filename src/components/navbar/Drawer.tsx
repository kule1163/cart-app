import React, { useState } from 'react'
import { Drawer as MUIDrawer, Box, List, ListItem, ListItemText, ListItemIcon } from "@mui/material"
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'
import { menuItemList } from "../../utils/menuItemList"
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom'


interface StylesProps {
    showIcon: boolean;
}

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
    drawerBox: {
        width: "250px"
    },
    hideBox: {
        display: "none",

    },
    showCateg: {
        display: ({ showIcon }) => showIcon ? "block" : "none",
    },
}))

interface Props {
    handleClose: () => void;
    drawerToggle: boolean;
}

const Drawer = ({ handleClose, drawerToggle }: Props) => {

    const [showIcon, setShowIcon] = useState(true)
    const [currentIndex, setCurrentIndex] = useState<number>()

    const stylesProps = { showIcon }
    const classes = useStyles(stylesProps)

    const navigate = useNavigate()

    return (
        <MUIDrawer
            anchor="left"
            open={drawerToggle}
            onClose={handleClose}
        >
            <Box sx={{ marginTop: "1rem", marginLeft: "auto", marginRight: "1rem" }}>
                <GrClose style={{ cursor: "pointer" }} onClick={() => handleClose()} />
            </Box>
            <List>
                {menuItemList.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <ListItem
                            button
                            onClick={() => {
                                if (item.path) {
                                    navigate(item.path)
                                    handleClose()
                                }
                                setCurrentIndex(index)
                                if (index === currentIndex) {
                                    setShowIcon((prev) => !prev)
                                }
                                if (index !== currentIndex && showIcon === false) {
                                    setShowIcon(true)
                                }
                            }}
                        >
                            <ListItemIcon>
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                        {item.children && (
                            <Box className={index === currentIndex ? `${classes.showCateg}` : `${classes.hideBox}`}>
                                <item.children handleClose={handleClose} />
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </MUIDrawer>
    )
}

export default Drawer