import React from 'react';
import error404 from '../images/erro.png'
import './notFound.css'

function NotFound() {

  return (
    <main className='main-notfount'>
      <img src={ error404 } alt='erro 404' className='img-notFount'/>
    </main>
  );
}

export default NotFound;