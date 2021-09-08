import React from 'react';
import './LinkButton.css'

//自定义wrapped component
const LinkButton = props => <button {...props} className='link-button'/>
export default LinkButton;