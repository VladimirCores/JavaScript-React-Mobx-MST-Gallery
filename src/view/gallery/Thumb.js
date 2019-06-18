import React from 'react'
import DomElement from '../base/DomElement'
import {observer} from 'mobx-react'

@observer class Thumb extends DomElement {
	get className() {
		return super.className +
			(this.thumb.selected ? ' highlight' : '')
	}

	get thumb() {
		return this.props.data
	}

	componentDidUpdate() {
		if (this.thumb.selected)
			this.refs.dom.scrollIntoView(false)
	}

	render() {
		const style = {
			width: this.thumb.width,
			height: this.thumb.height,
			backgroundImage: `url(${this.thumb.path + this.thumb.name})`
		}
		return (
			<div className={this.className} ref="dom" style={style}/>
		)
	}
}

export default Thumb