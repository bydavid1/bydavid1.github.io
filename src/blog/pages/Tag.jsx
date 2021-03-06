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

class Tag extends React.Component {

    constructor(props) {
        super(props);

        //data is reactive for component changes to work
        this.state = {
            tag: {},
            posts: {},
            loading: true,
            status: 0
        }
    }

    componentDidMount() {
        let slug = this.props.match.params.slug
        api.get(`/tags/${slug}/posts`)
        .then(response => {
            this.setState({
                posts: response.data.posts,
                tag: response.data.tag,
                loading: false,
                status: response.status
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    status: error.response.status
                })
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match !== prevProps.match) {
            //Show loader if tag is different
            this.setState({
                loading: true,
            })

            let slug = this.props.match.params.slug
            api.get(`/tags/${slug}/posts`)
            .then(response => {
                this.setState({
                    posts: response.data.posts,
                    tag: response.data.tag,
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
                                <SEO info={this.state.tag.SEO}/>
                                <div className="page-header">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-10">
                                                <ul className="page-header-breadcrumb">
                                                    <li><Link to="/">Inicio</Link></li>
                                                    <li>Tag</li>
                                                    <li>{this.state.tag.name}</li>
                                                </ul>
                                                <h1>{this.state.tag.name}</h1>
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

export default withError(Tag);