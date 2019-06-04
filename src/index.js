import React from 'react'
import ReactDOM from 'react-dom'
import GalleryLoader from './model/loader/GalleryLoader'
import GalleryController from './view/gallery/GalleryController'
import Spinner from './view/misc/Spinner'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: null
    }
  }

  componentDidMount() {
    new GalleryLoader().load((data) => {
      this.setState({
        data: data,
        loading: false
      })
    })
  }

  renderGallery() {
    let images = this.state.data.images
    let Controller = GalleryController(images)
    return <Controller/>
  }

  render() {
    return (<div> {this.state.loading ?
      <Spinner/> : this.renderGallery()} </div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('Root'))
