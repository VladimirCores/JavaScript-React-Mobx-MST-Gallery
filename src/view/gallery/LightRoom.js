import React from 'react'
import DomElement from '../base/DomElement'
import Image from './Image'
import {observer} from 'mobx-react'

@observer class LightRoom extends DomElement {
	get image() { return this.props.data.image }
	render() {
		return (
			<div className={this.className}>
				<h1>IMAGE VIEWER</h1>
				<h3>{this.image.title}</h3>

				<Image
					width   = {this.image.width}
					height  = {this.image.height}
					url     = {this.image.path + this.image.name}
				/>
				<small>Press "Enter" to close</small>
			</div>
		)
	}
}

export default LightRoom