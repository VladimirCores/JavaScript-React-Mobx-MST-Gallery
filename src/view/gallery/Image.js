import React from 'react'
import DomElement from '../base/DomElement'

class Image extends DomElement {
    render() {
        const style = {
            width: this.props.width,
            height: 'auto'
        }
        return (
            <img className={this.className} src={this.props.url} style={style}/>
        )
    }
}

export default Image
