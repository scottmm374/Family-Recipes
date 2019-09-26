import React from 'react';
import Tab from './Tab';


const Tabs = (props) => {

    return(
        <div className="tabs">
            <div className='catagories'>
                <span className='title'>Catagories</span>
                
                {props.tabs.map(tab => (
                    <div className='tab'><Tab tab={tab}/></div>
                ))}

            </div>
        </div>
    )
}

export default Tabs;