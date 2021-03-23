import React from 'react'

//Material UI
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import technology from '../../assets/images/shared/technology.jpg'
import programming from '../../assets/images/shared/programming.jpg'
import music from '../../assets/images/shared/music.jpg'
import science from '../../assets/images/shared/science.jpg'
import development from '../../assets/images/shared/development.jpg'
import design from '../../assets/images/shared/design.jpg'
import maths from '../../assets/images/shared/maths.jpg'
import managemnt from '../../assets/images/shared/management.jpg'

import './ImageGrid.css'

const ImageGrid = () => {

    const list = [
        {key:"0", src:technology, alt:"tech", title:"Technology"},
        {key:"1", src:music, alt:"music", title:"Music"},
        {key:"2", src:science, alt:"science", title:"Science"},
        {key:"3", src:programming, alt:"programming", title:"Programming"},
        {key:"4", src:development, alt:"dev", title:"App Development"},
        {key:"5", src:managemnt, alt:"managemnt", title:"Managemnt"},
        {key:"6", src:maths, alt:"maths", title:"Mathematics"},
        {key:"7", src:design, alt:"design", title:"Garphics Design"},
    ]


    return (
        <div className = "grid_root">
            <GridList className = "grid_list" cols={4}>
                {
                    list.map(item => {
                        const {key, src, alt, title} = item
                        return (
                            <GridListTile key={key} className = "grid_list_block">
                                <img src={src} alt={alt} className = "grid_image"/>
                                <div class="middle">
                                    <div class="text">View Courses</div>
                                </div>
                                <GridListTileBar
                                    title={title}
                                    className = "title_bar"
                                    actionIcon={
                                        <IconButton aria-label={`star ${title}`}>
                                            <StarBorderIcon className = "title" />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        )
                    })
                }
            </GridList>
        </div>
    )
}

export default ImageGrid
