import React from 'react'

const Tab = props => {

    const tabClass = props.selectedTab === props.tab ? 'tab active-tab' : 'tab';

    const tabHandler = () => {
        props.changeSelected(props.tab)
    }

    return(
        <div className={tabClass} onclick={tabHandler}>
            {props.tab.category.toUpperCase()}
        </div>
    )

}

export default Tab;