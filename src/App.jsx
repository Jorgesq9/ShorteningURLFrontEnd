import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function Index() {
  const [shortUrls, setShortUrls] = useState([]);
  const [fullUrl, setFullUrl] = useState("");
  const [customShortId, setCustomShortId] = useState("");
  const [urls, setUrls] = useState([]);

  const deleteUrl = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/shortUrls/${id}`);
      console.log(response.data);

      const updatedUrls = urls.filter((url) => url._id !== id);
      setShortUrls(updatedUrls);
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}`)
      .then((response) => {
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
        fullUrl, // Asegúrate de que estas variables estén definidas en el contexto o sean recogidas del estado/formulario
        customShortId,
      })
      .then((response) => {
        // Lógica para manejar la respuesta, por ejemplo actualizar el estado con la nueva URL corta
        setShortUrls([...shortUrls, response.data]);
        console.log("URL Shortened:", response.data);
      })
      .catch((error) => {
        console.error("Error creating short URL:", error);
      });
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
                <a href={`${apiUrl}/${shortUrl.short}`}>{shortUrl.short}</a>
              </td>
              <td>
                <button
                  onClick={() => deleteUrl(shortUrl._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Index;
