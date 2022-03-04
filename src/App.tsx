import React, { useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import Search from "./components/Search";
import Books from "./components/Books";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/404";

function App() {
  const [loading, setLoading] = useState(false);

  const updateLoader = useCallback((v) => {
    setLoading(v);
  }, []);

  return (
      <ErrorBoundary
        FallbackComponent={() => <div>Oops!</div>}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <Routes>
          <Route path="/" element={<Search loading={loading} />}>
            <Route index element={<></>} />
            <Route
              path="/search/:searchTerm"
              element={<Books updateLoader={updateLoader} loading={loading} />}
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ErrorBoundary>
  );
}

export default App;
