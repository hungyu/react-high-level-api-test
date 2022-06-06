import React from 'react';
import './components/hello-world';

function customizedComponent(props) {
    return (
        <div>
            <hello-world>
            </hello-world>
        </div>
    );
}

export default customizedComponent;