import React, { Component, Fragment } from 'react'
import { LoadingBar } from 'react-redux-loading';
import { connect } from 'react-redux'

//Components
import Header from './Header';
import Footer from './Footer';
import PostCard from './PostCard';
import ComentList from './ComentsList';
import { handleInitialDataPost } from '../actions/Shared';
import Filter from './Filter';

class PostDetail extends Component {
    componentDidMount() {
        const postID = this.props.match.params.id
        this.props.dispatch(handleInitialDataPost(postID))
    }

    renderUI = () => {
        const { post } = this.props
        return(
            <Fragment>
                <LoadingBar />
                <Header />
                <div id="main-content">
                    <div className="tb">
                        <div className="tb" id="m-col">
                            <div>
                                <PostCard id={post.id} showPostBody={1} showCommentForm={1}/>
                                <Filter />
                                <ComentList comments={post.postComments} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )

    }
    render() {
        return(
            <main>
                {this.props.loading === true
                    ? <div>Loading...</div>
                    :this.renderUI()
                }
            </main>
        )
    }
}

const mapStateToProps = ({ posts }) => {
    return {
        post:     posts[0],
        loading: posts[0] === undefined || posts[0].postComments === undefined
    }
}

export default connect(mapStateToProps)(PostDetail)
