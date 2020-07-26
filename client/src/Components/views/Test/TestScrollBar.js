import React, { Component } from 'react'
import styled from 'styled-components';

export default class TestScrollBar extends Component {
  render() {
    return (
      <Wrapper>
        <div className="wrapper">
          <div className='content'>
            <h5>asdfadfasdfasdfsdf</h5>
            <h5>asdfadfasdfasdsdfsfsdfsdfsdfsdfsdfsdfdfsdfsdfsdsdfdsfdsfdfsdf</h5>
            <h5>asdfadfasdfasdfsdf</h5>
            <h5>asdfadfasdfasdfsdf</h5>
            <h5>asdfadfasdfasdfsdf</h5>
            <h5>asdfadfasdfasdfsdf</h5>
            <h5>asdfadfasdfasdfsdf</h5>
            <h5>asdfadfasdfasdfsdf</h5>
            <h5>asdfadfasdfasdfsdf</h5>
            <h5>asdfadfasdfasdfsdf</h5>
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.nav`
.wrapper {
  overflow: auto;
  max-height: 300px;
  word-break: break-all;

  border: 1px solid red;
}
.content {
  overflow-y: auto;
}

}
`