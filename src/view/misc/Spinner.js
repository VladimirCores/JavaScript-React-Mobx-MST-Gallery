import React from 'react'
import DomElement from '../base/DomElement'

class Spinner extends DomElement {
	render() {
		return (
			<div className={this.className}>
				<div className={`${this.className}_spin`}/>
			</div>
		)
	}
}

export default Spinner