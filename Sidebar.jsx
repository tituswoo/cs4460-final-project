import React from 'react';
import FormDivider from './FormDivider';

class Sidebar extends React.Component {
  render() {
    return(
      <div className='Sidebar'>
        <input type='text' className='input input--full' placeholder='Address 1' />
        <FormDivider text='vs'/>
        <input type='text' className='input input--full' placeholder='Address 2' />
        <button className='button button--primary button--full'>COMPARE LOCATIONS</button>
      </div>
    );
  }
}

export default Sidebar;
