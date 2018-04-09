'use strict';
import BpmnModeler from 'bpmn-js/lib/Modeler';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import request from 'axios';

import './djs.third.less';
import './bpmn.third.less';
import './bpmn_panel.third.less';

export async function loadXML() {
  let xml = await request.get('http://127.0.0.1:7001/public/invoice.bpmn');
  // console.log(xml.data)
  // let viewer = new BpmnJS()
  // viewer.importXML(xml.data)
  // viewer.attachTo('#demo')
  return xml.data;
}

export async function loadDefinition(name = 'invoice') {
  let xml = await request.get(`http://127.0.0.1:7001/public/${name}.bpmn`);
  const BpmnModdle = require('bpmn-moddle').default;
  const moddle = new BpmnModdle();
  let result = moddle.fromXML(xml.data, (err, data, context) => { window.data = {data, context}; console.log(data, context)})
  return result
}

window.loadDefinition = loadDefinition

export function $$(id) {
  return document.getElementById(id);
}

export function createModeler() {
  // var canvas = $$('#js-canvas');
  var modeler = new BpmnModeler({
    container: '#js-canvas',
    propertiesPanel: {
      parent: '#js-properties-panel',
    },
    additionalModules: [propertiesPanelModule, propertiesProviderModule],
    moddleExtensions: {
      camunda: camundaModdleDescriptor,
    },
  });
  return modeler;
}

export function getEncodeData(name, data) {
  var encodedData = encodeURIComponent(data);

  if (data) {
    return {
      href: 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
      download: name,
    };
  }
}
