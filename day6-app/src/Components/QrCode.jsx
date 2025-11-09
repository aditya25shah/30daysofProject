import {React} from 'react';
import {useRef , useEffect} from 'react';
import {Html5Qrcode} from 'html5-qrcode';
import {useState} from 'react';
import './QrCode.css'

export default function QrCode(){
    
    const sRef = useRef(null);
    const mRef = useRef(null);
    const[data,setData] = useState("");

    useEffect(()=>{
        mRef.current = true;
        const element = "reader";
        async function startscanner(){
            try{
                const device = await Html5Qrcode.getCameras();
                if(!device || device.length==0 ){
                    alert("Error no camera found");
                    return;
                }
                const bcamera = device.find((d) => /back|rear|environment/i.test(d.label));

                const cameraId = (bcamera && bcamera.id) || device[0].id;
                const html5QrCode = new Html5Qrcode(element, { verbose: false });
                sRef.current = html5QrCode;
                await html5QrCode.start(
                    { deviceId: { exact: cameraId } },
                    { fps: 10, qrbox: { width: 250, height: 250 },aspectRatio: 1.433 },
                    (decodedText, decodedResult) => {
                        console.log("Scanned text:", decodedText, decodedResult);
                        setData(decodedText);
                        html5QrCode
                        .stop()
                        .then(() => {
                            console.log("Scanner stopped after successful scan");
                        })
                        .catch((err) => {
                            console.warn("Failed to stop scanner:", err);
                        });
                    },
                    (errorMessage) => {
                        console.debug("QR scan error:", errorMessage);
                    }
                );

            }catch(error){
                alert(`The error you are getting is ${error}`);
                if(error && error.name === "NotAllowedError"){
                    alert("camera permission denied");
                }
            }
        }
        startscanner();

        return() => {
            mRef.current = false;
            const current = sRef.current;
            if(current){
                current
                    .stop()
                    .then(()=>{
                        current.clear();
                        sRef.current = null;
                        console.log("Scanner Stopped and Cleared");
                    })
                    .catch((stopErr) => {
                        console.warn("Error stopping scanner during cleanup",stopErr);
                    });
            }
        };
    },[]);
    
    return(
        <>
        <div className="app-shell">
            <div className="card">
                <h1>Basic Camera Access</h1>
                <p className="lead">Scan a QR code — result appears below.</p>

                <div className="scan-row">
                <div className="label">This is the Scanned Thing which it contains:</div>
                <div className="scan-value">
                    {data.startsWith("http") ? (
                    <a href={data} target="_blank" rel="noopener noreferrer">{data}</a>
                    ) : data || <span className="reader-placeholder">No result yet</span>}
                </div>
                </div>
        </div>

        <div className="camera-wrap">
            <div className="reader-frame">
            <div id="reader" />
            </div>
            <div className="camera-instructions">Point the camera at a QR code. Auto-stops after a successful scan.</div>
        </div>
        </div>
        </>
    );
}