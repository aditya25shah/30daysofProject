import { useRef, useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import "./BarCode.css";

export default function BarcodeScanner() {
  const sRef = useRef(null);
  const mountedRef = useRef(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    mountedRef.current = true;
    const elementId = "reader";

    async function startScanner() {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (!devices || devices.length === 0) {
          alert("No camera found");
          return;
        }

        const backCam = devices.find((d) => /back|rear|environment/i.test(d.label));
        const cameraId = (backCam && backCam.id) || devices[0].id;

        const html5QrCode = new Html5Qrcode(elementId, { verbose: false });
        sRef.current = html5QrCode;

        const config = {
          fps: 10,
          qrbox: { width: 300, height: 100 },
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

        await html5QrCode.start(
          { deviceId: { exact: cameraId } },
          config,
          (decodedText) => {
            if (!mountedRef.current) return;

            setData((prev) => {
              if (prev[prev.length - 1] === decodedText) return prev;
              return [...prev, decodedText];
            });
          },
          () => {}
        );
      } catch (error) {
        alert(`Scanner error: ${error?.message || error}`);
        if (error && error.name === "NotAllowedError") {
          alert("Camera permission denied");
        }
      }
    }

    startScanner();

    return () => {
      mountedRef.current = false;
      const current = sRef.current;
      if (current) {
        current
          .stop()
          .then(() => current.clear())
          .catch((stopErr) => {
            console.warn("Error stopping scanner during cleanup", stopErr);
          })
          .finally(() => {
            sRef.current = null;
          });
      }
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="card">
        <h1>Barcode Scanner</h1>
        <p className="lead">Scan barcodes — results accumulate below.</p>

        <div className="scan-list">
          {data.length === 0 ? (
            <div className="reader-placeholder">No results yet</div>
          ) : (
            <ul>
              {data.map((item, idx) => (
                <li key={idx}>
                  {/^https?:\/\//i.test(item) ? (
                    <a href={item} target="_blank" rel="noopener noreferrer">
                      {item}
                    </a>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="camera-wrap">
        <div className="reader-frame">
          <div id="reader" />
        </div>
        <div className="camera-instructions">
          Point the camera at barcodes. Each new scan will be added to the list.
        </div>
      </div>
    </div>
  );
}
