/* global document */
import React from 'react'
import styled from 'styled-components'
import AutosizeInput from 'react-input-autosize'
import PropTypes from 'prop-types'

const Content = styled.p`
  color: inherit;
  text-align: center;
  background: transparent;
  border: none;
  font-size: 18px;
  word-wrap: break-word;
  word-break: break-all;
  max-width: 150px;
`
const KEYBOARD_ENTER_CODE = 13
const KEYBOARD_ESC_CODE = 27

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      status: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', e => this.handleClickOutside(e))
  }

  onChange(value) {
    this.setState({ value })
  }

  handleClick() {
    this.changeState()
  }

  handleClickOutside(event) {
    if (this.textInput && !this.textInput.contains(event.target)) {
      this.setState({ status: false })
    }
  }

  changeState() {
    this.setState({ status: !this.state.status })
  }

  handleKeyDown(e) {
    if (e.keyCode === KEYBOARD_ENTER_CODE) this.changeState()
    else if (e.keyCode === KEYBOARD_ESC_CODE) this.changeState()
  }

  render() {
    const { value } = this.state

    return (
      <div
        ref={element => {
          this.textInput = element
        }}
      >
        {this.state.status ? (
          <AutosizeInput
            type="textarea"
            name="name"
            autoFocus
            value={value}
            onChange={e => this.onChange(e.target.value)}
            onKeyDown={e => this.handleKeyDown(e)}
            inputStyle={{
              color: 'inherit',
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
              maxWidth: '150px',
              fontFamily: 'inherit'
            }}
            style={{
              maxSize: '150px'
            }}
          />
        ) : (
          <Content onClick={() => this.handleClick()}>{value}</Content>
        )}
      </div>
    )
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired
}
