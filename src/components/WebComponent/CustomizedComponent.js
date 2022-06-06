import React from 'react';
import './components/hello-world';
import './components/fancy-button';

function customizedComponent(props) {
    return (
        <div>
            <hello-world>
            </hello-world>
            <button is='fancy-button'>Click me</button>
        </div>
    );
}

export default customizedComponent;