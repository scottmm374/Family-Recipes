import React from 'react';


const Tabs = (props) => {

    const tabClass = props.selectedTab === props.tab ? 'tab active-tab' : 'tab';

    const tabHandler = () => {
        props.changeSelected(props.tab)
    }

    console.log(props, 'Tabs')    

    return(
        <div className="tabs">
            <div className='catagories'>
                <span className='title'>Catagories</span>
                
                <div className={tabClass} onClick={tabHandler}>
                    All
                </div>
                <div className={tabClass} onClick={tabHandler}>
                    Breakfast
                </div>
                <div className={tabClass} onClick={tabHandler}>
                    Lunch
                </div>
                <div className={tabClass} onClick={tabHandler}>
                    Dinner
                </div>
                <div className={tabClass} onClick={tabHandler}>
                    Snacks
                </div>
                <div className={tabClass} onClick={tabHandler}>
                    Desserts
                </div>

            </div>
        </div>
    )
}

export default Tabs;