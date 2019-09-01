import React, { Component } from 'react';
import netlifyIdentity from 'netlify-identity-widget';
import { getCsvPutUrl, getXmlPutUrl, uploadFile } from '../service/Integration';
import Loader from 'react-loader-spinner'
import './Home.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
const fetch = require('node-fetch');

class Home extends Component {

  constructor() {
    super();
    this.initialState = {
      csvFile: null,
      xmlFile: null,
      csvValue: '',
      xmlValue: '',
      isLoading: false
    };
    this.state = this.initialState;
  }

  submitCsvFile = async (event) => {
    event.preventDefault();
    if (this.state.csvFile === null) {
      return;
    }

    const newState = { ...this.state, isLoading: true }
    this.setState({ ...newState });

    const fileObj = this.state.csvFile;
    const signedUrl = await getCsvPutUrl(fileObj.name, fileObj.type, netlifyIdentity.currentUser().email);
    await uploadFile(fileObj, signedUrl);
    this.setState(this.initialState);
  }

  submitXmlFile = async (event) => {
    event.preventDefault();
    if (this.state.xmlFile === null) {
      return;
    }

    const newState = { ...this.state, isLoading: true }
    this.setState({ ...newState });

    const fileObj = this.state.xmlFile;
    const signedUrl = await getXmlPutUrl(fileObj.name, fileObj.type, netlifyIdentity.currentUser().email);
    await uploadFile(fileObj, signedUrl);
    this.setState(this.initialState);
  }

  handleCsvFileUpload = (event) => {
    const fileObj = event.target.files[0];
    const allowedExtensions = /(\.csv)$/i;
    if (!allowedExtensions.exec(fileObj.name)) {
      alert('Please upload csv file only.');
      return;
    }
    this.setState({ csvFile: fileObj, csvValue: event.target.value });
  }

  handleXmlFileUpload = (event) => {
    const fileObj = event.target.files[0];
    const allowedExtensions = /(\.xml.gz)$/i;
    if (!allowedExtensions.exec(fileObj.name)) {
      alert('Please upload xml.gz file only.');
      return;
    }
    this.setState({ xmlFile: fileObj, xmlValue: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="home-header">
          Welcome  {netlifyIdentity.currentUser().email} !! </div>
        <div className='home-body'>
          {this.state.isLoading &&
            <div className="uploaderMessage"><Loader
              type="ThreeDots"
              color="#58696d"
              height="100"
              width="100"
            /></div>
          }
          <form onSubmit={this.submitCsvFile}>
            Upload Csv File :
            <input className="form-control input-sm"
              id="csvFileInput"
              type="file"
              name="file"
              value={this.state.csvValue}
              onChange={this.handleCsvFileUpload}
              accept=".csv" />
            <button className="uploadButton" type='submit'>Upload</button>
          </form>
          <br />
          <form onSubmit={this.submitXmlFile}>
            Upload Xml File :
             <input className="form-control input-sm"
              id="xmlFileInput"
              type="file"
              name="file"
              value={this.state.xmlValue}
              onChange={this.handleXmlFileUpload}
              accept=".xml.gz" />
            <button className="uploadButton" type='submit'>Upload</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;

