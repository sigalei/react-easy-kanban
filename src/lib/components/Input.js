import React from 'react'
import styled from 'styled-components'
import AutosizeInput from 'react-input-autosize'
import PropTypes from 'prop-types'

const Content = styled.p`
  color: white;
  text-align: center;
  background: transparent;
  border: none;
  font-size: 18px;
  word-wrap: break-word;
  word-break: break-all;
  max-width: 150px;
`
const KEYBOARD_ENTER_CODE = 13

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false
    }
  }

  changeState() {
    this.setState({ status: !this.state.status })
  }

  handleKeyDown(e) {
    if (e.keyCode === KEYBOARD_ENTER_CODE) this.changeState()
  }

  render() {
    const { value } = this.props

    return this.state.status ? (
      <AutosizeInput
        type="textarea"
        name="name"
        autoFocus
        value={value}
        onChange={e => this.props.onChange(e.target.value)} // TODO Solve this change
        onClick={() => this.changeState()}
        onKeyDown={e => this.handleKeyDown(e)}
        inputStyle={{
          color: 'white',
          textAlign: 'center',
          background: 'transparent',
          border: 'none',
          fontSize: '18px',
          wordWrap: 'break-word',
          wordBreak: 'break-all',
          outline: 'none',
          padding: '15px',
          alignSelf: 'center',
          minWidth: '80px',
          maxWidth: '150px'
        }}
        style={{
          maxSize: '150px'
        }}
      />
    ) : (
      <Content onClick={() => this.changeState()}>{value}</Content>
    )
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
