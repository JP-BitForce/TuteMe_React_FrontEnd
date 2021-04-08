import React, {useRef, useEffect} from 'react'

//Material-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './Blog.css'

const BlogPreview = ({open, handleClose, content, cover, title}) => {
    const descriptionElementRef = useRef(null);

    useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    const renderContent = () => {
        return (
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="cover image"
                        height="140"
                        image = {cover}
                        title="cover image"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Preview</DialogTitle>
                <DialogContent dividers={'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                    { 
                        content ? renderContent() 
                        :
                        <span>No contents to preview</span>
                    }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> ok </Button>
                </DialogActions>
        </Dialog>
    )
}

export default BlogPreview
