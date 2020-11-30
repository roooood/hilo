import React, { useEffect, useState } from 'react';
import StoreContextProvider from 'reducer';
import Route from 'Route';

function App() {
  return (
    <StoreContextProvider>
      <Route />
    </StoreContextProvider>
  );
}

export default App;
