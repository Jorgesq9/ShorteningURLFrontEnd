import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import trash from "../public/delete.png";
import logo from "../public/URL1.png";

const apiUrl = import.meta.env.VITE_API_URL;

function Index() {
  const [shortUrls, setShortUrls] = useState([]);
  const [fullUrl, setFullUrl] = useState("");
  const [customShortId, setCustomShortId] = useState("");

  const deleteUrl = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/shortUrls/${id}`);
      console.log(response.data);

      const updatedUrls = shortUrls.filter((url) => url._id !== id);
      setShortUrls(updatedUrls);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}`)
      .then((response) => {
        console.log(response.data);
        setShortUrls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching short URLs:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${apiUrl}/shortUrls`, {
        fullUrl,
        customShortId,
      })
      .then((response) => {
        setShortUrls([...shortUrls, response.data]);
        console.log("URL Shortened:", response.data);
        setFullUrl("");
        setCustomShortId("");
      })
      .catch((error) => {
        console.error("Error creating short URL:", error);
      });
  };

  return (
    <div className="container">
      <img
        className="URLogo"
        src={logo}
        alt="Delete"
        onClick={() => deleteUrl(shortUrl._id)}
      />
      <form onSubmit={handleSubmit} className="my-4 form-inline">
        <input
          className="URL"
          required
          placeholder="Url"
          type="url"
          value={fullUrl}
          onChange={(e) => setFullUrl(e.target.value)}
          name="fullUrl"
          id="fullUrl"
        />
        <input
          className="customizeURL"
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
      <table
        className={`table my-custom-table ${
          shortUrls.length ? "" : "empty-table"
        }`}
      >
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {shortUrls.length > 0 ? (
            shortUrls.map((shortUrl) => (
              <tr key={shortUrl._id}>
                <td>
                  <a href={shortUrl.full} target="_blank">
                    {shortUrl.full}
                  </a>
                </td>
                <td>
                  <a
                    href={`${apiUrl}/${shortUrl.short}`}
                    target="_blank"
                    onClick={() => {
                      window.setTimeout(() => {
                        window.location.reload();
                      }, 100);
                    }}
                  >
                    {shortUrl.short}
                  </a>
                </td>
                <td>{shortUrl.clicks}</td>
                <td>
                  <img
                    className="delete"
                    src={trash}
                    alt="Delete"
                    onClick={() => deleteUrl(shortUrl._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Index;
