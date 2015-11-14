import React from 'react';
import FormDivider from './FormDivider';

class Sidebar extends React.Component {
  render() {
    return(
      <div className='Sidebar'>
        <input type='text' className='input input--full' placeholder='Address 1' />
        <FormDivider text='vs'/>
        <input type='text' className='input input--full' placeholder='Address 2' />
      </div>
    );
  }
}

export default Sidebar;
