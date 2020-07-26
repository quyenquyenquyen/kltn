import React, { Component } from 'react'
import './ListBox.css'

export default class ListBox extends Component {
    render() {
        return (
            <div>
                
                <smart-list-box item-template="template">
                    <smart-list-items-group label="Swedish Cars">
                        <smart-list-item selected value="volvo">Volvo</smart-list-item>
                        <smart-list-item value="saab">Saab</smart-list-item>
                        <smart-list-item value="saab">Scania</smart-list-item>
                    </smart-list-items-group>
                    <smart-list-items-group label="German Cars">
                        <smart-list-item value="mercedes">Mercedes</smart-list-item>
                        <smart-list-item value="vw">VW</smart-list-item>
                        <smart-list-item value="audi">Audi</smart-list-item>
                        <smart-list-item value="porsche">Porsche</smart-list-item>
                    </smart-list-items-group>
                    <smart-list-items-group label="Japanese Cars">
                        <smart-list-item value="mazda">Mazda</smart-list-item>
                        <smart-list-item value="honda">Honda</smart-list-item>
                        <smart-list-item value="infinity">Infinity</smart-list-item>
                        <smart-list-item value="mitsubishi">Mitsubishi</smart-list-item>
                        <smart-list-item value="toyota">Toyota</smart-list-item>
                    </smart-list-items-group>
                </smart-list-box>
                {/* <template id="template">
                    <span class="glyphicon glyphicon-ok"></span>
                    <span style="margin-left:5px;">{{label}}</span>
                </template> */}

                <script type="module" src="../../source/modules/smart.listbox.js"></script> 
                <script type="module" src="index.js"></script>	
                

            </div>
        )
    }
}
