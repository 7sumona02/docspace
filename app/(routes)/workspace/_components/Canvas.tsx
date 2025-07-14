'use client'

import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import React from 'react'
import "@excalidraw/excalidraw/index.css";

const Canvas = () => {
  return (
    <div style={{ height: "710px" }} className="custom-styles">
      <Excalidraw onChange={(excalidrawElements, appState, files)=>console.log(excalidrawElements)}>
         <WelcomeScreen />
      </Excalidraw>
    </div>
  )
}

export default Canvas