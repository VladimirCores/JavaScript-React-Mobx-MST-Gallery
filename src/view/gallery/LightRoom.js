import React from 'react'
import DomElement from '../base/DomElement'

class LightRoom extends DomElement {
    render() {
        return (
            <div className={this.className}>
                <h1 style={{color: 'white'}}>IMAGE VIEWER</h1>
                {this.props.children}
            </div>
        )
    }
}

export default LightRoom