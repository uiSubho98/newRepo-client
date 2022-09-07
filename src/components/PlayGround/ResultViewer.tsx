import React, { useEffect, useRef } from 'react';
import { G_API_URL } from '../../constants/constants';

// Iframe Builder Template
const buildIframeSrc = (html: string, css: string, js: string, linkedUrl: string) => `
  <html>
  <head>
    ${linkedUrl !== '' ? `<link rel="stylesheet" href=${linkedUrl} crossorigin="anonymous">` : ''}
    <style>${css}</style>
  </head>
  <body>
  ${html}

  <div classname="playground-script-block">
    <script>
      document.body.addEventListener('click', function (e) {
          if (e.target.hash !== undefined && e.target.hash.length > 0) {
              e.preventDefault();
              document.documentElement.scrollTop = document.getElementById(e.target.hash.split('#')[1]).offsetTop;
          }
      });
      function logCatcher() {
        let output = "", arg, i;
        for (i = 0; i < arguments.length; i++) {
          arg = arguments[i];
          output += typeof arg === "object" ? JSON.stringify(arg) : arg;
        }
        window.parent.postMessage(output, '*');
        console.log(...arguments);
      }
      try {
        ${js}
      } catch (err) {
        window.parent.postMessage(err.message, '*');
        console.error(err.message);
      }
    </script>
  </div>
  </body>
  </html>
`;

interface IResultViewerProps {
  html: any
  css: any
  js: any
  linkedUrl: any
  addHistory: any
  isCodeExecuted: any
  updateIsCodeExecuted: any
  fromPage: any
}
// The ResultViewer component has a nested iframe
// Every time the html, css, js props change, destroy the iframe and create a new iframe
export default function ResultViewer(props: IResultViewerProps) {
    const { html, css, js, linkedUrl, addHistory, isCodeExecuted, updateIsCodeExecuted, fromPage } = props
    const iframeContainer = useRef<HTMLIFrameElement>(null);

    // Checking for message from Iframe
    useEffect(() => {
        window.addEventListener('message', e => {
            // TODO: Match by origin
            // if (e.origin !== origin) return false;
            if (!e.data) return false; // Check wether data is valid or not
            if (typeof e.data !== 'string') return false; // Check if message is string
            if (e.data.includes('_')) return false; // Excluding React logs
            if (e.data.includes('setImmediate$')) return false; // Excluding Weird logs
            addHistory(e.data);
        });
    }, [addHistory]);

    useEffect(() => {
        execute();
        if (fromPage !== 'full-view') {
            updateIsCodeExecuted(false);
        }
        // eslint-disable-next-line
    }, [html, css, js, isCodeExecuted]);

    // Runs the code and destroys the old Iframe by replacing it with new
    const execute = () => {
        // Remove all children
        if(iframeContainer.current !== null)
          while (iframeContainer.current.hasChildNodes()) {
            iframeContainer.current.lastChild !== null && iframeContainer.current.removeChild(iframeContainer.current.lastChild);
          }

        // Create new iframe
        let iframe = document.createElement('iframe');
        iframe.height = '100%';
        iframe.width = '100%';
        iframe.name = 'playground';
        iframe.id = 'playground-frame';
        iframe.sandbox.add('allow-downloads');
        iframe.sandbox.add('allow-forms');
        iframe.sandbox.add('allow-modals');
        iframe.sandbox.add('allow-pointer-lock');
        iframe.sandbox.add('allow-popups');
        iframe.sandbox.add('allow-presentation');
        iframe.sandbox.add('allow-same-origin');
        iframe.sandbox.add('allow-scripts');
        iframe.sandbox.add('allow-top-navigation-by-user-activation');
        iframe.allow = 'accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi';
        iframe.allowFullscreen = true;
        iframe.style.border = 'none';

        // Check for console logs in the JS and convert them to use logCatcher
        const newJs = js.replace(new RegExp('console.log', 'g'), 'logCatcher');

        // Check linkedUrl type
        let urlTrimmed = `${linkedUrl}`.trim();
        const urlCheck = urlTrimmed.includes('playground') ? true : false;

        if (urlCheck) {
            let parsedUrl = new URL(urlTrimmed);
            let pathStr = parsedUrl.pathname;
            let pathPID = pathStr.substr(pathStr.lastIndexOf('/'));
            pathPID = (pathPID.length && pathPID[0] === '/') ? pathPID.slice(1) : pathPID;

            urlTrimmed = G_API_URL + `playground/?pid=${pathPID}.css`;
        }

        iframe.srcdoc = buildIframeSrc(html, css, newJs, urlTrimmed);
        iframeContainer.current!.appendChild(iframe);
    }

    const display = !html && !css ? 'none' : 'block';
    return (
        <div
            ref={iframeContainer}
            className="iframe-container"
            style={{
                height: '100%',
                width: '100%',
                background: 'white',
                display
            }}
        />
    );
}
