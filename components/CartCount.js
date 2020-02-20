import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

//
const AnimationStyles = styled.span`
  position: relative;
  .count: {
    display: block;
    position: relative;
    transition: all 0.2s;
    backface-visibility: hidden;
  }
  /* Turns fill it and fill back*/
  .count-enter: {
    transform: rotateX(0.5turn);
  }
  .count-enter-active: {
    transform: rotate(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: rotateX(0.5turn);
  }
`;

const Dot = styled.div`
  background: red;
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 1rem;
  min-width: 3rem;
  margin-left: 1rem;
  font-size: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

// react transition group
// Doubles up the DOT and then we can use transition
const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 4000, exit: 4000 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);

export default CartCount;
