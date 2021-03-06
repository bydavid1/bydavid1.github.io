//Core
import React, { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom';
//Components
import { withError } from '../components/ErrorBoundary.jsx';
import SEO from '../components/SEO.jsx'
import Post from '../components/Post.jsx'
import Loader from '../components/Loader.jsx';
import PageLoader from '../components/PageLoader.jsx'
const NotFound = lazy(() => import('../components/NotFound.jsx'));
//Services
import api from '../api'
//Assets
import adPlaceholder from '../../../storage/static/ad.svg'

class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            status: 0
        }

        this.category = {}
        this.posts = {}
    }
    

    componentDidMount() {
        let slug = this.props.match.params.slug
        api.get(`/categories/${slug}/posts`)
        .then(response => {
            this.category = response.data.category
            this.posts = response.data.posts

            this.setState({
                loading: false,
                status: response.status
            })
        })
        .catch(error => {
            this.setState({
                loading: false,
                status: error.response.status
            })
        })

    }
    
    render() {
        return (
            <>
                {
                    this.state.loading === true ? (
                        <Loader/>
                    ) : (
                        this.state.status === 200 ? (
                            <>
                                <SEO info={this.category.SEO}/>
                                <div className="page-header">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <ul className="page-header-breadcrumb">
                                                    <li><Link to="/">Inicio</Link></li>
                                                    <li>Category</li>
                                                </ul>
                                                <h1>{this.category.title}</h1>
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
                                                    this.posts.length > 0 ? (
                                                        this.posts.flatMap(post => 
                                                            <div key={post._id} className="col-md-6">
                                                            <Post style="thumb" title={post.title} cover={post.cover.url} date={post.date}
                                                            category={this.category.title} postSlug={post.slug} categorySlug={this.category.slug}/>
                                                            </div>
                                                        )
                                                        ) : (
                                                            <h3>No se encontraron articulos</h3>  
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
                        ) : (
                            <Suspense fallback={<PageLoader/>}>
                                <NotFound/>
                            </Suspense>
                        )
                    )
                }
            </>
        )
    }
}

export default withError(Category);