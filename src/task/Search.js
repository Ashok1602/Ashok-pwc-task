import React from 'react';

export default function Search({searchUsers, isLoading}) {
  return (
    <div>
      <input
        type='text'
        placeholder='search user'
        style={{ width: '50%', padding: '10px', margin: '20px' }}
        onChange={searchUsers}
        disabled={isLoading}
      />
    </div>
  );
}
