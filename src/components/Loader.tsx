import React from 'react'
import { ColorRing } from 'react-loader-spinner'
export const Loader = () => {
    return (
        <div style={{textAlign:"center" , paddingTop:"40px"}}>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#144123', '#144123', '#144123', '#144123', '#144123']}
            />
        </div>
    )
}
