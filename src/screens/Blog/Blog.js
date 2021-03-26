import React, { Component } from 'react'

import Loading from '../../components/Loading/Loading'
import ChipButton from '../../components/Button/ChipButton'
import BlogCard from '../../components/Card/BlogCard'
import Selector from '../../components/Input/Selector'

//Material-UI
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';

import minimal_avatar from '../../assets/images/shared/minimal_avatar.jpg'
import cover_12 from '../../assets/images/shared/cover_12.jpg'
import './Blog.css'

class Blog extends Component {
    state = {
        loading: false,
        searchValue: "",
        filterValue: "Latest",
        filterOptions: ["Latest", "Oldest", "Popular", "My Blogs"]
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

    handleBlogsSearch = (event) => {
        event.preventDefault();
        event.stopPropagation();
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
                        </ol>
                    </div>
                </div>
                <div className = "header_content_right">
                    <ChipButton label = "New Blog" icon = {<Add/>}/> 
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

    renderRootContainer = () => {
        return (
            <div className = "blog_root_container">
                <div className = "blog_root_header">
                    { this.renderHeader() }
                </div>
                <div className = "blog_main_container">
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
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className = "blog_root_div">
                {
                    this.state.loading ? 
                    <Loading/>
                    :
                    this.renderRootContainer()
                }
            </div>
        )
    }
}

export default Blog