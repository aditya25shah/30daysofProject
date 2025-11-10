import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

export default function BarCode() {
  const readerId = "reader";
  const scannerRef = useRef(null);
  const runningRef = useRef(false);
  const [cameraId, setCameraId] = useState("");
  const [cameras, setCameras] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devs) => {
        if (devs && devs.length) {
          setCameras(devs);
          setCameraId(devs[0].id);
        }
      })
      .catch((e) => setError("Unable to list cameras: " + (e?.message || e)));
  }, []);

  const safeStop = async () => {
    if (!scannerRef.current) return;
    if (!runningRef.current) return;
    runningRef.current = false;
    try {
      await scannerRef.current.stop();
    } catch (_) {}
    try {
      await scannerRef.current.clear();
    } catch (_) {}
  };

  useEffect(() => {
    if (!scanning) {
      safeStop();
      return;
    }

    if (!cameraId) {
      setError("No camera selected");
      setScanning(false);
      return;
    }

    scannerRef.current = new Html5Qrcode(readerId, { verbose: false });

    const config = {
      fps: 12,
      qrbox: { width: 280, height: 120 },
      formatsToSupport: [
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.ITF
      ]
    };

    scannerRef.current
      .start({ deviceId: { exact: cameraId } }, config, (decodedText) => {
        if (!runningRef.current) return;
        runningRef.current = false;
        setResult(decodedText);
        scannerRef.current
          .stop()
          .catch(() => {})
          .finally(() => {
            scannerRef.current && scannerRef.current.clear().catch(() => {});
            setScanning(false);
          });
      }, (err) => {
        const msg = (err && err.toString && err.toString()) || String(err);
        if (!msg.includes("NotFoundException")) setError(msg);
      })
      .then(() => {
        runningRef.current = true;
      })
      .catch((startErr) => {
        setError("Failed to start scanner: " + (startErr?.message || startErr));
        setScanning(false);
      });

    return () => {
      safeStop();
    };
  }, [scanning, cameraId]);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const temp = new Html5Qrcode(readerId);
    try {
      const decoded = await temp.scanFile(file, true);
      setResult(decoded);
    } catch (err) {
      setError("Image decode failed: " + (err?.message || err));
    } finally {
      temp.clear().catch(() => {});
    }
  };

  return (
    <div className="barcode-container">
      <h2>Barcode Scanner</h2>
      <div id={readerId} ref={null}></div>

      <div className="controls">
        <select value={cameraId} onChange={(e) => setCameraId(e.target.value)}>
          {cameras.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label || c.id}
            </option>
          ))}
        </select>

        {!scanning ? (
          <button onClick={() => { setError(""); setResult(""); setScanning(true); }}>
            Start
          </button>
        ) : (
          <button onClick={() => setScanning(false)}>
            Stop
          </button>
        )}

        <label className="btn-upload">
          Upload Image
          <input type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </label>
      </div>

      {result && <div className="result-box"><strong>Result:</strong> {result}</div>}
      {error && <div className="error-box"><strong>Error:</strong> {error}</div>}
    </div>
  );
}
