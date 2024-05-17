'use client';
import { useRef, useState } from 'react';
import TestBroker from '@/components/TestBroker';
import TestAuth from '@/components/TestAuth';
import TestLog from '@/components/TestLog';
import TestEmail from '@/components/TestEmail';
import { ClearControlsHandle } from '@/components/ClearControlsHandle';
import Header from '@/components/RegularComponents/Header';
import Footer from '@/components/RegularComponents/Footer';
import RequestResponseViewer from '@/components/RequestResponseViewer';

const Tabs: string[] = ['TestBroker', 'TestAuth', 'TestLog', 'TestEmail'];
const baseApiUrl: string = 'http://localhost:8080';

const Home: React.FC = () => {
  const [requestBody, setRequestBody] = useState<string>('');
  const [responseBody, setResponseBody] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('TestBroker');
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [brokerDisplayText, setBrokerDisplayText] = useState<string>('');
  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean>(true);
  const [logsJson, setLogsJson] = useState<string>('');
  const testEmailRef = useRef<ClearControlsHandle>(null);
  const testLogRef = useRef<ClearControlsHandle>(null);

  const resetAllStates = (reason: string) => {
    //Clean up the request body
    setRequestBody('');
    // Clean up the response body
    setResponseBody('');
    if (reason === 'Test Auth') {
      setIsAuthSuccess(false);
    }
    if (reason === 'Test Broker') {
      setBrokerDisplayText('');
    }
  };

  const getRequestAndUrl = (retModel: {
    reason: string;
    request: RequestInit;
    apiUrl: string;
  }) => {
    switch (retModel.reason) {
      case 'Test Broker':
        break;
      case 'Test Auth':
        retModel.apiUrl = `${baseApiUrl}/handle`;
        break;
      case 'Test Log':
        retModel.apiUrl = `${baseApiUrl}/handle`;
        break;
      case 'Test Email':
        retModel.apiUrl = `${baseApiUrl}/handle`;
        break;
      case 'Refresh Logs':
        retModel.apiUrl = `${baseApiUrl}/get-all-logs`;
        retModel.request.method = 'GET';
        break;
      case 'Clean Logs':
        retModel.apiUrl = `${baseApiUrl}/clean-all-logs`;
        retModel.request.method = 'DELETE';
        break;
      default:
        throw new Error('Unknown button text');
    }
    return retModel;
  };

  const handleResponses = (reason: string, data: any) => {
    switch (reason) {
      case 'Test Broker':
        setBrokerDisplayText('Broker sucessfully connection tested! 👍');
        break;
      case 'Test Auth':
        if (!data.error) {
          setIsAuthSuccess(true);
        }
        break;
      case 'Test Log':
        //Put some code to clean up the log component controls
        if (testLogRef.current) {
          testLogRef.current.clearControls();
        }
        break;
      case 'Test Email':
        //Put some code to clean up the email component controls
        if (testEmailRef.current) {
          testEmailRef.current.clearControls();
        }
        break;
      case 'Refresh Logs':
        setLogsJson(JSON.stringify(data.data, null, 2));
        break;
      case 'Clean Logs':
        break;
      default:
        throw new Error('Unknown button text');
    }
  };

  const requestApiCall = async (reason: string, payload?: any) => {
    setIsBusy(true);
    try {
      resetAllStates(reason);
      //Initialize the request object
      let request: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      };
      //Serialize the payload, if it is present
      if (payload) {
        request.body = JSON.stringify(payload);
      }
      let apiUrl: string = baseApiUrl;
      const arg = { reason: reason, request: request, apiUrl: apiUrl };
      getRequestAndUrl(arg);
      //Show the request body in the UI
      setRequestBody(JSON.stringify(arg.request, null, 2));
      const res = await fetch(arg.apiUrl, arg.request);
      const data = await res.json();
      handleResponses(reason, data);
      setResponseBody(JSON.stringify(data, null, 2));
    } catch (error: any) {
      console.log(error);
      setResponseBody(error.toString());
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* HEADER */}
      <Header selectedTab={activeTab} />

      {/* Body */}
      <main className='container mx-auto p-4 h-screen flex flex-col flex-grow'>
        <div className='flex space-x-4 mb-4'>
          {Tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace('Test', 'Test ')}
            </button>
          ))}
        </div>
        <RequestResponseViewer
          requestBody={requestBody}
          responseBody={responseBody}
        />
        <div className='p-4 border rounded flex-grow'>
          {activeTab === 'TestBroker' && (
            <TestBroker
              requestApiCall={requestApiCall}
              isBusy={isBusy}
              displayText={brokerDisplayText}
            />
          )}
          {activeTab === 'TestAuth' && (
            <TestAuth
              requestApiCall={requestApiCall}
              isBusy={isBusy}
              isSuccess={isAuthSuccess}
            />
          )}
          {activeTab === 'TestLog' && (
            <TestLog
              ref={testLogRef}
              logsJson={logsJson}
              requestApiCall={requestApiCall}
              isBusy={isBusy}
            />
          )}
          {activeTab === 'TestEmail' && (
            <TestEmail
              ref={testEmailRef}
              isBusy={isBusy}
              requestApiCall={requestApiCall}
              emailLink={'http://localhost:8025'}
            />
          )}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
