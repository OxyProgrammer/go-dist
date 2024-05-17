import React from 'react';
interface RequestResponseViewerProps {
  requestBody: string;
  responseBody: string;
}

const RequestResponseViewer: React.FC<RequestResponseViewerProps> = ({
  requestBody,
  responseBody,
}) => {
  return (
    <div className='flex space-x-4 mt-4'>
      <div className='w-1/2'>
        <h2 className='font-bold text-2xl'>Sent</h2>
        <textarea
          className='w-full p-4 border border-gray-300 rounded-md resize-none text-xs'
          rows={6}
          placeholder='Sent'
          readOnly={true}
          value={requestBody}
        />
      </div>
      <div className='w-1/2'>
        <h2 className='font-bold text-2xl'>Received</h2>
        <textarea
          className='w-full p-4 border border-gray-300 rounded-md resize-none text-xs'
          rows={6}
          placeholder='Received'
          readOnly={true}
          value={responseBody}
        />
      </div>
    </div>
  );
};

export default RequestResponseViewer;
