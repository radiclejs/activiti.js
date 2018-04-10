import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Card, Tooltip } from 'antd';
import BpmnModdle from 'bpmn-moddle';

import BpmnJS from 'bpmn-js';
import { renderDiagram, $$, createModeler, getEncodeData, saveXML, saveSVG, getProcessInfo } from './helper';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import styles from './Design.less';
import { repositoryDeploy } from '../../services/api'

const debug = require('debug')('engine:design')

export default class Design extends PureComponent {
  componentDidMount() {
    this.initModeler();
  }

  state = {
    svg: {},
    xml: {},
    error: null,
    hasDiagram: false,
    containerClassName: '',
  };

  componentWillUnmount() {
    this.modeler.off('commandStack.changed');
    this.modeler = null;
  }

  deploy = async () => {
    let xml = await saveXML(this.modeler)
    let svg = await saveSVG(this.modeler)
    let procInfo = getProcessInfo(this.modeler._definitions)
    const result = await repositoryDeploy(Object.assign(procInfo, {
      xml,
      svg
    }))

    debug('deploy result:', result)
  }

  initModeler() {
    this.modeler = createModeler();
    this.exportArtifacts = _.debounce(this.exportArtifacts, 500);
    this.modeler.on('commandStack.changed', this.exportArtifacts);
  }

  async openDiagram(params) {
    renderDiagram(params, this.modeler, (error) => {
      this.setState({
        error,
        hasDiagram: !error,
        containerClassName: error ? 'with-error' : 'with-diagram',
      });
    })
  }

  highlight(id) {
    let canvas = this.modeler.get('canvas')
    canvas.addMarker(id, 'highlight')
  }

  createNewDiagram = e => {
    e.preventDefault();
    e.stopPropagation();
    this.openDiagram();
  };

  onDrop = acceptedFiles => {
    let file = acceptedFiles[0];
    let reader = new FileReader();

    reader.onload = e => {
      this.openDiagram({
        source: e.target.result
      });
    };

    reader.readAsText(file);
  };

  // 导出数据
  exportArtifacts = async () => {
    try {
      let svg = await saveSVG(this.modeler)
      let xml = await saveXML(this.modeler)

      this.setState({
        svg: getEncodeData('diagram.svg', svg),
        xml: getEncodeData('diagram.bpmn', xml),
      });
    } catch(e) {
      console.error(e)
    }
  };

  renderModeler() {
    const { error, containerClassName } = this.state;

    const classNames = 'content ' + containerClassName;

    return (
      <div id="js-drop-zone" className={classNames}>
        <Dropzone className="dropzone" onDrop={this.onDrop}>
          <div className="message intro">
            <div className="note">
              从本地拖入已有流程(.bpmn文件){'  '}
              <a onClick={this.createNewDiagram}>新建流程</a>
            </div>
          </div>

          <div className="message error">
            <div className="note">
              <p>渲染图形失败  </p>

              <div className="details">
                <span>问题原因</span>
                <pre>{error ? error.message : ''}</pre>
              </div>
            </div>
          </div>
        </Dropzone>

        <div className="canvas" id="js-canvas" />
        <div className="properties-panel-parent" id="js-properties-panel" />
      </div>
    );
  }

  render() {
    const {svg, xml, hasDiagram} = this.state
    return (
      <Fragment>
        <div>
          {hasDiagram ?<Button onClick={this.deploy} type="primary">部署</Button> : null}
          {hasDiagram ?<Button href={xml.href} download={xml.download}>保存为xml</Button> : null}
          {hasDiagram ?<Button href={svg.href} download={svg.download}>保存为svg</Button> : null}
        </div>
        {this.renderModeler()}
      </Fragment>
    );
  }
}
