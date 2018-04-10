'use strict';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import request from 'axios';
import promisify from 'es6-promisify';

import './djs.third.less';
import './bpmn.third.less';
import './bpmn_panel.third.less';

export async function loadXML(name) {
  let xml = await request.get(`http://127.0.0.1:7001/public/${name}.bpmn`);
  // console.log(xml.data)
  // let viewer = new BpmnJS()
  // viewer.importXML(xml.data)
  // viewer.attachTo('#demo')
  return xml.data;
}

export async function loadDefinition(name = 'invoice') {
  let xml = await loadXML(name)
  const BpmnModdle = require('bpmn-moddle').default;
  const moddle = new BpmnModdle();
  let result = moddle.fromXML(xml.data, (err, data, context) => { window.data = {data, context}; console.log(data, context)})
  return result
}

export async function renderDiagram(params = {}, viewer, callback) {
  const {name, source} = params
  let xml

  if (name) {
    xml = await loadXML(name);
  } else if (source) {
    xml = source
  } else {
    xml = await loadXML('newDiagram');
  }

  // let importXML = promisify(viewer.importXML.bind(importXML))

  // await importXML()

  viewer.importXML(xml, error => {
    if (error) {
      callback(error)
    } else {
      callback(null, xml)
    }
  });
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

export async function saveXML(viewer) {
  let saveXML = promisify(viewer.saveXML.bind(viewer))
  let result = await saveXML({ format: true })
  return result
}

export async function saveSVG(viewer) {
  let saveSVG = promisify(viewer.saveSVG.bind(viewer))
  let result = await saveSVG()
  return result
}

export function getProcessInfo(definition) {
  let process = definition.rootElements[0]
  if (process.$type !== 'bpmn:Process') {
    throw new Error('a definition must have a process')
  }

  if (!process.id) {
    throw new Error('a process must have a id')
  }

  if (!process.name) {
    throw new Error('a process must have a name')
  }

  let document = process.documentation.length ? process.documentation[0] : {}

  return {
    id: process.id,
    name: process.name,
    desc: document.text,
    isExecutable: process.isExecutable,
    jobPriority: process.jobPriority,
    taskPriority: process.taskPriority,
    version: process.versionTag
  }
}
