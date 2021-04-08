import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import ChipButton from '../../components/Button/ChipButton'
import BlogCard from '../../components/Card/BlogCard'
import Selector from '../../components/Input/Selector'
import HeaderCard from '../../components/Header/HeaderCard'
import NewBlog from './NewBlog'
import BlogPreview from './BlogPreview'

//Boostarp
import Form from "react-bootstrap/Form";

//Material-UI
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import Dialpad from '@material-ui/icons/Dialpad';
import HowToReg from '@material-ui/icons/HowToReg';

import minimal_avatar from '../../assets/images/shared/minimal_avatar.jpg'
import cover_12 from '../../assets/images/shared/cover_12.jpg'
import headerImg from '../../assets/images/Blog/headerImg.jpg'
import './Blog.css'

class Blog extends Component {
    state = {
        loading: false,
        searchValue: "",
        filterValue: "Latest",
        filterOptions: ["Latest", "Oldest", "Popular", "My Blogs"],
        tabValue: 2,
        currentTab: "All",
        title: "",
        description: "",
        content: "",
        addBlogFormValidated: false,
        file: null,
        cover: null,
        previewOn: false
    }

    tab_links = ["All", "Own"]

    icons = {
        All: <Dialpad/>,
        Own: <HowToReg/>,
    }

    blogs = [
        {
            src: cover_12, 
            avatar: minimal_avatar, 
            date: "12 November 2020",
            description: "Katie Griffin loves making that homey art",
            comments: "11.2k",
            likes: "24k" 
        },
        {
            src: cover_12, 
            avatar: minimal_avatar, 
            date: "12 November 2020",
            description: "Katie Griffin loves making that homey art",
            comments: "11.2k",
            likes: "24k" 
        },
    ]

    handleAddNewBlog = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            addBlogFormValidated: !form.checkValidity(),
        });

        // const { title, description, content, file} = this.state

    }

    handleBlogsSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    handleInputOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSearchOnChange = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }

    handleFilterOnChnage = (event) => {
        this.setState({
            filterValue: event.target.value
        })
    }

    handleTabChange = (newValue) => {
        this.setState({
            tabValue: newValue,
            currentTab: this.tab_links[newValue]
        })
    }

    addNewBlockOnClick = () => {
        this.setState({
            tabValue: 2,
            currentTab: "New"
        })
    }

    handleQuillOnChange = (value) => {
        this.setState({ content: value })
    }

    handleCoverPicOnSelect = (file) => {
        let reader = new FileReader()
        reader.onloadend = () => {
            this.setState({ 
                cover: reader.result,
                file 
            });
        }
        reader.readAsDataURL(file)
    }

    handleImgRemover = () => {
        this.setState({ 
            cover: null,
            file : null
        });
    }

    handlePreviewOnClick = () => {
        this.setState({ previewOn: true })
    }

    handlePreviewOnClose = () => {
        this.setState({ previewOn: false })
    }

    renderSearchField = () => {
        return (
            <TextField 
                id="input-with-icon-adornment"
                label="Search"
                variant="outlined" 
                onChange = {this.handleSearchOnChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    )
                }}
                size="small"
            />
        )
    }

    renderHeader = () => {
        return (
            <div className = "header_content">
                <div className = "header_content_left">
                    <h4 className = "css-1ey68ak-MuiTypography-root">Blog</h4>
                    <div className = "css-1h2cv8e-MuiTypography-root-MuiBreadcrumbs-root">
                        <ol className = "css-4pdmu4-MuiBreadcrumbs-ol">
                            <li>Management</li>
                            <li aria-hidden = {true} className = "MuiBreadcrumbs-separator css-1wuw8dw-MuiBreadcrumbs-separator">
                                <span className = "seperator_dot"/>
                            </li>
                            <li>Blog</li>
                            <li aria-hidden = {true} className = "MuiBreadcrumbs-separator css-1wuw8dw-MuiBreadcrumbs-separator">
                                <span className = "seperator_dot"/>
                            </li>
                            <li>{this.state.currentTab}</li>
                        </ol>
                    </div>
                </div>
                <div className = "header_content_right">
                    <ChipButton label = "New Blog" icon = {<Add/>} handleClick = {this.addNewBlockOnClick}/> 
                </div>
            </div>
        )
    }

    renderBlogs = () => {
        return (
            <div className = "blogs_container">
                <Grid container spacing={4}>
                    {
                        this.blogs.map(item => {
                            const {date, avatar, description, comments, likes, src} = item
                            return (
                                <Grid item xs={6} sm={6} md={3}>
                                    <BlogCard
                                        src = {src}
                                        avatar = {avatar}
                                        date = {date}
                                        description = {description}
                                        comments = {comments}
                                        likes = {likes}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        )
    }

    renderAllBlogContainer = () => {
        return (
            <>
            <div className = "blog_search_block">
                <form noValidate autoComplete="off" onSubmit = {this.handleBlogsSearch}>
                    { this.renderSearchField() }
                </form>
                <Selector
                    value = {this.state.filterValue}
                    onChange = {this.handleFilterOnChnage}
                    options = {this.state.filterOptions}
                />
            </div>
            { this.renderBlogs() }
            </>
        )
    }

    renderOwnBlogContainer = () => {
        return (
            <>
            <div className = "blog_search_block">
                <form noValidate autoComplete="off" onSubmit = {this.handleBlogsSearch}>
                    { this.renderSearchField() }
                </form>
                <Selector
                    value = {this.state.filterValue}
                    onChange = {this.handleFilterOnChnage}
                    options = {this.state.filterOptions}
                />
            </div>
            </>
        )
    }

    renderCreateNewBlock = () => {
        return (
            <div className = "create_new_block_container_root">
                <Form
                    onSubmit={this.handleAddNewBlog}
                    noValidate
                    validated={this.state.addBlogFormValidated}
                >
                    <NewBlog
                        values = {this.state}
                        handleOnChange = {this.handleInputOnChange}
                        handleQuillOnChange = {this.handleQuillOnChange}
                        handleCoverPicOnSelect = {this.handleCoverPicOnSelect}
                        handleImgRemover = {this.handleImgRemover}
                        handlePreviewOnClick = {this.handlePreviewOnClick}
                    />
                </Form>
            </div>
        )
    }

    renderMainContainer = () => {
        switch(this.state.tabValue) {
            case 0 : return this.renderAllBlogContainer()
            case 1 : return this.renderOwnBlogContainer()
            case 2 : return this.renderCreateNewBlock()
            default : return this.renderAllBlogContainer()
        }
    }

    renderRootContainer = () => {
        return (
            <div className = "blog_root_container">
                <div className = "blog_root_header">
                    { this.renderHeader() }
                </div>
                <div>
                    <HeaderCard
                        tabs = {this.tab_links}
                        src = {headerImg}
                        icons = {this.icons}
                        tabValue = {this.state.tabValue}
                        handleTabChange = {this.handleTabChange}
                    />
                </div>
                <div className = "blog_main_container">
                    { this.renderMainContainer() }
                </div>
            </div>
        )
    }

    render() {
        const {previewOn, title, content, cover} = this.state
        return (
            <div className = "blog_root_div">
                {
                    this.state.loading ? 
                    <Loading/>
                    :
                    this.renderRootContainer()
                }
                <BlogPreview
                    open = {previewOn}
                    handleClose = {this.handlePreviewOnClose}
                    title = {title}
                    content = {content}
                    cover = {cover}
                />
            </div>
        )
    }
}

export default Blog