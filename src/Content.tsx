import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getContent, deleteContent } from './reducers/contentSlice'

const Content = ({ url, children, data, error, getContent, deleteContent }) => {
    useEffect(() => {
        getContent(url)
        return () => {
            deleteContent()
        }
    }, [url])

    return (
        <div className="main">
            <div className="header">{children}</div>
            <div className="content">
                <p>URL: {url}</p>
                {data.length === 0 ? <p>Loading ...</p> :
                    <div>
                        <p>Count: {data.length}</p>
                        <ul>
                            {data.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                }
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    )
}

const mapState = state => ({ data: state.content.data, error: state.content.error })

export default connect(mapState, { getContent, deleteContent })(Content)