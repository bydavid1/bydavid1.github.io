import React, { Component } from 'react';
import api from '../api'
import adPlaceholder from '../../../storage/static/ad-1.jpg'
import Post from '../components/Post.jsx'
import Loader from '../components/Loader.jsx';
import MetaTags from 'react-meta-tags';

class Tag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: {}
        }
    }

    componentDidMount() {
        let slug = this.props.match.params.slug
        api.get(`/tags/${slug}/posts`)
        .then(response => {
            this.setState({
                posts: response.data.posts
            })
        })
    }
    
    
    render() {
        return (
            <>
                <div className="page-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10">
                                <ul className="page-header-breadcrumb">
                                    <li><a href="index.html">Home</a></li>
                                    <li>Contacto</li>
                                </ul>
                                <h1>Contacto</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    {
                                    this.state.posts.length > 0 ? (
                                        this.state.posts.flatMap(post => 
                                            <div key={post._id} className="col-md-6">
                                            <Post style="thumb" title={post.title} cover={post.cover.url} date={post.date}
                                             category={post.category.title} postSlug={post.slug} categorySlug={post.category.slug}/>
                                            </div>
                                        )
                                        ) : (
                                            <Loader/>   
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="aside-widget text-center">
                                    <a href="#" style={{display: 'inline-block', margin: 'auto'}}>
                                        <img className="img-responsive" src={adPlaceholder} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Tag;