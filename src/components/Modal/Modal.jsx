import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    // window.addEventListener('keydown', e => {
    //   // console.log(e.code);

    //   if(e.code === 'Escape') {
    //     console.log('Нажали ESC, нужно закрыть модалку')

    //     this.props.onClose();
    //   }
    // });

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    // window.removeEventListener('keydown',  e => {...('Нажали ESC, 
    // - функция АНОНИМНАЯ!!! невозможно дать ссылку на неё - делаем её методом ;))

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');

      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    console.log('Кликнули в бекдроп');

    console.log('currentTarget: ', event.currentTarget);
    console.log('target: ', event.target);
    
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  }

  // handleBackdropClick = event => {
  //   // console.log('Кликнули в бекдроп');

  //   // console.log('currentTarget: ', event.currentTarget);
  //   // console.log('target: ', event.target);

  //   if (event.currentTarget === event.target) {
  //     this.props.onClose();
  //   }
  // };

  // render() {
  //   return (
  //     <div className="Modal__backdrop" >
  //       <div className="Modal__content">{this.props.children}</div>
  //     </div>
  //   );
  // }
  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
  // render() {
  //   return createPortal(
  //     <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
  //       <div className="Modal__content">{this.props.children}</div>
  //     </div>,
  //     modalRoot,
  //   );
  // }
}