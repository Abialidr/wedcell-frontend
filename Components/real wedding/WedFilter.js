import React from 'react';
import Styles from '../../styles/Shop.module.css';

function Wedfilter() {
  return (
    <div className='contianer mt-5  w-100 filtercontainer rounded'>
      <div className='filter'>
        <div className={Styles.Filter}>
          <div className={Styles.selector}>
            <select className=' form-select pt-2 '>
              <option value={1}>CITIES</option>
              <option value={2}>1000 - 1999</option>
              <option value={3}>2000 - 2999</option>
              <option value={4}>3000 - 4500</option>
            </select>
          </div>

          <div className={Styles.Brands}>
            <select className=' form-select pt-2 '>
              <option value={1}>CULTURES</option>
              <option value={2}>1000 - 1999</option>
              <option value={3}>2000 - 2999</option>
              <option value={4}>3000 - 4500</option>
            </select>
          </div>
          <div className={Styles.Brands}>
            <select className=' form-select pt-2 '>
              <option value={1}>CULTURES</option>
              <option value={2}>1000 - 1999</option>
              <option value={3}>2000 - 2999</option>
              <option value={4}>3000 - 4500</option>
            </select>
          </div>

          <div className={Styles.selector3}>
            <select className=' form-select pt-2 '>
              <option value={1}>THEMES</option>
              <option value={2}>1000 - 1999</option>
              <option value={3}>2000 - 2999</option>
              <option value={4}>3000 - 4500</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wedfilter;
