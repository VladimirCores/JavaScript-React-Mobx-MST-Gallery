import React from 'react'
import DomElement from '../base/DomElement'
import Image from './Image'
import {observer} from 'mobx-react'

@observer class LightRoom extends DomElement {
	render() {
		return (
			<div className={this.className}>
				<h1>IMAGE VIEWER</h1>
				<h3>{this.props.data.image.title}</h3>
				<Image width={this.props.data.image.width}
					height={this.props.data.image.height}
					url={this.props.data.image.path + this.props.data.image.name}
				/>
				<small>Press "Enter" to close</small>
			</div>
		)
	}
}

export default LightRoom