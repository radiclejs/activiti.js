import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Card, Tooltip } from 'antd';
import BpmnModdle from 'bpmn-moddle';

import BpmnJS from 'bpmn-js';
import { loadXML, $$, createModeler, getEncodeData } from './helper';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import styles from './Demo.less';
import { repositoryDeploy } from '../../services/api'

export default class Demo extends PureComponent {
  componentDidMount() {
    this.initModeler();
  }

  state = {
    svg: {},
    xml: {},
    error: null,
    containerClassName: '',
  };

  componentWillUnmount() {
    this.modeler.off('commandStack.changed');
    this.modeler = null;
  }

  deploy = async () => {
    await repositoryDeploy({

    })
  }

  initModeler() {
    this.modeler = createModeler();
    this.exportArtifacts = _.debounce(this.exportArtifacts, 500);
    this.modeler.on('commandStack.changed', this.exportArtifacts);
  }

  async openDiagram(xml) {
    if (!xml) {
      xml = await loadXML();
    }

    this.modeler.importXML(xml, error => {
      this.setState({
        error,
        containerClassName: error ? 'with-error' : 'with-diagram',
      });

      let canvas = this.modeler.get('canvas')
      canvas.addMarker('approveInvoice', 'highlight')
    });
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
      this.openDiagram(e.target.result);
    };

    reader.readAsText(file);
  };

  // 导出数据
  exportArtifacts = () => {
    this.modeler.saveSVG((err, svg) => {
      if (!err) {
        this.setState({
          svg: getEncodeData('diagram.svg', svg),
        });
      }
    });

    this.modeler.saveXML({ format: true }, (err, xml) => {
      if (!err) {
        this.setState({
          xml: getEncodeData('diagram.bpmn', xml),
        });
      }
    });
  };

  renderModeler() {
    const { svg, xml, error, containerClassName } = this.state;

    const classNames = 'content ' + containerClassName;

    return (
      <div id="js-drop-zone" className={classNames}>
        <Dropzone className="dropzone" onDrop={this.onDrop}>
          <div className="message intro">
            <div className="note">
              Drop BPMN diagram from your desktop or{' '}
              <a onClick={this.createNewDiagram}>create a new diagram</a> to get started.
            </div>
          </div>

          <div className="message error">
            <div className="note">
              <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

              <div className="details">
                <span>cause of the problem</span>
                <pre>{error ? error.message : ''}</pre>
              </div>
            </div>
          </div>
        </Dropzone>

        <div className="canvas" id="js-canvas" />
        <div className="properties-panel-parent" id="js-properties-panel" />

        <ul className="buttons">
          <li>下载</li>
          <li>
            <a title="download BPMN diagram" href={xml.href} download={xml.download}>
              BPMN diagram
            </a>
          </li>
          <li>
            <a title="download as SVG image" href={svg.href} download={svg.download}>
              SVG image
            </a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        {/* <div id="demo" className={styles.demo}>
        </div> */}
        <div>
          <Button onClick={this.deploy} type="primary">部署</Button>
        </div>
        {this.renderModeler()}
      </Fragment>
    );
  }
}
