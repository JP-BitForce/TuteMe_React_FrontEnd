import React from 'react'

//Material UI
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import technology from '../../assets/images/landing page/courses/technology.jpg'
import programming from '../../assets/images/landing page/courses/programming.jpg'
import music from '../../assets/images/landing page/courses/music.jpg'
import science from '../../assets/images/landing page/courses/science.jpg'
import development from '../../assets/images/landing page/courses/development.jpg'
import design from '../../assets/images/landing page/courses/design.jpg'
import maths from '../../assets/images/landing page/courses/maths.jpg'
import managemnt from '../../assets/images/landing page/courses/management.jpg'

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
