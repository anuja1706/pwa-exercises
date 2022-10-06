import React from 'react'
import fetch from 'cross-fetch'
import { List, ListItem } from '@chakra-ui/react'
import Link from '../../components/link'


const ContentSearch = ({ contentResult }) => {
    if (!contentResult) {
        return <div>Loading...</div>
    }
    const { hits = [] } = contentResult
    return (
        <div>
            <h1>Search Results</h1>
            {hits.length ? (
                <List>
                    {hits.map(({ id, name }) => (
                        <ListItem key={id}>
                            <Link to={`/content/${id}`}>{name}</Link>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <div>No Content Items Found!</div>
            )}
        </div>
    )
}

ContentSearch.getProps = async () => {
    let contentResult
    const res = await fetch(
        `http://localhost:3000/mobify/proxy/ocapi/s/RefArch/dw/shop/v20_2/content_search?q=about&client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
    )
    if (res.ok) {
        contentResult = await res.json()
    }
    if (process.env.NODE_ENV !== 'production') {
        console.log(contentResult)
    }
    return { contentResult }
}

ContentSearch.getTemplateName = () => 'content-search'
export default ContentSearch