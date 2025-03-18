import React, { useState, useEffect } from "react";

export default function CheerAppDemo() {
  const [activationDate, setActivationDate] = useState("");
  const [activationLocation, setActivationLocation] = useState("");
  const [initialStock, setInitialStock] = useState("");
  const [finalStock, setFinalStock] = useState("");
  const [samplesDistributed, setSamplesDistributed] = useState("");
  const [customersSampled, setCustomersSampled] = useState("");
  const [customerFeedback, setCustomerFeedback] = useState("");
  const [gpsLocation, setGpsLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [reportGenerated, setReportGenerated] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError("Unable to fetch location. Enable GPS.");
          setGpsLocation(null);
        }
      );
    }
  }, []);

  const generateReport = () => {
    setReportGenerated(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">CheerApp Activation Tracker</h1>

      <div>
        <label>Activation Date:</label>
        <input type="date" value={activationDate} onChange={(e) => setActivationDate(e.target.value)} />
      </div>

      <div>
        <label>Activation Location:</label>
        <input type="text" value={activationLocation} onChange={(e) => setActivationLocation(e.target.value)} />
      </div>

      <div>
        {gpsLocation
          ? `Current GPS: ${gpsLocation.lat}, ${gpsLocation.lon}`
          : locationError}
      </div>

      <div>
        <label>Initial Stock:</label>
        <input type="number" value={initialStock} onChange={(e) => setInitialStock(e.target.value)} />
      </div>

      <div>
        <label>Final Stock:</label>
        <input type="number" value={finalStock} onChange={(e) => setFinalStock(e.target.value)} />
      </div>

      <div>
        <label>Samples Distributed:</label>
        <input type="number" value={samplesDistributed} onChange={(e) => setSamplesDistributed(e.target.value)} />
      </div>

      <div>
        <label>Customers Sampled:</label>
        <input type="number" value={customersSampled} onChange={(e) => setCustomersSampled(e.target.value)} />
      </div>

      <div>
        <label>Customer Feedback:</label>
        <textarea value={customerFeedback} onChange={(e) => setCustomerFeedback(e.target.value)} />
      </div>

      <button onClick={generateReport}>Generate Report</button>

      {reportGenerated && (
        <div>
          <h2>Activation Report</h2>
          <p>Location: {activationLocation} | Date: {activationDate}</p>
          <p>Stock Before: {initialStock} | After: {finalStock}</p>
          <p>Customers Sampled: {customersSampled}</p>
          <p>Feedback: {customerFeedback}</p>
        </div>
      )}
    </div>
  );
}
