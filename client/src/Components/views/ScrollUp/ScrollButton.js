import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery'

export default class ScrollButton extends Component {
  componentDidMount() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('.scrolltop:hidden').stop(true, true).fadeIn();
      } else {
        $('.scrolltop').stop(true, true).fadeOut();
      }
    });
    $(function () { $(".scroll").click(function () { $("html,body").animate({ scrollTop: $(".top").offset().top }, "1000"); return false }) })
  }

  render() {
    return (
      <Wrapper>

        <div class='top'></div>
        <div class="banner">
        </div>
        <div class='scrolltop'>
          <div class='scroll icon'><i class="fa fa-arrow-up" style={{color:"white"}} aria-hidden="true"></i></div>
        </div>
      </Wrapper>
    )

  }
}

const Wrapper = styled.nav`
body {
  background-color: #a79dc7;
  margin: 0;
}

.scrolltop:hover{
  background-color:var(--mainBlue)
}

/*  scroll css section here*/
.scrolltop .icon {
    font-size: 30px;
    text-align: center;
    // transform: rotate(-45deg);
}


.scrolltop {
    position: fixed;
    bottom: 70px;
    right: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #a3a0db;
    display: none;
}

`