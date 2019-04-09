import React from 'react'
import DomElement from '../base/DomElement'

class LightRoom extends DomElement {
    render() {
        return (
            <div className={this.className}>
                <h1>IMAGE VIEWER</h1>
                <h3>{this.props.title}</h3>
                {this.props.children}
            </div>
        )
    }
}

export default LightRoom