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

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: false
    }
  }

  handleClick() {
    this.setState({ status: !this.state.status })
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
        onClick={() => this.handleClick()}
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
      <Content onClick={() => this.handleClick()}>{value}</Content>
    )
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
