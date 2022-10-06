import React from 'react'
import fetch from 'cross-fetch'
import { HTTPError } from 'pwa-kit-react-sdk/ssr/universal/errors'

const ContentDetails = ({ contentResult }) => {
    if (!contentResult) {
        return <div>Loading...</div>
    }
    return <div dangerouslySetInnerHTML={{ __html: contentResult.c_body }} />
}
ContentDetails.getProps = async ({ params }) => {
    let contentResult
    const result = await fetch(
        `http://localhost:3000/mobify/proxy/ocapi/s/RefArch/dw/shop/v20_2/content/${params.id}?client_id=d53e494e-20f4-4c40-9c22-b6f5146709aa`
   )
   if (result.ok) {
   contentResult = await result.json()
   } else {
   const error = await result.json()
   throw new HTTPError(result.status, error.fault.message)
   }
   return {contentResult}
}
ContentDetails.getTemplateName = () => 'content-details'
export default ContentDetails
