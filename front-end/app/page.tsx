'use client';
import { useState } from 'react';
import TestBroker from '@/components/TestBroker';
import TestAuth from '@/components/TestAuth';
import TestLog from '@/components/TestLog';
import TestEmail from '@/components/TestEmail';
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
  const [logsJson, setLogsJson] = useState<string>('TestBroker');

  const resetAllStates = () => {
    //Clean up the request body
    setRequestBody('');
    // Clean up the response body
    setResponseBody('');
    setIsAuthSuccess(false);
    setBrokerDisplayText('');
  };

  const requestApiCall = async (reason: string, payload?: any) => {
    setIsBusy(true);
    try {
      resetAllStates();
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

      console.log('reason: ', reason);
      console.log('payload: ', payload);

      switch (reason) {
        case 'Test Broker':
          break;
        case 'Test Auth':
          apiUrl = `${baseApiUrl}/handle`;
          break;
        case 'Test Log':
          apiUrl = `${baseApiUrl}/handle`;
          break;
        case 'Test Email':
          apiUrl = `${baseApiUrl}/handle`;
          break;
        case 'Refresh Logs':
          apiUrl = `http://localhost:8082/get-all-logs`;
          request.method = 'GET';
          break;
        default:
          throw new Error('Unknown button text');
      }
      //Show the request body in the UI
      setRequestBody(JSON.stringify(request, null, 2));
      const res = await fetch(apiUrl, request);
      const data = await res.json();

      setResponseBody(JSON.stringify(data, null, 2));

      switch (reason) {
        case 'Test Broker':
          setBrokerDisplayText('Broker sucessfully connection tested! 👍');
          break;
        case 'Test Auth':
          if(!data.error){
            setIsAuthSuccess(true);
          }       
          break;
        case 'Test Log':
          apiUrl = `${baseApiUrl}/handle`;
          break;
        case 'Test Email':
          apiUrl = `${baseApiUrl}/handle`;
          break;
        case 'Refresh Logs':
          setLogsJson(JSON.stringify(data.data, null, 2));
          break;
        default:
          throw new Error('Unknown button text');
      }
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
              logsJson={logsJson}
              requestApiCall={requestApiCall}
              isBusy={isBusy}
            />
          )}
          {activeTab === 'TestEmail' && (
            <TestEmail
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
