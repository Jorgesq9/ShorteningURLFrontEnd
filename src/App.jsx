import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Index() {
  const [shortUrls, setShortUrls] = useState([]);
  const [fullUrl, setFullUrl] = useState("");
  const [customShortId, setCustomShortId] = useState("");

  useEffect(() => {
    fetch("/shortUrls")
      .then((response) => response.json())
      .then((data) => setShortUrls(data))
      .catch((error) => console.error("Error fetching short URLs:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/shortUrls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullUrl, customShortId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setShortUrls((prev) => [data, ...prev]);
        setFullUrl("");
        setCustomShortId("");
      })
      .catch((error) => console.error("Error creating short URL:", error));
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit} className="my-4 form-inline">
        <input
          required
          placeholder="Url"
          type="url"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          name="fullUrl"
          id="fullUrl"
        />
        <input
          placeholder="customize your URL"
          type="text"
          value={customShortId}
          onChange={(e) => setCustomShortId(e.target.value)}
          name="customShortId"
          id="customShortId"
        />
        <button className="button" type="submit">
          Shortener
        </button>
      </form>

      <table className="table  my-custom-table">
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
          </tr>
        </thead>
        <tbody>
          {shortUrls.map((shortUrl) => (
            <tr key={shortUrl._id}>
              <td>
                <a href={shortUrl.full}>{shortUrl.full}</a>
              </td>
              <td>
                <a href={`/${shortUrl.short}`}>{shortUrl.short}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
